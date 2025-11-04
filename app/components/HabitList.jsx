'use client';

import { useOptimistic } from 'react';
import HabitItem from './HabitItem';
import AddNewHabit from './AddNewHabit';
import QuickAdd from './QuickAdd';
import { useHabit } from './HabitContext';

export default function HabitList() {
  const { optimisticHabits } = useHabit();
  return (
    <div>
      <QuickAdd />
      {optimisticHabits?.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
