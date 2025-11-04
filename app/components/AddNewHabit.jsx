'use client';

import { startTransition, useState } from 'react';
import Modal from './Modal';
import { addNewHabit } from '../_lib/actions';
import { CiCirclePlus } from 'react-icons/ci';
import { useHabit } from './HabitContext';
import { createPortal } from 'react-dom';

function AddNewHabit() {
  const { optimisticHabits, handleOptimisticHabits, userId } = useHabit();
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

    await addNewHabit(habitName, userId);
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="text-4xl -ml-4">
        <CiCirclePlus />
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
              className="w-full p-2 border border-buttonCta rounded mb-4 focus:outline-none focus:ring-2 focus:ring-buttonCta"
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
              <button className="bg-buttonCta p-2 rounded-lg" type="submit">
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
