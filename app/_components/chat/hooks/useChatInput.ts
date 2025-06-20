import { useState, useCallback, useMemo } from 'react';
import { ChatMessage } from '../types/chat';
import { validateInput, createChatMessage } from '../utils/messageUtils';
import { ChatStep } from '../types/step';

interface UseChatInputProps {
  currentStepData: ChatStep;
  isTyping: boolean;
  onSendMessage: (message: ChatMessage) => void;
}

export function useChatInput({ currentStepData, isTyping, onSendMessage }: UseChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const isInputValid = useMemo(() => {
    // message 타입일 때는 유효성 검사 건너뛰기
    if (currentStepData.type === 'message') {
      return true;
    }
    return validateInput(inputValue, currentStepData.validation);
  }, [inputValue, currentStepData.validation, currentStepData.type]);

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
