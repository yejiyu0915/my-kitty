'use client';

import ChatBubble from './ui/ChatBubble';
import { ChatMessage } from './types/chat';
import { useChatScroll } from './hooks/useChatScroll';

interface ChatContentProps {
  messages: ChatMessage[];
  isWaiting: boolean;
}

export default function ChatContent({ messages, isWaiting }: ChatContentProps) {
  const { scrollRef } = useChatScroll(messages, isWaiting, {
    smooth: true,
    threshold: 100,
  });

  return (
    <div
      ref={scrollRef}
      className="scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent mt-4 mb-24 flex-1 overflow-y-auto pr-4 pb-8"
    >
      {messages.map((item, index) => (
        <ChatBubble
          key={item.id}
          type={item.type || (index % 2 === 0 ? 'doctor' : 'patient')}
          message={item.message}
        />
      ))}
      {isWaiting && (
        <ChatBubble
          type="doctor"
          message="원장님이 입력하는 중..."
          messageClassName="!text-gray-400"
        />
      )}
    </div>
  );
}
