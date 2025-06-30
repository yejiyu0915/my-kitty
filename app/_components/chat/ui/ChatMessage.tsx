import { ReactNode } from 'react';
import { ChatMessageProps } from '../types/chat';

interface ExtendedChatMessageProps extends ChatMessageProps {
  children?: ReactNode; // 추가 콘텐츠 (선택지 등)
}

export default function ChatMessage({
  message,
  isDoctor,
  className,
  children,
}: ExtendedChatMessageProps) {
  return (
    <div
      className={`rounded-2xl px-4 py-2 ${
        isDoctor ? 'rounded-tl-none bg-gray-100' : 'bg-primary/20 rounded-tr-none'
      }`}
    >
      <p className={className ? `text-gray-800 ${className}` : 'text-gray-800'}>{message}</p>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
