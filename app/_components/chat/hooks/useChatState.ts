import { useState, useEffect } from 'react';
import { ChatState } from '../data/chatSchemas';
import { chatSteps } from '../data/chatSteps';
import { nanoid } from 'nanoid';

// 시간 지연 상수 (밀리초 단위)
const TIMING = {
  INITIAL_WAIT: 1000, // 초기 대기 시간
  MESSAGE_DELAY: 500, // 메시지 표시 지연 시간
  INPUT_DELAY: 750, // 입력창 표시 지연 시간
} as const;

const INITIAL_STATE: ChatState = {
  messages: [],
  currentStep: 0,
  isWaiting: true,
  showInput: false,
};

// 초기 메시지 생성
const getInitialMessage = () => ({
  id: nanoid(),
  message: chatSteps[0].question!,
  type: 'doctor' as const,
});

export function useChatState() {
  const [chatState, setChatState] = useState<ChatState>(INITIAL_STATE);

  useEffect(() => {
    // localStorage에서 저장된 대화 내용 확인
    const savedConversation = localStorage.getItem('cathouse_conversation_data');

    if (savedConversation) {
      try {
        const conversationData = JSON.parse(savedConversation);
        console.log('저장된 대화 내용 불러옴:', conversationData);

        // 저장된 대화 내용이 있으면 복원
        setChatState({
          messages: conversationData.messages,
          currentStep: conversationData.currentStep,
          isWaiting: false,
          showInput: false, // 대화가 완료된 상태이므로 입력창 숨김
        });
      } catch (error) {
        console.error('저장된 대화 내용 파싱 오류:', error);
        // 파싱 오류 시 초기화
        initializeNewConversation();
      }
    } else {
      // 저장된 대화 내용이 없으면 새 대화 시작
      initializeNewConversation();
    }
  }, []);

  // 새 대화 초기화 함수
  const initializeNewConversation = () => {
    setTimeout(() => {
      setChatState((prev) => ({
        ...prev,
        isWaiting: false,
      }));

      setTimeout(() => {
        const initialMessage = getInitialMessage();
        setChatState((prev) => ({
          ...prev,
          messages: [initialMessage],
        }));

        setTimeout(() => {
          setChatState((prev) => ({
            ...prev,
            showInput: true,
          }));
        }, TIMING.INPUT_DELAY);
      }, TIMING.MESSAGE_DELAY);
    }, TIMING.INITIAL_WAIT);
  };

  return {
    chatState,
    setChatState,
  };
}
