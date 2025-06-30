'use client';

import { useState } from 'react';
import { useChatAIState } from './hooks/useChatAIState';
import { useAIScroll } from './hooks/useAIScroll';
import { callAIService } from './utils/aiService';
import { AI_RESPONSE_TEMPLATES, APPOINTMENT_SUB_RESPONSES } from './data/aiChatbotData';
import AIHeader from './ui/AIHeader';
import AIBubble from './ui/AIBubble';
import AIWaitingMessage from './ui/AIWaitingMessage';
import AIResponseInfo from './ui/AIResponseInfo';
import AIInput from './ui/AIInput';
import ChatLayout from './ui/ChatLayout';

export default function ChatAI() {
  const { chatAIState, addMessage, addAIResponse, setWaiting, setShowInput } = useChatAIState();
  const [inputMessage, setInputMessage] = useState('');
  const [showSubOptions, setShowSubOptions] = useState(false); // 하위 선택지 표시 상태

  // AI 스크롤 훅 사용
  const { scrollRef } = useAIScroll(chatAIState.messages, chatAIState.isWaiting, {
    smooth: true,
    threshold: 100,
  });

  // 선택지 클릭 핸들러
  const handleOptionSelect = async (message: string) => {
    // 사용자 선택 메시지 추가
    addMessage({
      message,
      type: 'user',
    });

    setWaiting(true);
    setShowInput(false);

    try {
      // 예약 문의인지 확인
      if (message.includes('병원 예약에 대해 문의하고 싶습니다')) {
        // 예약 문의 선택 시 하위 선택지 표시
        setShowSubOptions(true);

        // AI 응답 추가
        addMessage({
          message: AI_RESPONSE_TEMPLATES.appointment.message,
          type: 'assistant',
        });

        // AI 응답 데이터 저장
        addAIResponse({
          message: AI_RESPONSE_TEMPLATES.appointment.message,
          confidence: 0.95,
          suggestedActions: [...AI_RESPONSE_TEMPLATES.appointment.suggestedActions],
        });
      } else if (showSubOptions) {
        // 하위 선택지에서 선택한 경우
        setShowSubOptions(false);

        // 선택한 하위 옵션에 따른 응답 찾기
        let subResponse;
        if (message.includes('정기검진 예약을 원합니다')) {
          subResponse = APPOINTMENT_SUB_RESPONSES.checkup;
        } else if (message.includes('증상이 있어서 진료받고 싶습니다')) {
          subResponse = APPOINTMENT_SUB_RESPONSES.symptom;
        } else if (message.includes('예방접종을 받고 싶습니다')) {
          subResponse = APPOINTMENT_SUB_RESPONSES.vaccination;
        } else if (message.includes('수술에 대한 상담을 받고 싶습니다')) {
          subResponse = APPOINTMENT_SUB_RESPONSES.surgery;
        } else {
          subResponse = APPOINTMENT_SUB_RESPONSES.checkup; // 기본값
        }

        // AI 응답 추가
        addMessage({
          message: subResponse.message,
          type: 'assistant',
        });

        // AI 응답 데이터 저장
        addAIResponse({
          message: subResponse.message,
          confidence: 0.95,
          suggestedActions: [...subResponse.suggestedActions],
        });

        // 입력창 표시
        setShowInput(true);
      } else {
        // 일반 선택지 처리
        const optionId = message.includes('증상')
          ? 'symptoms'
          : message.includes('긴급')
            ? 'emergency'
            : message.includes('일반')
              ? 'general'
              : message.includes('비용')
                ? 'cost'
                : 'general';

        const template = AI_RESPONSE_TEMPLATES[optionId];

        // AI 응답 추가
        addMessage({
          message: template.message,
          type: 'assistant',
        });

        // AI 응답 데이터 저장
        addAIResponse({
          message: template.message,
          confidence: 0.95,
          suggestedActions: [...template.suggestedActions],
        });

        // 입력창 표시
        setShowInput(true);
      }
    } catch (error) {
      console.error('AI 응답 처리 오류:', error);

      // 오류 시 기본 응답
      addMessage({
        message: '죄송합니다. AI 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.',
        type: 'assistant',
      });
    } finally {
      setWaiting(false);
    }
  };

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
        className={`scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent mt-4 flex-1 overflow-y-auto pr-4 pb-8 ${
          chatAIState.showInput ? 'mb-26' : 'mb-4'
        }`}
      >
        {chatAIState.messages.map((message, index) => (
          <AIBubble
            key={message.id}
            message={message}
            // 첫 번째 AI 메시지(환영 메시지)에만 선택지 표시
            showOptions={message.type === 'assistant' && index === 0 && chatAIState.showOptions}
            // 예약 문의 응답에 하위 선택지 표시
            showSubOptions={
              message.type === 'assistant' &&
              showSubOptions &&
              message.message === AI_RESPONSE_TEMPLATES.appointment.message
            }
            onOptionSelect={handleOptionSelect}
            isWaiting={chatAIState.isWaiting}
          />
        ))}

        {/* 대기 중 표시 */}
        {chatAIState.isWaiting && <AIWaitingMessage />}
      </div>

      {/* AI 응답 정보 표시 */}
      <AIResponseInfo lastAIResponse={chatAIState.lastAIResponse} />
    </ChatLayout>
  );
}
