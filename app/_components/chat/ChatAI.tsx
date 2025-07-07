'use client';

import { useState } from 'react';
import { useChatAIState } from './hooks/useChatAIState';
import { useAIScroll } from './hooks/useAIScroll';
import { useAPILimiter } from './hooks/useAPILimiter';
import { useOptionHandler } from './hooks/useOptionHandler';
import { useAIMessageSender } from './hooks/useAIMessageSender';

import AIHeader from './ui/ai/AIHeader';
import AIBubble from './ui/ai/AIBubble';
import AIWaitingMessage from './ui/ai/AIWaitingMessage';
import AIResponseInfo from './ui/ai/AIResponseInfo';
import AIInput from './ui/ai/AIInput';
import ChatLayout from './ui/ChatLayout';

export default function ChatAI() {
  // 기본 상태 관리
  const { chatAIState, addMessage, addAIResponse, setWaiting, setShowInput, setShowOptions } =
    useChatAIState();
  const [inputMessage, setInputMessage] = useState('');

  // AI 스크롤 훅 사용
  const { scrollRef } = useAIScroll(chatAIState.messages, chatAIState.isWaiting, {
    smooth: true,
    threshold: 100,
  });

  // API 호출 제한 훅
  const { canMakeApiCall, recordApiCall, isProcessingRef } = useAPILimiter();

  // 선택지 처리 훅
  const { showSubOptions, handleOptionSelect } = useOptionHandler({
    addMessage,
    addAIResponse,
    setWaiting,
    setShowInput,
    setShowOptions,
  });

  // AI 메시지 전송 훅
  const { handleSendMessage } = useAIMessageSender({
    addMessage,
    addAIResponse,
    setWaiting,
    setShowInput,
    messages: chatAIState.messages,
    canMakeApiCall,
    recordApiCall,
    isProcessingRef,
  });

  // 입력 메시지 전송 핸들러
  const handleInputSend = () => {
    handleSendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <ChatLayout
      header={<AIHeader isWaiting={chatAIState.isWaiting} />}
      input={
        <AIInput
          inputMessage={inputMessage}
          onInputChange={setInputMessage}
          onSendMessage={handleInputSend}
          isWaiting={chatAIState.isWaiting}
          showInput={chatAIState.showInput}
        />
      }
    >
      {/* 메시지 영역 - 스크롤 훅 적용 */}
      <div
        ref={scrollRef}
        className={`scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent flex-1 overflow-y-auto pr-4 pb-8 ${
          chatAIState.showInput ? 'mb-26' : 'mb-4'
        }`}
      >
        {chatAIState.messages.map((message) => (
          <AIBubble
            key={message.id}
            message={message}
            showOptions={
              message.type === 'assistant' &&
              chatAIState.showOptions &&
              (message.message.includes('안녕하세요! 고양이 병원 AI 어시스턴트입니다') ||
                message.message.includes('어떤 도움이 필요하신가요?'))
            }
            showSubOptions={
              message.type === 'assistant' &&
              showSubOptions &&
              message.message.includes('어떤 종류의 예약을 원하시나요?')
            }
            onOptionSelect={handleOptionSelect}
            isWaiting={chatAIState.isWaiting}
          />
        ))}

        {chatAIState.isWaiting && <AIWaitingMessage />}
      </div>

      <AIResponseInfo lastAIResponse={chatAIState.lastAIResponse} />
    </ChatLayout>
  );
}
