import { useEffect, useRef, useCallback } from 'react';
import { ChatMessage } from '../types/chat';

export function useChatScroll(messages: ChatMessage[], isWaiting: boolean) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 스크롤 함수를 useCallback으로 메모이제이션
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isWaiting, scrollToBottom]);

  return scrollRef;
}
