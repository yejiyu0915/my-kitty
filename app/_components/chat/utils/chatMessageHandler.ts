import { useCallback } from 'react';
import { ChatMessage, ChatState } from '../types/chat';
import { chatSteps } from '../data/chatSteps';
import { formatMessage } from './chatMessage';
import { createMessageSequence } from './chatAnimation';

export function useMessageHandler(
  chatState: ChatState,
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>
) {
  const handleSendMessage = useCallback(
    (message: ChatMessage) => {
      const formattedMessage = formatMessage(message, chatState.currentStep);

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, formattedMessage],
        chatBottomAnimation: 'slide-down',
      }));

      if (chatState.currentStep < chatSteps.length - 1) {
        const nextStep = chatState.currentStep + 1;

        setChatState((prev) => ({
          ...prev,
          currentStep: nextStep,
        }));

        createMessageSequence(message, nextStep, {
          onWaitingStart: () => setChatState((prev) => ({ ...prev, isWaiting: true })),
          onDoctorMessage: (doctorMessage) =>
            setChatState((prev) => ({
              ...prev,
              messages: [...prev.messages, doctorMessage],
            })),
          onWaitingEnd: () => setChatState((prev) => ({ ...prev, isWaiting: false })),
          onAnimationComplete: () =>
            setChatState((prev) => ({
              ...prev,
              chatBottomAnimation: 'slide-up-bottom',
            })),
        });
      }
    },
    [chatState.currentStep]
  );

  return { handleSendMessage };
}
