import { getHabitLog } from '../_lib/helpers';
import HabitItem from './HabitItem';

export default async function HabitItemContainer({ habit }) {
  const habitLogs = await getHabitLog(habit.id);
  console.log('habitlogs:', habitLogs);

  return (
    <div className="border-2 border-fgSecondary rounded-sm m-4 p-6 bg-itemBg scale-95 hover:scale-100 duration-200">
      <HabitItem habit={habit} habitLogs={habitLogs} />
    </div>
  );
}
