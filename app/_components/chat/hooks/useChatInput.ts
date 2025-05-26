import { useState, useCallback, useMemo } from 'react';
import { ChatMessage } from '../types/chat';
import { validateInput, createChatMessage } from '../utils/chatInput';
import { ChatStep } from '../types/step';

interface UseChatInputProps {
  currentStepData: ChatStep;
  isTyping: boolean;
  onSendMessage: (message: ChatMessage) => void;
}

export function useChatInput({ currentStepData, isTyping, onSendMessage }: UseChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const isInputValid = useMemo(
    () => validateInput(inputValue, currentStepData.validation),
    [inputValue, currentStepData.validation]
  );

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
