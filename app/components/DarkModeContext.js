'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

function DarkModeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  console.log(isDarkMode);

  useEffect(
    function () {
      if (!isDarkMode) {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }

      if (isDarkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      }
    },
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const ctx = useContext(DarkModeContext);
  if (!ctx)
    throw new Error("You're probably using context outside of its scope");

  return ctx;
}

export { DarkModeContextProvider, useDarkMode };
