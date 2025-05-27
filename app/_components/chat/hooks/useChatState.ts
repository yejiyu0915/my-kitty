import { useState, useEffect } from 'react';
import { ChatState } from '../types/chat';
import { getInitialMessage } from '../utils/chatMessage';

const INITIAL_STATE: ChatState = {
  messages: [],
  currentStep: 0,
  isWaiting: false,
  chatBottomAnimation: 'slide-up-bottom',
};

export function useChatState() {
  const [chatState, setChatState] = useState<ChatState>(INITIAL_STATE);

  useEffect(() => {
    const initialMessage = getInitialMessage();
    setChatState((prev) => ({
      ...prev,
      messages: [initialMessage],
    }));
  }, []);

  return {
    chatState,
    setChatState,
  };
}
