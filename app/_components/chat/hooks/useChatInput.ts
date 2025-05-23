import { useState, useEffect } from 'react';
import { ChatStep } from '../types/step';

export function useChatInput(currentStepData: ChatStep) {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);
  const [error, setError] = useState('');

  // 입력값 유효성 검사
  useEffect(() => {
    if (currentStepData?.validation) {
      setIsInputValid(currentStepData.validation(inputValue));
    } else {
      setIsInputValid(inputValue.trim().length > 0);
    }
  }, [inputValue, currentStepData]);

  const resetInput = () => {
    setInputValue('');
    setError('');
  };

  return {
    inputValue,
    setInputValue,
    isInputValid,
    error,
    resetInput,
  };
}
