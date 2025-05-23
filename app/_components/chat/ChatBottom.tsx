'use client';
import { useState, useEffect } from 'react';
import { chatSteps } from './data/chatSteps';
import { ChatMessage, ChatBottomProps } from './types/chatBubble';
import { nanoid } from 'nanoid';
import ChatInput from './ui/input/ChatInput';

export default function ChatBottom({
  currentStep,
  onSendMessage,
  isTyping,
  animation,
}: ChatBottomProps) {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);
  const [error, setError] = useState('');

  const currentStepData = chatSteps[currentStep];

  // 입력값 유효성 검사
  useEffect(() => {
    if (currentStepData?.validation) {
      setIsInputValid(currentStepData.validation(inputValue));
    } else {
      setIsInputValid(inputValue.trim().length > 0);
    }
  }, [inputValue, currentStepData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isInputValid || isTyping) return;

    const newMessage: ChatMessage = {
      id: nanoid(),
      message: inputValue,
    };

    onSendMessage(newMessage);
    setInputValue('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isInputValid && !isTyping) {
      handleSubmit(e);
    }
  };

  return (
    <div
      className={`absolute right-0 bottom-0 left-0 w-full bg-white p-4 px-8 ${
        animation === 'slide-up-bottom' ? 'animate-slide-up-bottom' : 'animate-slide-down'
      }`}
      style={{
        transform: animation === 'slide-up-bottom' ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-full border-2 border-gray-300 px-4 py-2"
      >
        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={currentStepData.question}
          disabled={isTyping}
          type={currentStepData.inputType}
          options={currentStepData.options}
        />
        <button
          type="submit"
          disabled={!isInputValid || isTyping}
          className={`${
            isInputValid && !isTyping ? 'text-primary hover:text-primary/80' : 'text-gray-400'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
      {!isInputValid && inputValue && currentStepData?.errorMessage && (
        <p className="mt-1 text-sm text-red-500">{currentStepData.errorMessage}</p>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
