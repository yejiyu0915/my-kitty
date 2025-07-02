import { useState, useCallback, useMemo } from 'react';
import { ChatMessage, ChatStep } from '../data/chatSchemas';
import { nanoid } from 'nanoid';

interface UseChatInputProps {
  currentStepData: ChatStep;
  isTyping: boolean;
  onSendMessage: (message: ChatMessage) => void;
}

// 입력값 유효성 검사
const validateInput = (
  value: string,
  validation?: (value: string) => boolean,
  inputType?: string
): boolean => {
  // select 타입일 때는 빈 값이 아니어야 함
  if (inputType === 'select') {
    return value.trim() !== '';
  }

  if (!validation) return true;
  return validation(value);
};

// 채팅 메시지 생성
const createChatMessage = (message: string): ChatMessage => ({
  id: nanoid(),
  message,
});

export function useChatInput({ currentStepData, isTyping, onSendMessage }: UseChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const isInputValid = useMemo(() => {
    // message 타입일 때는 유효성 검사 건너뛰기
    if (currentStepData.type === 'message') {
      return true;
    }
    return validateInput(inputValue, currentStepData.validation, currentStepData.inputType);
  }, [inputValue, currentStepData.validation, currentStepData.type, currentStepData.inputType]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isInputValid || isTyping) return;

      const newMessage = createChatMessage(inputValue);
      onSendMessage(newMessage);
      setInputValue('');
    },
    [isInputValid, isTyping, onSendMessage, inputValue]
  );

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && isInputValid && !isTyping) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [isInputValid, isTyping, handleSubmit]
  );

  return {
    inputValue,
    handleInputChange,
    isInputValid,
    handleSubmit,
    onKeyPress,
  };
}
