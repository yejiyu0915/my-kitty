import TextInput from '@/components/ui/input/text';
import Button from '@/components/ui/input/button';

interface AIInputProps {
  inputMessage: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  isWaiting: boolean;
  showInput: boolean;
}

export default function AIInput({
  inputMessage,
  onInputChange,
  onSendMessage,
  isWaiting,
  showInput,
}: AIInputProps) {
  if (!showInput) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="absolute right-0 bottom-0 left-0 z-10 w-full bg-white p-6 pt-2 pb-8 md:p-8 md:pt-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2"
      >
        <TextInput
          value={inputMessage}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="입력해주세요..."
          disabled={isWaiting}
          className="min-w-0 flex-1"
        />
        <Button
          type="submit"
          disabled={!inputMessage.trim() || isWaiting}
          className={`min-w-14 flex-shrink-0 ${!inputMessage.trim() || isWaiting ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          입력
        </Button>
      </form>
    </div>
  );
}
