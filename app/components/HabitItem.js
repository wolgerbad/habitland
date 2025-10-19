'use client';

import { startTransition, useEffect, useOptimistic, useState } from 'react';
import { FaCalendar, FaEdit, FaFire, FaTrash, FaTrophy } from 'react-icons/fa';
import { SiTicktick } from 'react-icons/si';
import Modal from './Modal';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import {
  addNewLog,
  deleteHabit,
  deleteLog,
  handleAddLog,
  handleDeleteLog,
} from '../_lib/actions';
import { IoMdStats } from 'react-icons/io';
import { useRouter } from 'next/navigation';

function getLastXDaysLogs(logs, x) {
  const today = new Date();
  const lastXDays = eachDayOfInterval({
    start: subDays(today, x),
    end: today,
  });

  return lastXDays.map((day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const existingLog = logs?.find((log) => log.date === dateStr);

    return existingLog
      ? {
          id: existingLog.id,
          date: existingLog.date,
          completed: 1,
        }
      : {
          id: null,
          date: dateStr,
          completed: 0,
        };
  });
}

export default function HabitItem({
  habit,
  optimisticHabitLogs,
  optimisticHabits,
  handleOptimisticHabits,
  handleOptimisticLogs,
}) {
  const habitLogs = optimisticHabitLogs.filter(
    (habitLog) => habitLog.habit_id === habit.id
  );
  console.log('filteredlogs:', habitLogs);

  const [optimisticHabitName, handleOptimisticHabitName] = useOptimistic(
    habit.name,
    (_, newHabitName) => newHabitName
  );

  const data = getLastXDaysLogs(habitLogs, 30);

  const last90DaysData = getLastXDaysLogs(habitLogs, 90);
  const completedDays = data?.filter((d) => d.completed === 1).length;
  const completedRate = Math.floor((completedDays / 30) * 100);
  const totalCompletion = habitLogs?.length;
  const currentStreak = data
    ?.map((d) => (d.completed ? 1 : 0))
    .join('')
    .split('0')
    .pop().length;

  const todaysLog = data?.at(-1);

  const isCompletedToday = todaysLog?.completed;
  const [hovered, setHovered] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trophy = data?.reduce((acc, cur) => acc + cur.completed, 0);

  const router = useRouter();

  async function handleDeleteHabit() {
    setIsModalOpen(false);
    startTransition(() =>
      handleOptimisticHabits({ type: 'delete', payload: habit.id })
    );

    await deleteHabit(habit.id);
  }

  async function handleLog(log) {
    const randomId = Math.floor(Math.random() * 100000);
    console.log('log:', log);

    if (log.completed) {
      startTransition(() =>
        handleOptimisticLogs({ type: 'delete', payload: log.id })
      );
      await deleteLog(log.id);
    } else {
      startTransition(() =>
        handleOptimisticLogs({
          type: 'add',
          payload: { date: log.date, id: randomId, habit_id: habit.id },
        })
      );
      await addNewLog({
        id: randomId,
        date: log.date,
        completed: 1,
        habit_id: habit.id,
      });
    }
  }

  return (
    <>
      <div className="scale-95 hover:scale-100 duration-200 border-2 border-fgSecondary rounded-sm m-4 p-6 bg-itemBg ">
        <header className="flex justify-between mb-4">
          <h2 className="text-fgPrimary">{optimisticHabitName}</h2>
          <div className="flex items-center gap-3">
            <button
              className="p-2 bg-bgButton rounded-sm hover:bg-buttonHover text-fgPrimary"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Open details
            </button>
            <span className="text-fgPrimary">
              <FaTrophy className="text-yellow-500 text-xl inline-block mr-1" />
              {trophy}
            </span>
            <span className="text-fgPrimary">
              <FaFire className="text-red-600 text-xl inline-block mr-1" />
              {currentStreak}
            </span>
          </div>
        </header>

        <button
          key={habit.id}
          onClick={async () => await handleLog(todaysLog)}
          className={`w-full justify-center items-center gap-2 flex px-4 py-2 text-lg ${
            todaysLog?.completed
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'text-fgPrimary bg-bgButton hover:bg-hoverPrimary'
          }`}
        >
          <SiTicktick />
          {!isCompletedToday ? 'Mark Complete' : 'Completed Today!'}
        </button>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          title={optimisticHabitName}
          optimisticHabits={optimisticHabits}
          handleOptimisticHabitName={handleOptimisticHabitName}
          id={habit.id}
          isEditable={true}
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-100 p-4 flex flex-col text-blue-800 font-semibold rounded-lg">
              <span className="flex items-center gap-1 mb-2">
                <FaCalendar />
                Completion Rate
              </span>
              <span>{completedRate}% </span>
              <span>Last 30 Day</span>
            </div>
            <div className="bg-green-100 p-4 flex flex-col text-green-800 font-semibold rounded-lg">
              <span className="flex items-center gap-1 mb-2">
                <IoMdStats />
                Total Completions
              </span>
              <span className="text-2xl font-bold">{totalCompletion}</span>
              <span className="font-normal">All time</span>
            </div>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                className="border-t-2 border-borderPrimary p-2"
                onClick={(x) => console.log(x)}
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="date" className="text-fgPrimary" />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="max-w-[30rem] mx-auto border-b-2 py-6 border-borderPrimary mb-4">
            <h1 className="mb-4 text-fgPrimary">Graph (last 90 days)</h1>
            <div className=" flex gap-2 flex-wrap ">
              {last90DaysData.map((log) => (
                <div
                  key={log.date}
                  className="relative"
                  onMouseEnter={() => setHovered(log.date)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <button
                    onClick={async () => await handleLog(log)}
                    className={`w-8 h-8 rounded-md cursor-pointer ${
                      log.completed
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  ></button>

                  {hovered === log.date && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                            bg-gray-800 text-white text-sm p-1 rounded shadow-lg whitespace-nowrap"
                    >
                      <p>
                        {log.date} -{' '}
                        {log.completed ? 'completed' : 'not completed'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleDeleteHabit}
              className="flex items-center gap-1 hover:bg-red-100 p-1 rounded-md text-red-500"
            >
              <FaTrash />
              Delete habit
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
