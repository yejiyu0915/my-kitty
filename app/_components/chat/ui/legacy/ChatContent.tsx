'use client';

import ChatBubble from './ChatBubble';
import { ChatMessage } from '../../data/chatSchemas';
import { useChatScroll } from '../../hooks/useChatScroll';
import { useEffect } from 'react';

interface ChatContentProps {
  messages: ChatMessage[];
  isWaiting: boolean;
  showInput?: boolean;
  isConversationFinished?: boolean;
}

export default function ChatContent({
  messages,
  isWaiting,
  showInput = true,
  isConversationFinished = false,
}: ChatContentProps) {
  const { scrollRef, scrollToBottom } = useChatScroll(messages, isWaiting, showInput, {
    threshold: 100,
  });

  // 대화 종료 메시지가 나타날 때 스크롤을 맨 아래로 내림
  useEffect(() => {
    if (isConversationFinished) {
      // 애니메이션이 완료된 후 스크롤 조정
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [isConversationFinished, scrollToBottom]);

  return (
    <div
      ref={scrollRef}
      className={`chat-content-scroll scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent flex-1 overflow-y-auto scroll-smooth pr-4 pb-8 ${
        showInput ? 'mb-26' : 'mb-8'
      }`}
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

      {/* 대화 종료 안내 메시지 */}
      {isConversationFinished && (
        <div className="animate-slide-up mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm leading-relaxed text-blue-800">
            대화가 종료되었습니다. 처음부터 다시 시작하시려면 상단에{' '}
            <span className="font-bold">&apos;초기화&apos;</span>버튼을 눌러주세요.
            <br />
            단, 기록한 모든 대화 내용도 함께 초기화되니 유의하세요.
          </p>
        </div>
      )}
    </div>
  );
}
