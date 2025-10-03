function Modal({ onClose, title, children }) {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 bg-opacity-40 flex items-center justify-center z-50 "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-6 min-w-[40rem]  max-h-[40rem] relative overflow-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
