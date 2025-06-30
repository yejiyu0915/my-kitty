'use client';

import { useState } from 'react';
import { useChatAIState } from './hooks/useChatAIState';
import { ChatAIMessage } from './types/chatAI';

export default function ChatAI() {
  const { chatAIState, addMessage, addAIResponse, setWaiting, setShowInput } = useChatAIState();
  const [inputMessage, setInputMessage] = useState('');

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
      // 서버 API 호출
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: chatAIState.messages.map((msg) => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.message,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('API 호출 실패');
      }

      const aiResponse = await response.json();

      // AI 응답 추가
      addMessage({
        message: aiResponse.message,
        type: 'assistant',
      });

      // AI 응답 데이터 저장
      addAIResponse({
        message: aiResponse.message,
        confidence: aiResponse.confidence,
        suggestedActions: aiResponse.suggestedActions,
      });
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
    <div className="border-primary relative flex h-full w-full flex-col items-center overflow-hidden rounded-lg border-2 bg-white px-8 pt-12 pb-0">
      <div className="flex h-full w-full flex-col space-y-4 overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-800">🤖 AI 어시스턴트 (Gemini)</span>
          {chatAIState.isWaiting && (
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 animate-spin rounded-full border-b-2 border-blue-500"></div>
              <span className="text-sm text-gray-500">AI가 응답을 생성하고 있습니다...</span>
            </div>
          )}
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          {chatAIState.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 ${
                  message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className="mt-1 text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString('ko-KR')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AI 응답 정보 표시 */}
        {chatAIState.lastAIResponse && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">AI 분석 결과</span>
              <span className="text-xs text-blue-600">
                신뢰도: {Math.round(chatAIState.lastAIResponse.confidence * 100)}%
              </span>
            </div>
            {chatAIState.lastAIResponse.suggestedActions &&
              chatAIState.lastAIResponse.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {chatAIState.lastAIResponse.suggestedActions.map((action, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                    >
                      {action}
                    </span>
                  ))}
                </div>
              )}
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      {chatAIState.showInput && (
        <div className="w-full border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="고양이 관련 질문을 해보세요..."
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || chatAIState.isWaiting}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
