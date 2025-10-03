'use client';

import { createContext, useContext } from 'react';

const HabitsContext = createContext();

function HabitsContextProvider({ children }) {
  return <HabitsContext.Provider>{children}</HabitsContext.Provider>;
}

function useHabits() {
  const ctx = useContext(HabitsContext);
  if (!ctx)
    throw new Error("You're probably using context outside of its scope");

  return ctx;
}

export { HabitsContextProvider, useHabits };
