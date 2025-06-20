import { useState, useEffect } from 'react';
import { ChatState } from '../types/chat';
import { getInitialMessage } from '../utils/chatMessage';

const INITIAL_STATE: ChatState = {
  messages: [],
  currentStep: 0,
  isWaiting: true,
  showInput: false,
};

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
