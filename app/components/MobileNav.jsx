'use client';

import Link from 'next/link';
import { PiCirclesThreePlus, PiUser } from 'react-icons/pi';
import AddNewHabit from './AddNewHabit';

export default function MobileNav() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-tr font-semibold from-mobileNavFrom to-mobileNavTo text-white min-w-72 sm:min-w-96 text-center px-6 py-3 rounded-full flex justify-around items-center">
      <Link href="/" className="flex flex-col items-center">
        <PiCirclesThreePlus className="text-xl" />
        my habits
      </Link>

      <button>
        <AddNewHabit />
      </button>
      <Link href="/account" className="flex flex-col items-center">
        <PiUser className="text-xl" />
        user
      </Link>
    </div>
  );
}
