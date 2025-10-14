'use client';

import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { TiTickOutline } from 'react-icons/ti';
import { updateHabit } from '../_lib/actions';

function Modal({ onClose, title, children, id = null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleClient, setTitleClient] = useState(() => title);

  async function handleEditTitle() {
    await updateHabit(id, titleClient);
    setIsEditing((prev) => !prev);
  }

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 bg-opacity-40 flex items-center justify-center z-50 "
      onClick={onClose}
    >
      <div
        className="bg-bgPrimary rounded-lg shadow-2xl p-6 min-w-[40rem]  max-h-[40rem] relative overflow-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && isEditing ? (
          <span className="flex items-center gap-2 w-fit mb-4 text-fgPrimary">
            <input
              type="text"
              value={titleClient}
              onChange={(e) => setTitleClient(e.target.value)}
              spellCheck="false"
              autoFocus
              className="text-black border-2 border-black outline-none px-2 py-1 w-full"
            />
            <TiTickOutline
              className="text-3xl cursor-pointer"
              onClick={handleEditTitle}
            />
            <span></span>
          </span>
        ) : (
          <span
            className="px-2 flex items-center gap-2 w-fit mb-4 text-fgPrimary"
            onClick={() => setIsEditing(true)}
          >
            {title}
            <FaEdit className="text-xl cursor-pointer" />
          </span>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
