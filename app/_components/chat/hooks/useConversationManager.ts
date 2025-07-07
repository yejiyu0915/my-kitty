import { useState, useEffect } from 'react';
import { getNextStep } from '../utils/stepUtils';
import { ConversationData } from '../types/chat';
import { ChatMessage } from '../data/chatSchemas';

interface UseConversationManagerProps {
  chatState: {
    currentStep: number;
    isWaiting: boolean;
    showInput: boolean;
    messages: ChatMessage[];
  };
}

export function useConversationManager({ chatState }: UseConversationManagerProps) {
  const [showFinishMessage, setShowFinishMessage] = useState(false);
  const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);

  // 대화가 종료되었는지 확인 (다음 단계가 없고, 대기 중이 아니고, 입력창이 숨겨져 있을 때)
  const isConversationFinished = () => {
    const nextStep = getNextStep(chatState.currentStep);
    return nextStep === null && !chatState.isWaiting && !chatState.showInput;
  };

  // 저장된 대화를 불러왔는지 확인
  useEffect(() => {
    const savedConversation = localStorage.getItem('cathouse_conversation_data');
    if (savedConversation) {
      setIsLoadedFromStorage(true);
    }
  }, []);

  // 대화 종료 시 안내 메시지 표시
  useEffect(() => {
    if (isConversationFinished()) {
      if (isLoadedFromStorage) {
        // 저장된 대화를 불러온 경우 즉시 안내 메시지 표시
        setShowFinishMessage(true);
      } else {
        // 새로 완료된 대화인 경우 2초 후 안내 메시지 표시
        const timer = setTimeout(() => {
          setShowFinishMessage(true);

          // 대화 내용을 localStorage에 저장
          const conversationData: ConversationData = {
            messages: chatState.messages,
            currentStep: chatState.currentStep,
            timestamp: new Date().toISOString(),
          };
          localStorage.setItem('cathouse_conversation_data', JSON.stringify(conversationData));
          console.log('대화 내용 저장됨:', conversationData);
        }, 2000);

        return () => clearTimeout(timer);
      }
    } else {
      setShowFinishMessage(false);
    }
  }, [
    chatState.currentStep,
    chatState.isWaiting,
    chatState.showInput,
    chatState.messages,
    isLoadedFromStorage,
  ]);

  return {
    showFinishMessage,
    isLoadedFromStorage,
  };
}
