/**
 * 채팅 스크롤 관리를 위한 커스텀 훅
 *
 * 이 훅은 다음과 같은 기능을 제공합니다:
 * 1. 새 메시지가 추가될 때 자동 스크롤
 * 2. 사용자가 스크롤을 임의로 올렸을 때는 자동 스크롤 방지
 * 3. 대기 중일 때는 항상 스크롤 다운
 *
 * @param messages - 채팅 메시지 배열
 * @param isWaiting - 메시지 대기 중 여부
 * @param options - 스크롤 동작 옵션 (부드러운 스크롤, 임계값 등)
 */
import { useRef, useEffect } from 'react';
import { ChatMessage } from '../types/chat';
import { useScrollPosition } from './scroll/useScrollPosition';
import { useScrollBehavior } from './scroll/useScrollBehavior';

interface UseChatScrollOptions {
  smooth?: boolean;
  threshold?: number;
}

export function useChatScroll(
  messages: ChatMessage[],
  isWaiting: boolean,
  options: UseChatScrollOptions = {}
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollHeight = useRef<number>(0);

  const { isNearBottom } = useScrollPosition(scrollRef, {
    threshold: options.threshold,
  });

  const { scrollToBottom } = useScrollBehavior(scrollRef, {
    smooth: options.smooth,
  });

  // 메시지 변경 시 스크롤 처리
  useEffect(() => {
    if (!scrollRef.current) return;

    const { scrollHeight } = scrollRef.current;
    const isNewMessage = scrollHeight > lastScrollHeight.current;
    lastScrollHeight.current = scrollHeight;

    if (isNewMessage && (isNearBottom || isWaiting)) {
      scrollToBottom();
    }
  }, [messages, isWaiting, isNearBottom, scrollToBottom]);

  return {
    scrollRef,
    scrollToBottom,
    isNearBottom,
  };
}
