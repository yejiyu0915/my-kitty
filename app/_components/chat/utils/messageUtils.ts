import { ChatMessage } from '../types/chat';
import { chatSteps } from '../data/chatSteps';
import { nanoid } from 'nanoid';

/**
 * 원장 메시지 생성
 */
export const createDoctorMessage = (message: string): ChatMessage => ({
  id: nanoid(),
  message,
  type: 'doctor',
});

/**
 * 사용자 메시지 생성
 */
export const createPatientMessage = (message: string): ChatMessage => ({
  id: nanoid(),
  message,
  type: 'patient',
});

/**
 * 채팅 메시지 생성 (기본 사용자 메시지)
 */
export const createChatMessage = (message: string): ChatMessage => ({
  id: nanoid(),
  message,
});

/**
 * {name} 플레이스홀더 치환
 */
export const replaceNamePlaceholder = (text: string, userName: string): string => {
  if (text.includes('{name}')) {
    return text.replace('{name}', userName);
  }
  return text;
};

/**
 * 입력값 유효성 검사
 */
export const validateInput = (value: string, validation?: (value: string) => boolean): boolean => {
  if (!validation) return true;
  return validation(value);
};

/**
 * 메시지 포맷팅 (기존 formatMessage 로직)
 */
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
