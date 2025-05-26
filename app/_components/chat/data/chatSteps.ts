import { ChatStep } from '../types/step';
import { validateName } from '../utils/chatValidation';
import { formatName } from '../utils/chatFormatter';

export const chatSteps: ChatStep[] = [
  {
    id: 0,
    question: '성함을 입력해주세요.',
    validation: validateName,
    errorMessage: '2글자 이상의 한글 또는 영문으로 입력해주세요.',
    messageFormat: formatName,
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
    messageFormat: (value: string) => value,
    inputType: 'select',
    options: [
      { value: '엄청 아프진 않아요.', label: '매우 약함' },
      { value: '약간 아픕니다.', label: '약함' },
      { value: '보통입니다.', label: '보통' },
      { value: '심합니다.', label: '심함' },
      { value: '매우 심합니다.', label: '매우 심함' },
    ],
  },
];
