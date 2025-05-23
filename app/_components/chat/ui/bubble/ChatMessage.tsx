import { ChatMessageProps } from '@/app/_components/chat/types/chatBubble';

export default function ChatMessage({ message, isDoctor, className }: ChatMessageProps) {
  return (
    <div
      className={`rounded-2xl px-4 py-2 ${
        isDoctor ? 'rounded-tl-none bg-gray-100' : 'bg-primary/20 rounded-tr-none'
      }`}
    >
      <p className={className ? `text-gray-800 ${className}` : 'text-gray-800'}>{message}</p>
    </div>
  );
}
