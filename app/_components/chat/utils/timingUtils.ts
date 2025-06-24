/**
 * 타이밍 상수
 */
export const TIMING = {
  WAITING: 500,
  DOCTOR_MESSAGE: 1000,
  INPUT_SHOW: 500,
  MESSAGE_DELAY: 1000,
} as const;

/**
 * 지연 실행 함수
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 타이밍 시퀀스 실행
 */
export const executeTimingSequence = async (
  actions: Array<{ delay: number; action: () => void }>
): Promise<void> => {
  for (const { delay: delayMs, action } of actions) {
    await delay(delayMs);
    action();
  }
};
