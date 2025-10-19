'use client';

import { startTransition, useState } from 'react';
import Modal from './Modal';
import { addNewHabit } from '../_lib/actions';

function AddNewHabit({ optimisticHabits, handleOptimisticHabits }) {
  const [habitName, setHabitName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(e) {
    const habitNameExists = optimisticHabits.find(
      (habit) => habit.name === habitName
    );
    e.preventDefault();
    if (!habitName || habitNameExists) return;

    startTransition(() =>
      handleOptimisticHabits({ type: 'add', payload: habitName })
    );
    setIsOpen(false);
    setHabitName('');

    await addNewHabit(habitName);
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-bgButton hover:bg-buttonHover p-4 text-center text-fgPrimary text-lg rounded-lg cursor-pointer hover:bg-hov shadow-lg transition-all duration-900 ease m-4"
      >
        ➕ Create New Habit
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title="">
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium text-fgPrimary">
              Habit Name
            </label>
            <input
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              type="text"
              className="w-full p-2 border border-purple-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Drink Water"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-200 p-2 rounded-lg"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button className="bg-purple-400 p-2 rounded-lg" type="submit">
                Create Habit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AddNewHabit;
