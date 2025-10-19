'use client';

import { startTransition } from 'react';
import { addNewHabit } from '../_lib/actions';

export default function QuickAdd({ optimisticHabits, handleOptimisticHabits }) {
  const quickList = [
    '💪 Exercise',
    '📖 Read',
    '🧘 Meditate',
    '📝 Journal',
    '🚰 Drink',
    '💻 Code',
    '🍎 Healthy Eating',
    '📝 Study',
  ];

  async function handleAddHabit(habitName) {
    const habitNameExists = optimisticHabits.find(
      (habit) => habit.name === habitName
    );

    if (habitNameExists) return;

    startTransition(() =>
      handleOptimisticHabits({ type: 'add', payload: habitName })
    );

    await addNewHabit(habitName);
  }

  return (
    <div className="m-4">
      <h2 className="ml-3 mb-2 text-fgPrimary">Quick Add</h2>
      {quickList.map((habit) => (
        <button
          onClick={async () => await handleAddHabit(habit)}
          key={habit}
          className="inline-block m-1 px-3 py-1 bg-bgButton hover:bg-buttonHover text-fgPrimary rounded-full transition-all duration-200 ease-out
           hover:scale-105 hover:z-20 cursor-pointer"
        >
          {habit}
        </button>
      ))}
    </div>
  );
}
