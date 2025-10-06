'use client';

import { useEffect, useState } from 'react';
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
import { deleteHabit, handleAddLog, handleDeleteLog } from '../_lib/actions';
import { IoMdStats } from 'react-icons/io';

function getLastXDaysLogs(logs, x) {
  const today = new Date();
  const lastXDays = eachDayOfInterval({
    start: subDays(today, x),
    end: today,
  });

  return lastXDays.map((day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const log = logs?.find((log) => log.date === dateStr);
    return {
      date: dateStr,
      completed: log ? log.completed : 0,
    };
  });
}

export default function HabitItem({ habit, habitLogs }) {
  const data = getLastXDaysLogs(habitLogs, 30);
  const last90Days = getLastXDaysLogs(habitLogs, 90);
  const completedDays = data.filter((d) => d.completed === 1).length;
  const completedRate = Math.floor((completedDays / 30) * 100);
  const totalCompletion = habitLogs.length;
  const currentStreak = data
    .map((d) => (d.completed ? 1 : 0))
    .join('')
    .split('0')
    .pop().length;

  const todaysLog = habitLogs.at(-1);

  console.log(habitLogs.at(-1));

  const [isCompletedToday, setIsCompletedToday] = useState(() =>
    todaysLog?.completed ? true : false
  );
  const [hovered, setHovered] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const trophy = habitLogs.reduce((acc, cur) => acc + cur.completed, 0);
  const { id, name } = habit;

  function handleLog(log) {
    console.log('log:', log);
    const { date, completed, id } = log;

    completed ? handleDeleteLog(id) : handleAddLog(date, id);
  }

  function handleDeleteHabit() {
    setIsModalOpen(false);
    deleteHabit(habit.id);
  }

  useEffect(
    function () {
      setIsCompletedToday(todaysLog?.completed ? true : false);
    },
    [todaysLog]
  );

  return (
    <>
      <header className="flex justify-between mb-4">
        <h2>{name}</h2>
        <div className="flex items-center gap-3">
          <button
            className="p-2 bg-gray-100 rounded-sm hover:bg-gray-200 text-gray-700"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Open details
          </button>
          <span>
            <FaTrophy className="text-yellow-500 text-xl inline-block mr-1" />
            {trophy}
          </span>
          <span>
            <FaFire className="text-red-600 text-xl inline-block mr-1" />
            {currentStreak}
          </span>
        </div>
      </header>
      <button
        key={id}
        onClick={() => handleLog(todaysLog)}
        className={`w-full justify-center items-center gap-2 flex px-4 py-2 text-lg text-gray-700 ${
          todaysLog?.completed
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        <SiTicktick />
        {!isCompletedToday ? 'Mark Complete' : 'Completed Today!'}
      </button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title={name}>
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
                className="border-t-2 border-gray-200 p-2"
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
                <XAxis dataKey="date" />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="max-w-[30rem] mx-auto border-b-2 py-6 border-gray-200 mb-4">
            <h1 className="mb-4">Graph (last 90 days)</h1>
            <div className=" flex gap-2 flex-wrap ">
              {last90Days.map((d) => (
                <div
                  key={d.date}
                  className="relative"
                  onMouseEnter={() => setHovered(d.date)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className={`w-8 h-8 rounded-md cursor-pointer ${
                      d.completed
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => handleLog(d)}
                  ></div>
                  {hovered === d.date && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                            bg-gray-800 text-white text-sm p-1 rounded shadow-lg whitespace-nowrap"
                    >
                      <p>
                        {d.date} - {d.completed ? 'completed' : 'not completed'}
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
            <button className="flex items-center gap-1 hover:bg-blue-100 p-1 rounded-md text-blue-500">
              <FaEdit />
              Edit habit
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
