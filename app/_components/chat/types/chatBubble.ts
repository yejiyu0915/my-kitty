import { ReactNode } from 'react';

// 채팅 메시지 타입
export type ChatMessage = {
  id: string;
  message: string;
};

// 채팅 버블 컴포넌트 Props
export interface ChatBubbleProps {
  type: 'doctor' | 'patient';
  message: ReactNode;
  name?: string;
  emoji?: string;
  messageClassName?: string;
}

// 채팅 아바타 컴포넌트 Props
export interface ChatAvatarProps {
  emoji: string;
  isDoctor: boolean;
}

// 채팅 메시지 컴포넌트 Props
export interface ChatMessageProps {
  message: ReactNode;
  isDoctor: boolean;
  className?: string;
}

// 대화 단계 타입
export type ChatStep = {
  id: number;
  question: string;
  validation?: (value: string) => boolean;
  errorMessage?: string;
  messageFormat?: (value: string) => string;
  inputType?: 'text' | 'textarea' | 'select';
  options?: { value: string; label: string }[];
};

// 채팅 상태 타입
export interface ChatState {
  messages: ChatMessage[];
  currentStep: number;
  inputValue: string;
  isInputValid: boolean;
}

// 채팅 하단 컴포넌트 Props
export interface ChatBottomProps {
  currentStep: number;
  onSendMessage: (message: ChatMessage) => void;
  isTyping: boolean;
  animation: 'slide-up-bottom' | 'slide-down';
}
