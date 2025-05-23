import { ChatStep } from '../types/chatBubble';

// 이름 유효성 검사 정규식
const NAME_REGEX = /^[가-힣a-zA-Z]{2,}$/;

export const chatSteps: ChatStep[] = [
  {
    id: 0,
    question: '성함을 입력해주세요.',
    validation: (value: string) => NAME_REGEX.test(value),
    errorMessage: '2글자 이상의 한글 또는 영문으로 입력해주세요.',
    messageFormat: (value: string) => `${value}입니다.`,
    inputType: 'text',
  },
  {
    id: 1,
    question: '아픈 곳을 알려주세요.',
    messageFormat: (value: string) => value,
    inputType: 'textarea',
  },
  {
    id: 2,
    question: '증상의 강도를 선택해주세요.',
    messageFormat: (value: string) => `${value} 정도로 아픕니다.`,
    inputType: 'select',
    options: [
      { value: '1', label: '매우 약함' },
      { value: '2', label: '약함' },
      { value: '3', label: '보통' },
      { value: '4', label: '심함' },
      { value: '5', label: '매우 심함' },
    ],
  },
];
