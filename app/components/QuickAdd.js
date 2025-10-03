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
      <h2 className="ml-3 mb-2">Quick Add</h2>
      {quickList.map((habit) => (
        <span
          key={habit}
          className="inline-block m-1 px-3 py-1 shadow-lg bg-gray-50 text-black rounded-full transition-all duration-200 ease-out
          hover:shadow-2xl hover:scale-105 hover:z-20 cursor-pointer"
        >
          {habit}
        </span>
      ))}
    </div>
  );
}

export default QuickAdd;
