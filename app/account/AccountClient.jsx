'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useDarkMode } from '../components/DarkModeContext';

export default function AccountClient({ user, createdAt, habitsLength }) {
  const [toggle, setToggle] = useState(true);

  const { isDarkMode, setIsDarkMode } = useDarkMode();

  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout');
    router.refresh();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-fgPrimary">Account</h1>

      <section className="bg-bgPrimary rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gray-600 to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
            {user.name.slice(0, 1)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-lg font-semibold text-fgPrimary">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <form action={handleLogout} className="flex items-center gap-2">
                <Button />
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-bgButton/20">
                <p className="text-xs text-gray-500">User ID</p>
                <p className="font-medium truncate text-fgPrimary">{user.id}</p>
              </div>
              <div className="p-4 rounded-lg bg-bgButton/20">
                <p className="text-xs text-gray-500">Joined</p>
                <p className="font-medium text-fgPrimary">{createdAt}</p>
              </div>
              <div className="p-4 rounded-lg bg-bgButton/20">
                <p className="text-xs text-gray-500">Habits</p>
                <p className="font-medium text-fgPrimary">{habitsLength}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bgPrimary rounded-xl shadow-lg p-6">
        <h2 className="text-sm font-semibold text-fgPrimary mb-4">
          Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-fgPrimary">Appearance</p>
              <p className="text-sm text-gray-500">Follow system theme</p>
            </div>
            <button
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-fgPrimary"
              onClick={() => setIsDarkMode((prev) => !prev)}
            >
              {isDarkMode ? 'Dark' : 'Light'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-fgPrimary">Notifications</p>
              <p className="text-sm text-gray-500">Daily habit reminder</p>
            </div>
            <div
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-fgPrimary cursor-pointer"
              onClick={() => setToggle((prev) => !prev)}
            >
              {toggle ? 'Off' : 'On'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${
        pending ? 'cursor-not-allowed' : ''
      } px-3 py-2 rounded-lg bg-bgButton hover:bg-buttonHover text-fgPrimary text-sm transition`}
    >
      {pending ? 'Logging Out..' : 'Log out'}
    </button>
  );
}
