'use client';

import { useEffect, useRef } from 'react';
import ChatBubble from './ui/ChatBubble';
import { ChatMessage } from './types/chatBubble';

interface ChatContentProps {
  messages: ChatMessage[];
  isWaiting: boolean;
}

export default function ChatContent({ messages, isWaiting }: ChatContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가될 때 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isWaiting]);

  return (
    <div
      ref={scrollRef}
      className="scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent mt-4 mb-24 flex-1 overflow-y-auto pr-4 pb-8"
    >
      {messages.map((item, index) => (
        <ChatBubble
          key={item.id}
          type={index % 2 === 0 ? 'doctor' : 'patient'}
          message={item.message}
        />
      ))}
      {isWaiting && (
        <ChatBubble
          type="doctor"
          message="원장님이 응답하는 중..."
          messageClassName="!text-gray-400"
        />
      )}
    </div>
  );
}
