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
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="">
          <h2 className="text-5xl text-center font-semibold mb-8">NEW HABIT</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              type="text"
              className="w-full p-4 border-2 text-black border-buttonCta rounded mb-6 focus:outline-none focus:ring-2 focus:ring-buttonCta"
              placeholder="e.g., Drink Water"
            />
            <div className="w-full">
              <button
                className="bg-blue-800 p-3 text-2xl font-semibold text-white rounded-lg w-full "
                type="submit"
              >
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
