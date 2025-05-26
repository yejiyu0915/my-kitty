/**
 * 스크롤 위치를 감지하고 추적하는 커스텀 훅
 *
 * 이 훅은 다음과 같은 기능을 제공합니다:
 * 1. 스크롤 위치 실시간 감지
 * 2. 스크롤이 하단에 가까운지 여부 확인
 * 3. 스크롤 이벤트 리스너 관리
 *
 * @param scrollRef - 스크롤을 감지할 DOM 요소의 ref
 * @param options - 스크롤 감지 옵션 (임계값 등)
 */
import { useEffect, useState, useCallback, RefObject } from 'react';

interface UseScrollPositionOptions {
  threshold?: number;
}

export function useScrollPosition(
  scrollRef: RefObject<HTMLElement | null>,
  options: UseScrollPositionOptions = {}
) {
  const { threshold = 100 } = options;
  const [isNearBottom, setIsNearBottom] = useState(true);

  const isNearBottomOfScroll = useCallback(() => {
    if (!scrollRef.current) return true;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom <= threshold;
  }, [threshold, scrollRef]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      setIsNearBottom(isNearBottomOfScroll());
    };

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, [isNearBottomOfScroll, scrollRef]);

  return { isNearBottom };
}
