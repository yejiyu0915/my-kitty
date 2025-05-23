'use client';
import { useState, useEffect, useCallback } from 'react';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import ChatBottom from './ChatBottom';
import { ChatMessage, ChatState } from './types/chat';
import { chatSteps } from './data/chatSteps';
import { getInitialMessage, formatMessage } from './utils/chatMessage';
import { createMessageSequence } from './utils/chatAnimation';

const INITIAL_STATE: ChatState = {
  messages: [],
  currentStep: 0,
  isWaiting: false,
  chatBottomAnimation: 'slide-up-bottom',
};

export default function Chat() {
  const [chatState, setChatState] = useState<ChatState>(INITIAL_STATE);

  // 초기 메시지 설정
  useEffect(() => {
    const initialMessage = getInitialMessage();
    setChatState((prev) => ({
      ...prev,
      messages: [initialMessage],
    }));
  }, []);

  // handleSendMessage를 useCallback으로 메모이제이션
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

  return (
    <div className="border-primary relative flex h-full w-full flex-col items-center overflow-hidden rounded-lg border-2 bg-white px-8 pt-12 pb-0">
      <div className="flex h-full w-full flex-col space-y-4 overflow-hidden">
        <ChatHeader />
        <ChatContent messages={chatState.messages} isWaiting={chatState.isWaiting} />
      </div>

      <ChatBottom
        currentStep={chatState.currentStep}
        onSendMessage={handleSendMessage}
        isTyping={chatState.isWaiting}
        animation={chatState.chatBottomAnimation}
      />
    </div>
  );
}
