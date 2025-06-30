import { useState } from 'react';
import { ChatAIState, ChatAIMessage } from '../types/chatAI';
import { nanoid } from 'nanoid';

const INITIAL_STATE: ChatAIState = {
  messages: [],
  isWaiting: false,
  showInput: true,
  userData: {},
  aiResponses: [],
};

export function useChatAIState() {
  const [chatAIState, setChatAIState] = useState<ChatAIState>(INITIAL_STATE);

  const addMessage = (message: Omit<ChatAIMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatAIMessage = {
      ...message,
      id: nanoid(),
      timestamp: new Date().toISOString(),
    };

    setChatAIState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    return newMessage;
  };

  const addAIResponse = (response: Omit<AIResponse, 'timestamp'>) => {
    const aiResponse: AIResponse = {
      ...response,
      timestamp: new Date().toISOString(),
    };

    setChatAIState((prev) => ({
      ...prev,
      aiResponses: [...prev.aiResponses, aiResponse],
      lastAIResponse: aiResponse,
    }));

    return aiResponse;
  };

  const setWaiting = (isWaiting: boolean) => {
    setChatAIState((prev) => ({
      ...prev,
      isWaiting,
    }));
  };

  const setShowInput = (showInput: boolean) => {
    setChatAIState((prev) => ({
      ...prev,
      showInput,
    }));
  };

  return {
    chatAIState,
    setChatAIState,
    addMessage,
    addAIResponse,
    setWaiting,
    setShowInput,
  };
}
