import { useState, useEffect } from 'react';
import { ChatState } from '../types/chat';
import { chatSteps } from '../data/chatSteps';
import { nanoid } from 'nanoid';

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
        }, 500);
      }, 500);
    }, 1000);
  }, []);

  return {
    chatState,
    setChatState,
  };
}
