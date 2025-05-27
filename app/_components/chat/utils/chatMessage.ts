import { ChatMessage } from '../types/chat';
import { chatScript } from '../data/chatScript';
import { chatSteps } from '../data/chatSteps';

export const getInitialMessage = (): ChatMessage => chatScript[0];

export const formatMessage = (message: ChatMessage, currentStep: number): ChatMessage => {
  const currentStepData = chatSteps[currentStep];
  return {
    ...message,
    message: currentStepData.messageFormat
      ? currentStepData.messageFormat(message.message)
      : message.message,
  };
};

export const getDoctorMessage = (nextStep: number, originalMessage: string): ChatMessage => ({
  ...chatScript[nextStep],
  message: chatScript[nextStep].message.replace('{name}', originalMessage),
});
