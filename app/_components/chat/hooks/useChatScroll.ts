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
 * @param showInput - 입력 필드 표시 여부
 * @param options - 스크롤 동작 옵션 (부드러운 스크롤, 임계값 등)
 */
import { useRef, useEffect, useState, useCallback } from 'react';
import { ChatMessage } from '../data/chatSchemas';

interface UseChatScrollOptions {
  smooth?: boolean;
  threshold?: number;
}

export function useChatScroll(
  messages: ChatMessage[],
  isWaiting: boolean,
  showInput: boolean = true,
  options: UseChatScrollOptions = {}
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollHeight = useRef<number>(0);
  const { threshold = 100, smooth = true } = options;
  const [isNearBottom, setIsNearBottom] = useState(true);

  // 저장된 대화를 불러왔는지 확인 (메모이제이션)
  const isLoadedFromStorage = useCallback(() => {
    return messages.length > 1 && !showInput && !isWaiting;
  }, [messages.length, showInput, isWaiting]);

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

  // showInput 상태 변화 시 스크롤 조정 (저장된 대화를 불러온 경우 제외)
  // CSS transition만으로 처리하여 팍 떨어지는 현상 방지
  useEffect(() => {
    if (isNearBottom && !isLoadedFromStorage()) {
      // 스크롤 조정을 비활성화하고 CSS transition만 사용
      // const timer = setTimeout(() => {
      //   requestAnimationFrame(() => {
      //     scrollToBottom('smooth');
      //   });
      // }, 800);
      // return () => clearTimeout(timer);
    }
  }, [showInput, isNearBottom, scrollToBottom, isLoadedFromStorage]);

  return {
    scrollRef,
    scrollToBottom,
    isNearBottom,
  };
}
