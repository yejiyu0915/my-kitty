import { ReactNode } from 'react';

// 채팅 메시지 타입
export type ChatMessage = {
  id: string;
  type: 'doctor' | 'patient';
  message: string;
};

// 채팅 버블 컴포넌트 Props
export interface ChatBubbleProps {
  type: 'doctor' | 'patient';
  message: ReactNode;
  name?: string;
  emoji?: string;
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
}
