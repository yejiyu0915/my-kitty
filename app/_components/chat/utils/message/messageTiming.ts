import { ChatState } from '../../data/chatSchemas';

// 대기 상태 설정
export const setWaitingState = (
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>,
  isWaiting: boolean
) => {
  setChatState((prev: ChatState) => ({
    ...prev,
    isWaiting,
  }));
};

// 메시지 추가
export const addMessage = (
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>,
  message: { id: string; message: string; type: 'doctor' | 'patient' }
) => {
  setChatState((prev: ChatState) => ({
    ...prev,
    messages: [...prev.messages, message],
  }));
};

// 타이밍 시퀀스 실행
export const executeTimingSequence = (actions: Array<{ delay: number; action: () => void }>) => {
  let currentDelay = 0;
  actions.forEach(({ delay, action }) => {
    currentDelay += delay;
    setTimeout(action, currentDelay);
  });
};
