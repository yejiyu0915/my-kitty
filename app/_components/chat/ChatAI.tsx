'use client';

import { useState } from 'react';
import { useChatAIState } from './hooks/useChatAIState';
import { useAIScroll } from './hooks/useAIScroll';
import { callAIService } from './utils/aiService';
import AIHeader from './ui/AIHeader';
import AIMessage from './ui/AIMessage';
import AIWaitingMessage from './ui/AIWaitingMessage';
import AIResponseInfo from './ui/AIResponseInfo';
import AIInput from './ui/AIInput';
import ChatLayout from './ui/ChatLayout';

export default function ChatAI() {
  const { chatAIState, addMessage, addAIResponse, setWaiting, setShowInput } = useChatAIState();
  const [inputMessage, setInputMessage] = useState('');

  // AI 스크롤 훅 사용
  const { scrollRef } = useAIScroll(chatAIState.messages, chatAIState.isWaiting, {
    smooth: true,
    threshold: 100,
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');

    // 사용자 메시지 추가
    addMessage({
      message: userMessage,
      type: 'user',
    });

    setWaiting(true);
    setShowInput(false);

    try {
      // AI 서비스 호출
      const aiResponse = await callAIService(userMessage, chatAIState.messages);

      // AI 응답 추가
      addMessage({
        message: aiResponse.message,
        type: 'assistant',
      });

      // AI 응답 데이터 저장
      addAIResponse(aiResponse);
    } catch (error) {
      console.error('AI 응답 처리 오류:', error);

      // 오류 시 기본 응답
      addMessage({
        message: '죄송합니다. AI 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.',
        type: 'assistant',
      });
    } finally {
      setWaiting(false);
      setShowInput(true);
    }
  };

  return (
    <ChatLayout
      header={<AIHeader isWaiting={chatAIState.isWaiting} />}
      input={
        <AIInput
          inputMessage={inputMessage}
          onInputChange={setInputMessage}
          onSendMessage={handleSendMessage}
          isWaiting={chatAIState.isWaiting}
          showInput={chatAIState.showInput}
        />
      }
    >
      {/* 메시지 영역 - 스크롤 훅 적용 */}
      <div
        ref={scrollRef}
        className="scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent mt-4 mb-26 flex-1 overflow-y-auto pr-4 pb-8"
      >
        {chatAIState.messages.map((message) => (
          <AIMessage key={message.id} message={message} />
        ))}

        {/* 대기 중 표시 */}
        {chatAIState.isWaiting && <AIWaitingMessage />}
      </div>

      {/* AI 응답 정보 표시 */}
      <AIResponseInfo lastAIResponse={chatAIState.lastAIResponse} />
    </ChatLayout>
  );
}
