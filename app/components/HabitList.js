'use client';

import { useOptimistic } from 'react';
import HabitItem from './HabitItem';
import AddNewHabit from './AddNewHabit';
import QuickAdd from './QuickAdd';

export default function HabitList({ habits, habitLogs }) {
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
  console.log('optimisticHabits:', optimisticHabits);
  console.log('optimisticLogs:', optimisticLogs);

  return (
    <div>
      <QuickAdd
        optimisticHabits={optimisticHabits}
        handleOptimisticHabits={handleOptimisticHabits}
      />
      {optimisticHabits?.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          optimisticHabits={optimisticHabits}
          optimisticHabitLogs={optimisticLogs}
          handleOptimisticHabits={handleOptimisticHabits}
          handleOptimisticLogs={handleOptimisticLogs}
        />
      ))}
      <AddNewHabit
        optimisticHabits={optimisticHabits}
        handleOptimisticHabits={handleOptimisticHabits}
      />
    </div>
  );
}
