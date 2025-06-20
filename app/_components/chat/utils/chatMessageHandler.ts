import { useCallback } from 'react';
import { ChatMessage, ChatState } from '../types/chat';
import { formatMessage } from './messageUtils';
import { getNextStep, getStepData } from './stepUtils';
import { MessageProcessor } from './messageProcessor';

export function useMessageHandler(
  chatState: ChatState,
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>
) {
  const handleSendMessage = useCallback(
    (message: ChatMessage) => {
      const formattedMessage = {
        ...formatMessage(message, chatState.currentStep),
        type: 'patient' as const,
      };

      // 사용자 메시지 추가 및 input 숨기기
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, formattedMessage],
        showInput: false, // input 숨기기
      }));

      const nextStep = getNextStep(chatState.currentStep);
      if (nextStep === null) return;

      const nextStepData = getStepData(nextStep);

      // 다음 단계 타입에 따라 처리
      if (nextStepData.type === 'message') {
        MessageProcessor.processMessageStep(nextStep, message.message, setChatState);
      } else if (nextStepData.type === 'question') {
        // question 타입인 경우 단계를 먼저 업데이트
        setChatState((prev) => ({
          ...prev,
          currentStep: nextStep,
        }));
        MessageProcessor.processQuestionStep(nextStep, message.message, setChatState);
      }
    },
    [chatState.currentStep]
  );

  return { handleSendMessage };
}
