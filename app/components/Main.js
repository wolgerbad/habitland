import { getHabitLogs, getHabits } from '../_lib/helpers';
import AddNewHabit from './AddNewHabit';
import HabitList from './HabitList';
import QuickAdd from './QuickAdd';

export default async function Main() {
  const habits = await getHabits();
  const habitLogs = await getHabitLogs();
  return (
    <div>
      <HabitList habits={habits} habitLogs={habitLogs} />
    </div>
  );
}
