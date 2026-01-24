import { getHabitLogs, getHabits } from '../_lib/helpers';
import HabitList from './HabitList';

export default async function Main(userId) {
  const { userId: id } = userId;

  const habits = await getHabits(id);
  const habitLogs = await getHabitLogs();
  return (
    <div>
      <HabitList habits={habits} habitLogs={habitLogs} userId={id} />
    </div>
  );
}
