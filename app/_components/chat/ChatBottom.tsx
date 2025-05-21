export default function ChatBottom() {
  return (
    <div className="sticky bottom-0 left-0 mt-auto w-full border-t border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2">
        <input
          type="text"
          placeholder="성함을 입력하세요..."
          className="flex-1 bg-transparent outline-none"
        />
        <button className="text-primary hover:text-primary/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}
