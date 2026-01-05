'use client';

import { startTransition, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { TiTickOutline } from 'react-icons/ti';
import { updateHabit } from '../_lib/actions';
import { createPortal } from 'react-dom';
import { CiEdit } from 'react-icons/ci';
import { MdModeEdit } from 'react-icons/md';
import * as React from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

function Modal({
  onClose,
  title,
  children,
  id,
  handleOptimisticHabitName,
  optimisticHabits,
  isEditable = false,
  isOpen,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleClient, setTitleClient] = useState(() => title);
  async function handleEditTitle() {
    const habitNameExists = optimisticHabits.find(
      (habit) => habit.name === titleClient
    );
    if (!titleClient || titleClient === title || habitNameExists)
      return setIsEditing((prev) => !prev);
    startTransition(() => handleOptimisticHabitName(titleClient));
    setIsEditing((prev) => !prev);
    await updateHabit(id, titleClient);
  }

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      className="h-[75vh] overflow-scroll"
    >
      <DrawerContent className="h-[75vh]">
        <div className="w-full overflow-y-auto p-4">
          <div className="mx-auto max-w-lg">
            <DrawerHeader className="p-0">
              <DrawerTitle>
                {title && isEditing && isEditable ? (
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
                    className="flex items-center gap-2 w-fit mb-4 text-fgPrimary"
                    onClick={() => setIsEditing(true)}
                  >
                    {title}
                    {isEditable && (
                      <MdModeEdit className="text-xl cursor-pointer" />
                    )}
                  </span>
                )}
              </DrawerTitle>
            </DrawerHeader>
            {children}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  // const [isEditing, setIsEditing] = useState(false);
  // const [titleClient, setTitleClient] = useState(() => title);
  // async function handleEditTitle() {
  //   const habitNameExists = optimisticHabits.find(
  //     (habit) => habit.name === titleClient
  //   );
  //   if (!titleClient || titleClient === title || habitNameExists)
  //     return setIsEditing((prev) => !prev);
  //   startTransition(() => handleOptimisticHabitName(titleClient));
  //   setIsEditing((prev) => !prev);
  //   await updateHabit(id, titleClient);
  // }
  // return createPortal(
  //   <div
  //     className="fixed inset-0  flex items-center backdrop-blur-sm bg-black/30 bg-opacity-40 z-50 "
  //     onClick={onClose}
  //   >
  //     <div
  //       className="bg-bgPrimary fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-2xl p-6 min-w-full md:min-w-[40rem]  max-h-[40rem]  overflow-scroll overflow-x-hidden"
  //       onClick={(e) => e.stopPropagation()}
  //     >
  //       <button
  //         className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
  //         onClick={onClose}
  //         aria-label="Close modal"
  //       >
  //         &times;
  //       </button>
  //       {title && isEditing && isEditable ? (
  //         <span className="flex items-center gap-2 w-fit mb-4 text-fgPrimary">
  //           <input
  //             type="text"
  //             value={titleClient}
  //             onChange={(e) => setTitleClient(e.target.value)}
  //             spellCheck="false"
  //             autoFocus
  //             className="text-black border-2 border-black outline-none px-2 py-1 w-full"
  //           />
  //           <TiTickOutline
  //             className="text-3xl cursor-pointer"
  //             onClick={handleEditTitle}
  //           />
  //           <span></span>
  //         </span>
  //       ) : (
  //         <span
  //           className="px-2 flex items-center gap-2 w-fit mb-4 text-fgPrimary"
  //           onClick={() => setIsEditing(true)}
  //         >
  //           {title}
  //           {isEditable && <MdModeEdit className="text-xl cursor-pointer" />}
  //         </span>
  //       )}
  //       <div>{children}</div>
  //     </div>
  //   </div>,
  //   document.body
  // );
}

export default Modal;
