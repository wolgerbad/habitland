'use client';

import HabitItem from './HabitItem';
import QuickAdd from './QuickAdd';
import { useHabit } from './HabitContext';

export default function HabitList() {
  const { optimisticHabits } = useHabit();

  return (
    <div>
      <QuickAdd />
      {!optimisticHabits.length && (
        <p className="mt-10 text-center text-fgPrimary/70 px-4 py-2">
          You have no habits to track.
        </p>
      )}
      {optimisticHabits?.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
