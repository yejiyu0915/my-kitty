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
import { useRef, useEffect, useState, useCallback } from 'react';
import { ChatMessage } from '../types/chat';

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
  const { threshold = 100, smooth = true } = options;
  const [isNearBottom, setIsNearBottom] = useState(true);

  // 스크롤 위치 감지
  const isNearBottomOfScroll = useCallback(() => {
    if (!scrollRef.current) return true;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom <= threshold;
  }, [threshold]);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      setIsNearBottom(isNearBottomOfScroll());
    };

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, [isNearBottomOfScroll]);

  // 스크롤 다운 함수
  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = smooth ? 'smooth' : 'auto') => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior,
        });
      }
    },
    [smooth]
  );

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
