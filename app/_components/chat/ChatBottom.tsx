'use client';
import { chatSteps } from './data/chatSteps';
import { ChatBottomProps } from './types/chat';
import ChatInput from './ui/ChatInput';
import Button from '@/components/ui/button';
import { useChatInput } from './hooks/useChatInput';

export default function ChatBottom({
  currentStep,
  onSendMessage,
  isTyping,
  animation,
}: ChatBottomProps) {
  const currentStepData = chatSteps[currentStep];
  const { inputValue, handleInputChange, isInputValid, handleSubmit, onKeyPress } = useChatInput({
    currentStepData,
    isTyping,
    onSendMessage,
  });

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
        className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2"
      >
        <ChatInput
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={onKeyPress}
          placeholder={currentStepData.question}
          disabled={isTyping}
          type={currentStepData.inputType}
          options={currentStepData.options}
        />
        <Button
          type="submit"
          disabled={!isInputValid || isTyping}
          className={`${!isInputValid || isTyping ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          입력
        </Button>
      </form>
      {!isInputValid && inputValue && currentStepData?.errorMessage && (
        <p className="mt-1 pl-2 text-sm text-red-500">{currentStepData.errorMessage}</p>
      )}
    </div>
  );
}
