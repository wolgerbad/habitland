import { getHabitLog, getHabits } from '../_lib/helpers';
import HabitItemContainer from './HabitItemContainer';

export default async function HabitList() {
  const habits = await getHabits();

  return (
    <div>
      {habits.map((habit) => (
        <HabitItemContainer habit={habit} key={habit.id} />
      ))}
    </div>
  );
}
