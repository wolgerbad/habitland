'use client';

import { addNewHabit } from '../_lib/actions';

function QuickAdd() {
  const quickList = [
    '💪 Exercise',
    '📖 Read',
    '🧘 Meditate',
    '📝 Journal',
    '🚰 Drink',
    '💻 Code',
    '🍎 Healthy Eating',
    '📝 Study',
  ];

  return (
    <div className="m-4">
      <h2 className="ml-3 mb-2 text-fgPrimary">Quick Add</h2>
      {quickList.map((habit) => (
        <button
          onClick={async () => await addNewHabit(null, habit)}
          key={habit}
          className="inline-block m-1 px-3 py-1 shadow-lg bg-bgButton text-fgPrimary rounded-full transition-all duration-200 ease-out
          hover:shadow-2xl hover:scale-105 hover:z-20 cursor-pointer"
        >
          {habit}
        </button>
      ))}
    </div>
  );
}

export default QuickAdd;
