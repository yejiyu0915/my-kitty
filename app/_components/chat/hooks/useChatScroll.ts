/**
 * 채팅 스크롤 관리를 위한 커스텀 훅
 *
 * 이 훅은 다음과 같은 기능을 제공합니다:
 * 1. 새 메시지가 추가될 때 자동 스크롤
 * 2. 사용자가 스크롤을 임의로 올렸을 때는 자동 스크롤 방지
 * 3. 대기 중일 때는 항상 스크롤 다운
 * 4. 컨테이너 크기 변화 시 자동 스크롤 조정
 *
 * @param messages - 채팅 메시지 배열
 * @param isWaiting - 메시지 대기 중 여부
 * @param showInput - 입력 필드 표시 여부
 * @param options - 스크롤 동작 옵션 (임계값 등)
 */
import { useRef, useEffect, useState, useCallback } from 'react';
import { ChatMessage } from '../data/chatSchemas';

interface UseChatScrollOptions {
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
  const lastClientHeight = useRef<number>(0);
  const { threshold = 100 } = options;
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

  // 스크롤 다운 함수 (간단하게 scrollTop 직접 설정)
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

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

  // ResizeObserver로 컨테이너 크기 변화 감지
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { clientHeight } = entry.target as HTMLElement;
        const heightChanged = clientHeight !== lastClientHeight.current;

        if (heightChanged && isNearBottom) {
          // 컨테이너 높이가 변경되고 사용자가 하단에 있을 때 스크롤 조정
          requestAnimationFrame(() => {
            scrollToBottom();
          });
        }
        lastClientHeight.current = clientHeight;
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [isNearBottom, scrollToBottom]);

  // MutationObserver로 DOM 변화 감지 (메시지 추가/제거, 클래스 변경 등)
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const mutationObserver = new MutationObserver((mutations) => {
      let shouldScroll = false;

      for (const mutation of mutations) {
        // 자식 노드 추가/제거 또는 속성 변경 시
        if (
          mutation.type === 'childList' ||
          (mutation.type === 'attributes' && mutation.attributeName === 'class')
        ) {
          shouldScroll = true;
          break;
        }
      }

      if (shouldScroll && isNearBottom) {
        // DOM 변화가 있고 사용자가 하단에 있을 때 스크롤 조정
        requestAnimationFrame(() => {
          scrollToBottom();
        });
      }
    });

    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => mutationObserver.disconnect();
  }, [isNearBottom, scrollToBottom]);

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

  // showInput 상태 변화 시 스크롤 조정
  useEffect(() => {
    if (isNearBottom && !isLoadedFromStorage()) {
      // 입력 필드 표시/숨김 시 스크롤 조정
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [showInput, isNearBottom, scrollToBottom, isLoadedFromStorage]);

  return {
    scrollRef,
    scrollToBottom,
    isNearBottom,
  };
}
