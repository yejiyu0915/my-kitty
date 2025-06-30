import { AI_CHATBOT_OPTIONS, APPOINTMENT_SUB_OPTIONS } from '../data/aiChatbotData';

interface AIChatbotOptionsProps {
  onOptionSelect: (message: string) => void;
  disabled?: boolean;
  showSubOptions?: boolean; // 하위 선택지 표시 여부
}

export default function AIChatbotOptions({
  onOptionSelect,
  disabled = false,
  showSubOptions = false,
}: AIChatbotOptionsProps) {
  // 표시할 옵션들 결정
  const optionsToShow = showSubOptions ? APPOINTMENT_SUB_OPTIONS : AI_CHATBOT_OPTIONS;

  return (
    <div className="mt-3 space-y-2">
      <div className="grid grid-cols-1 gap-1">
        {optionsToShow.map((option) => (
          <button
            key={option.id}
            onClick={() => onOptionSelect(option.message)}
            disabled={disabled}
            className={`w-full rounded-sm border px-3 py-2 text-left transition-all duration-200 hover:shadow-sm ${
              disabled
                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                : 'cursor-pointer border-gray-300 bg-gray-100 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium text-gray-700">✔️ {option.text}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
