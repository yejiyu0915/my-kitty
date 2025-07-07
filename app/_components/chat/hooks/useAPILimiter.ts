import { useState, useCallback, useRef } from 'react';

interface UseAPILimiterProps {
  maxCallsPerMinute?: number;
  minIntervalMs?: number;
}

export function useAPILimiter({
  maxCallsPerMinute = 10,
  minIntervalMs = 3000,
}: UseAPILimiterProps = {}) {
  const [apiCallCount, setApiCallCount] = useState(0);
  const [lastApiCallTime, setLastApiCallTime] = useState(0);
  const isProcessingRef = useRef(false);

  // API 호출 제한 체크 (무료 호스팅 제한 고려)
  const canMakeApiCall = useCallback(() => {
    const now = Date.now();
    const timeSinceLastCall = now - lastApiCallTime;

    // 1분에 최대 10회, 연속 호출 간격 최소 3초
    if (apiCallCount >= maxCallsPerMinute && timeSinceLastCall < 60000) {
      return false;
    }

    if (timeSinceLastCall < minIntervalMs) {
      return false;
    }

    return true;
  }, [apiCallCount, lastApiCallTime, maxCallsPerMinute, minIntervalMs]);

  // API 호출 기록
  const recordApiCall = useCallback(() => {
    setApiCallCount((prev) => prev + 1);
    setLastApiCallTime(Date.now());
  }, []);

  // 리셋
  const resetAPILimiter = useCallback(() => {
    setApiCallCount(0);
    setLastApiCallTime(0);
    isProcessingRef.current = false;
  }, []);

  return {
    canMakeApiCall,
    recordApiCall,
    resetAPILimiter,
    isProcessingRef,
  };
}
