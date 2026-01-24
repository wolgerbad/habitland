'use client';

import { startTransition } from 'react';
import { addNewHabit } from '../_lib/actions';
import { useHabit } from './HabitContext';
import { nanoid } from 'nanoid';

export default function QuickAdd() {
  const { optimisticHabits, handleOptimisticHabits, userId } = useHabit();

  const quickList = [
    {
      icon: '💪',
      habit: 'Exercise',
    },
    {
      icon: '📖',
      habit: 'Read',
    },
    {
      icon: '🧘',
      habit: 'Meditate',
    },
    {
      icon: '📝',
      habit: 'Journal',
    },
    {
      icon: '🚰',
      habit: 'Drink',
    },
    {
      icon: '💻',
      habit: 'Code',
    },
  ];

  async function handleAddHabit(habitName) {
    const randomId = nanoid()
    
    const habitNameExists = optimisticHabits.find(
      (habit) => habit.name === habitName
    );

    if (habitNameExists) return;

    startTransition(() =>
      handleOptimisticHabits({
        type: 'add',
        payload: habitName,
        id: randomId
      })
    );

    await addNewHabit(habitName, userId);
  }

  return (
    <div className="m-4">
      <h2 className="ml-3 mb-2 text-fgPrimary">Quick Add</h2>
      <div className="flex flex-wrap">
        {quickList.map((habit) => (
          <button
            onClick={async () => await handleAddHabit(habit.icon + habit.habit)}
            key={habit.habit}
            className="flex justify-center items-center gap-1 flex-1 m-1 px-2 py-1 bg-bgButton/40 hover:bg-buttonHover/60 text-fgPrimary rounded-full transition-all duration-200 ease-out
        hover:scale-105 hover:z-20 cursor-pointer"
          >
            <span>{habit.icon}</span>
            <span>{habit.habit}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
