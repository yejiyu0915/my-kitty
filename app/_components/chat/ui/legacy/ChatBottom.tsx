'use client';
import { chatSteps } from '../../data/chatSteps';
import { ChatBottomProps } from '../../types/chat';
import ChatInput from './ChatInput';
import Button from '@/components/ui/input/button';
import { useChatInput } from '../../hooks/useChatInput';

export default function ChatBottom({
  currentStep,
  onSendMessage,
  isTyping,
  showInput = true,
}: ChatBottomProps) {
  const currentStepData = chatSteps[currentStep];
  const { inputValue, handleInputChange, isInputValid, handleSubmit, onKeyPress } = useChatInput({
    currentStepData,
    isTyping,
    onSendMessage,
  });

  // message 타입이거나 showInput이 false일 때는 input을 숨김
  if (currentStepData.type === 'message' || !showInput) {
    return null;
  }

  return (
    <div className="absolute right-0 bottom-0 left-0 z-10 w-full bg-white p-8 pt-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2"
      >
        <ChatInput
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={onKeyPress}
          placeholder={currentStepData.placeholder || ''}
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

      {/* 에러 메시지 표시 */}
      {!isInputValid && inputValue && currentStepData?.errorMessage && (
        <p className="absolute bottom-2 left-8 mt-1 pl-2 text-sm text-red-500">
          {currentStepData.errorMessage}
        </p>
      )}
    </div>
  );
}
