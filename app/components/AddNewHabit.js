'use client';

import { useState } from 'react';
import Modal from './Modal';
import { addNewHabit } from '../_lib/actions';

function AddNewHabit() {
  const [isOpen, setIsOpen] = useState(false);

  async function handleAction(formData) {
    setIsOpen(false);

    await addNewHabit(formData);
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-gray-100 p-4 text-center text-gray-500 text-lg rounded-lg cursor-pointer hover:bg-gray-200 shadow-lg transition-all duration-900 ease m-4"
      >
        ➕ Create New Habit
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title="Create New Habit">
          <form action={handleAction}>
            <label className="block mb-2 font-medium">Habit Name</label>
            <input
              name="name"
              type="text"
              className="w-full p-2 border border-purple-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Drink Water"
            />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-200 p-2 rounded-lg">Cancel</button>
              <button className="bg-purple-400 p-2 rounded-lg">
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
