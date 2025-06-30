import { useState, useEffect } from 'react';
import { ChatAIState, ChatAIMessage, AIResponse } from '../types/chatAI';
import { AI_WELCOME_MESSAGE } from '../data/aiChatbotData';
import { nanoid } from 'nanoid';

const INITIAL_STATE: ChatAIState = {
  messages: [],
  isWaiting: false,
  showInput: false,
  showOptions: true,
  userData: {},
  aiResponses: [],
};

export function useChatAIState() {
  const [chatAIState, setChatAIState] = useState<ChatAIState>(INITIAL_STATE);

  useEffect(() => {
    if (chatAIState.messages.length === 0) {
      setChatAIState((prev) => ({
        ...prev,
        messages: [AI_WELCOME_MESSAGE],
      }));
    }
  }, []);

  const addMessage = (message: Omit<ChatAIMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatAIMessage = {
      ...message,
      id: nanoid(),
      timestamp: new Date().toISOString(),
    };

    setChatAIState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      showOptions: false,
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

  const setShowOptions = (showOptions: boolean) => {
    setChatAIState((prev) => ({
      ...prev,
      showOptions,
    }));
  };

  // AI 채팅 리셋 함수
  const resetChatAI = () => {
    setChatAIState(INITIAL_STATE);
  };

  return {
    chatAIState,
    setChatAIState,
    addMessage,
    addAIResponse,
    setWaiting,
    setShowInput,
    setShowOptions,
    resetChatAI,
  };
}
