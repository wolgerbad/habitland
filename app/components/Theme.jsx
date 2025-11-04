'use client';

import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useDarkMode } from './DarkModeContext';

export default function Theme() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setIsDarkMode((t) => !t)}
      className="absolute top-10 right-10 text-fgPrimary"
    >
      {isDarkMode ? (
        <MdLightMode className="text-3xl text-yellow-400" />
      ) : (
        <MdDarkMode className="text-3xl text-blue-800" />
      )}
    </button>
  );
}
