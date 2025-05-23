'use client';
import { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import ChatBottom from './ChatBottom';
import { ChatMessage } from './types/chatBubble';
import { chatSteps } from './data/chatSteps';
import { chatScript } from './data/chatScript';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [chatBottomAnimation, setChatBottomAnimation] = useState<'slide-up-bottom' | 'slide-down'>(
    'slide-up-bottom'
  );

  // 초기 메시지 설정
  useEffect(() => {
    const initialMessage = chatScript[0];
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = (message: ChatMessage) => {
    // 현재 단계의 메시지 포맷 적용
    const currentStepData = chatSteps[currentStep];
    const formattedMessage = {
      ...message,
      message: currentStepData.messageFormat
        ? currentStepData.messageFormat(message.message)
        : message.message,
    };

    setMessages((prev) => [...prev, formattedMessage]);
    setChatBottomAnimation('slide-down');

    // 다음 단계로 진행
    if (currentStep < chatSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      // 0.5초 후에 대기 메시지 표시
      setTimeout(() => {
        setIsWaiting(true);

        // 1초 후에 원장님의 다음 메시지 추가
        setTimeout(() => {
          const doctorMessage = {
            ...chatScript[nextStep],
            message: chatScript[nextStep].message.replace('{name}', message.message),
          };
          setMessages((prev) => [...prev, doctorMessage]);
          setIsWaiting(false);

          // 원장님 메시지 표시 후 0.3초 후에 ChatBottom 표시
          setTimeout(() => {
            setChatBottomAnimation('slide-up-bottom');
          }, 300);
        }, 1000);
      }, 500);
    }
  };

  return (
    <div className="border-primary relative flex h-full w-full flex-col items-center overflow-hidden rounded-lg border-2 bg-white px-8 pt-12 pb-0">
      <div className="flex h-full w-full flex-col space-y-4 overflow-hidden">
        <ChatHeader />
        <ChatContent messages={messages} isWaiting={isWaiting} />
      </div>

      {/* 메시지 입력 영역 */}
      <ChatBottom
        currentStep={currentStep}
        onSendMessage={handleSendMessage}
        isTyping={isWaiting}
        animation={chatBottomAnimation}
      />
    </div>
  );
}
