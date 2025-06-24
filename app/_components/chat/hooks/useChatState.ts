import { useState, useEffect } from 'react';
import { ChatState } from '../types/chat';
import { chatSteps } from '../data/chatSteps';
import { nanoid } from 'nanoid';

// 시간 지연 상수 (밀리초 단위)
const TIMING = {
  INITIAL_WAIT: 1000, // 초기 대기 시간
  MESSAGE_DELAY: 500, // 메시지 표시 지연 시간
  INPUT_DELAY: 750, // 입력창 표시 지연 시간
} as const;

const INITIAL_STATE: ChatState = {
  messages: [],
  currentStep: 0,
  isWaiting: true,
  showInput: false,
};

// 초기 메시지 생성
const getInitialMessage = () => ({
  id: nanoid(),
  message: chatSteps[0].question!,
  type: 'doctor' as const,
});

export function useChatState() {
  const [chatState, setChatState] = useState<ChatState>(INITIAL_STATE);

  useEffect(() => {
    setTimeout(() => {
      setChatState((prev) => ({
        ...prev,
        isWaiting: false,
      }));

      setTimeout(() => {
        const initialMessage = getInitialMessage();
        setChatState((prev) => ({
          ...prev,
          messages: [initialMessage],
        }));

        setTimeout(() => {
          setChatState((prev) => ({
            ...prev,
            showInput: true,
          }));
        }, TIMING.INPUT_DELAY);
      }, TIMING.MESSAGE_DELAY);
    }, TIMING.INITIAL_WAIT);
  }, []);

  return {
    chatState,
    setChatState,
  };
}
