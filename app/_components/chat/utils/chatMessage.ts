import { ChatMessage } from '../types/chat';
import { chatScript } from '../data/chatScript';
import { chatSteps } from '../data/chatSteps';

export const getInitialMessage = (): ChatMessage => ({
  ...chatScript[0],
  type: 'doctor',
});

export const formatMessage = (message: ChatMessage, currentStep: number): ChatMessage => {
  const currentStepData = chatSteps[currentStep];

  // question 타입일 때만 messageFormat 적용
  if (currentStepData.type === 'question' && currentStepData.messageFormat) {
    return {
      ...message,
      message: currentStepData.messageFormat(message.message),
    };
  }

  return message;
};

export const getDoctorMessage = (nextStep: number, originalMessage: string): ChatMessage => ({
  ...chatScript[nextStep],
  message: chatScript[nextStep].message.replace('{name}', originalMessage),
});
