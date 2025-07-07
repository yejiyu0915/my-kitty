import { ReactNode } from 'react';
import { ChatMessage } from '../data/chatSchemas';

// 채팅 버블 컴포넌트 Props
export interface ChatBubbleProps {
  type: 'doctor' | 'patient';
  message: ReactNode;
  name?: string;
  emoji?: string;
  messageClassName?: string;
}

// 채팅 메시지 컴포넌트 Props
export interface ChatMessageProps {
  isDoctor: boolean;
  className?: string;
}

// 채팅 아바타 컴포넌트 Props
export interface ChatAvatarProps {
  emoji: string;
  isDoctor: boolean;
}

// 채팅 하단 컴포넌트 Props
export interface ChatBottomProps {
  currentStep: number;
  onSendMessage: (message: ChatMessage) => void;
  isTyping: boolean;
  showInput?: boolean;
}

// 채팅 콘텐츠 컴포넌트 Props
export interface ChatContentProps {
  messages: ChatMessage[];
  isWaiting: boolean;
}

// Chat 컴포넌트 관련 타입 정의
export interface PatientData {
  name?: string;
  birthDate?: string;
  gender?: string;
  phone?: string;
  visitPath?: string;
  symptoms?: string;
  painLevel?: string;
  visitDateTime?: string;
}

export interface ChatProps {
  onPatientDataUpdate?: (data: PatientData) => void;
}

export interface ConversationData {
  messages: ChatMessage[];
  currentStep: number;
  timestamp: string;
}
