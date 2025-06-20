import { ChatMessage } from '../types/chat';
import { chatSteps } from '../data/chatSteps';
import { nanoid } from 'nanoid';
import { z } from 'zod';

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

// 사용자 입력 데이터 스키마
export const UserDataSchema = z.object({
  name: z
    .string()
    .min(2, '2글자 이상 입력해주세요')
    .regex(/^[가-힣a-zA-Z]+$/, '한글 또는 영문만 입력 가능합니다'),
  symptoms: z.string().min(1, '증상을 입력해주세요'),
  painLevel: z.enum([
    '매우 심합니다.',
    '심합니다.',
    '보통입니다.',
    '약간 아픕니다.',
    '엄청 아프진 않아요.',
  ]),
  birthDate: z.string().refine((val) => {
    const date = new Date(val);
    const minDate = new Date('1900-01-01');
    const maxDate = new Date();
    return date >= minDate && date <= maxDate;
  }, '올바른 생년월일을 선택해주세요'),
  gender: z.enum(['남성', '여성']),
  visitReason: z.enum([
    '인터넷 검색으로 알아보고 왔습니다.',
    '지인 소개로 알아보고 왔습니다.',
    '광고/홍보물로 알아보고 왔습니다.',
  ]),
  contact: z.string().regex(/^\d{10,11}$/, '올바른 전화번호를 입력해주세요'),
  visitDateTime: z.string().refine((val) => {
    const date = new Date(val);
    const now = new Date();
    return (
      date > now &&
      date.getDay() !== 0 &&
      date.getHours() >= 9 &&
      date.getHours() < 18 &&
      (date.getMinutes() === 0 || date.getMinutes() === 30)
    );
  }, '일요일을 제외하고, 9:00~18:00 사이의 30분 단위 시간을 선택해주세요'),
});

export type UserData = z.infer<typeof UserDataSchema>;

// 채팅 단계 스키마
export const ChatStepSchema = z.object({
  id: z.string(),
  type: z.enum(['question', 'message']),
  question: z.string().optional(),
  message: z.string().optional(),
  placeholder: z.string().optional(),
  validation: z.function().optional(),
  errorMessage: z.string().optional(),
  messageFormat: z.function().optional(),
  inputType: z
    .enum(['text', 'textarea', 'select', 'date', 'datetime-local', 'radio', 'number'])
    .optional(),
  options: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
});

export type ChatStep = z.infer<typeof ChatStepSchema>;
