/**
 * 스크롤 동작을 제어하는 커스텀 훅
 *
 * 이 훅은 다음과 같은 기능을 제공합니다:
 * 1. 스크롤 다운 동작 수행
 * 2. 부드러운 스크롤 효과 지원
 * 3. 스크롤 동작 커스터마이징
 *
 * @param scrollRef - 스크롤을 제어할 DOM 요소의 ref
 * @param options - 스크롤 동작 옵션 (부드러운 스크롤 여부)
 */
import { useCallback, RefObject } from 'react';

interface UseScrollBehaviorOptions {
  smooth?: boolean;
}

export function useScrollBehavior(
  scrollRef: RefObject<HTMLElement | null>,
  options: UseScrollBehaviorOptions = {}
) {
  const { smooth = true } = options;

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = smooth ? 'smooth' : 'auto') => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior,
        });
      }
    },
    [smooth, scrollRef]
  );

  return { scrollToBottom };
}
