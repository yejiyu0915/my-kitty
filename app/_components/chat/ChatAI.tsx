'use client';

import { useState, useCallback, useRef } from 'react';
import { useChatAIState } from './hooks/useChatAIState';
import { useAIScroll } from './hooks/useAIScroll';
import { callAIService, resetAISession } from './utils/aiService';
import { AI_RESPONSE_TEMPLATES, APPOINTMENT_SUB_RESPONSES } from './data/aiChatbotData';
import AIHeader from './ui/ai/AIHeader';
import AIBubble from './ui/ai/AIBubble';
import AIWaitingMessage from './ui/ai/AIWaitingMessage';
import AIResponseInfo from './ui/ai/AIResponseInfo';
import AIInput from './ui/ai/AIInput';
import ChatLayout from './ui/ChatLayout';
import React from 'react';

interface ChatAIProps {
  onReset?: () => void;
}

export default function ChatAI({ onReset }: ChatAIProps) {
  const { chatAIState, addMessage, addAIResponse, setWaiting, setShowInput, resetChatAI } =
    useChatAIState();
  const [inputMessage, setInputMessage] = useState('');
  const [showSubOptions, setShowSubOptions] = useState(false);

  // API 호출 제한을 위한 상태
  const [apiCallCount, setApiCallCount] = useState(0);
  const [lastApiCallTime, setLastApiCallTime] = useState(0);
  const isProcessingRef = useRef(false);

  // 대화가 진행되었는지 확인 (환영 메시지 외에 다른 메시지가 있는지)
  const hasConversationProgress = chatAIState.messages.length > 1;

  // AI 스크롤 훅 사용
  const { scrollRef } = useAIScroll(chatAIState.messages, chatAIState.isWaiting, {
    smooth: true,
    threshold: 100,
  });

  // API 호출 제한 체크 (무료 호스팅 제한 고려)
  const canMakeApiCall = useCallback(() => {
    const now = Date.now();
    const timeSinceLastCall = now - lastApiCallTime;

    // 1분에 최대 10회, 연속 호출 간격 최소 3초
    if (apiCallCount >= 10 && timeSinceLastCall < 60000) {
      return false;
    }

    if (timeSinceLastCall < 3000) {
      return false;
    }

    return true;
  }, [apiCallCount, lastApiCallTime]);

  // 선택지 클릭 핸들러 (템플릿 응답만 사용 - API 호출 없음)
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
        setShowSubOptions(true);

        addMessage({
          message: AI_RESPONSE_TEMPLATES.appointment.message,
          type: 'assistant',
        });

        addAIResponse({
          message: AI_RESPONSE_TEMPLATES.appointment.message,
          confidence: 0.95,
          suggestedActions: [...AI_RESPONSE_TEMPLATES.appointment.suggestedActions],
        });
      } else if (showSubOptions) {
        setShowSubOptions(false);

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
          subResponse = APPOINTMENT_SUB_RESPONSES.checkup;
        }

        addMessage({
          message: subResponse.message,
          type: 'assistant',
        });

        addAIResponse({
          message: subResponse.message,
          confidence: 0.95,
          suggestedActions: [...subResponse.suggestedActions],
        });

        setShowInput(true);
      } else {
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

        addMessage({
          message: template.message,
          type: 'assistant',
        });

        addAIResponse({
          message: template.message,
          confidence: 0.95,
          suggestedActions: [...template.suggestedActions],
        });

        setShowInput(true);
      }
    } catch (error) {
      console.error('AI 응답 처리 오류:', error);
      addMessage({
        message: '죄송합니다. AI 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.',
        type: 'assistant',
      });
    } finally {
      setWaiting(false);
    }
  };

  // 실제 AI API 호출 (제한 적용)
  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isProcessingRef.current) return;

    // API 호출 제한 체크
    if (!canMakeApiCall()) {
      addMessage({
        message: '죄송합니다. API 호출 제한에 도달했습니다. 잠시 후 다시 시도해주세요.',
        type: 'assistant',
      });
      return;
    }

    isProcessingRef.current = true;
    const userMessage = inputMessage;
    setInputMessage('');

    addMessage({
      message: userMessage,
      type: 'user',
    });

    setWaiting(true);
    setShowInput(false);

    try {
      // API 호출 카운트 증가
      setApiCallCount((prev) => prev + 1);
      setLastApiCallTime(Date.now());

      const aiResponse = await callAIService(userMessage, chatAIState.messages);

      addMessage({
        message: aiResponse.message,
        type: 'assistant',
      });

      addAIResponse(aiResponse);
    } catch (error) {
      console.error('AI 응답 처리 오류:', error);
      addMessage({
        message: '죄송합니다. AI 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.',
        type: 'assistant',
      });
    } finally {
      setWaiting(false);
      setShowInput(true);
      isProcessingRef.current = false;
    }
  }, [
    inputMessage,
    canMakeApiCall,
    chatAIState.messages,
    addMessage,
    setWaiting,
    setShowInput,
    addAIResponse,
  ]);

  // AI 모드 리셋 처리
  const handleAIReset = async () => {
    if (hasConversationProgress) {
      // 대화가 진행되었을 때만 리셋
      resetChatAI();
      setInputMessage('');
      setShowSubOptions(false);
      setApiCallCount(0);
      setLastApiCallTime(0);
      isProcessingRef.current = false;

      // 서버 세션도 리셋
      try {
        await resetAISession();
      } catch (error) {
        console.error('서버 세션 리셋 실패:', error);
      }
    }
    // 대화가 진행되지 않았으면 아무 동작도 하지 않음
  };

  // onReset prop이 변경될 때 처리
  React.useEffect(() => {
    if (onReset) {
      handleAIReset();
    }
  }, [onReset]);

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
        className={`scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent flex-1 overflow-y-auto pr-4 pb-8 ${
          chatAIState.showInput ? 'mb-26' : 'mb-4'
        }`}
      >
        {chatAIState.messages.map((message, index) => (
          <AIBubble
            key={message.id}
            message={message}
            showOptions={message.type === 'assistant' && index === 0 && chatAIState.showOptions}
            showSubOptions={
              message.type === 'assistant' &&
              showSubOptions &&
              message.message === AI_RESPONSE_TEMPLATES.appointment.message
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
