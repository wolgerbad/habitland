import AddNewHabit from './AddNewHabit';
import HabitList from './HabitList';
import Modal from './Modal';
import QuickAdd from './QuickAdd';

export default function Main() {
  return (
    <div>
      <QuickAdd />
      <HabitList />
      <AddNewHabit />
    </div>
  );
}
