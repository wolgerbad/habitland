import { getHabitLog } from '../_lib/helpers';
import HabitItem from './HabitItem';

export default async function HabitItemContainer({ habit }) {
  const habitLogs = await getHabitLog(habit.id);
  console.log('habitlogs:', habitLogs);

  return (
    <div className="">
      <HabitItem habit={habit} habitLogs={habitLogs} />
    </div>
  );
}
