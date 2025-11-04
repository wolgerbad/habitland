'use client';

import { createContext, useContext, useOptimistic } from 'react';

const HabitContext = createContext();

export default function HabitContextProvider({
  children,
  habits,
  habitLogs,
  userId,
}) {
  const [optimisticHabits, handleOptimisticHabits] = useOptimistic(
    habits,
    (state, action) => {
      switch (action.type) {
        case 'add':
          return [...habits, { name: action.payload }];

        case 'delete':
          return state.filter((h) => h.id !== action.payload);
      }
    }
  );

  const [optimisticLogs, handleOptimisticLogs] = useOptimistic(
    habitLogs,
    (state, action) => {
      switch (action.type) {
        case 'delete':
          return state.filter((habitLog) => habitLog.id !== action.payload);

        case 'add':
          return [
            ...state,
            {
              id: action.payload.id,
              date: action.payload.date,
              completed: 1,
              habit_id: action.payload.habit_id,
            },
          ];
      }
    }
  );

  return (
    <HabitContext.Provider
      value={{
        optimisticLogs,
        optimisticHabits,
        handleOptimisticLogs,
        handleOptimisticHabits,
        userId,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabit() {
  const ctx = useContext(HabitContext);
  if (!ctx) console.log("You're probably using context outside of its scope.");
  return ctx;
}
