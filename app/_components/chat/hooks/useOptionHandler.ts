import { useState } from 'react';
import { AI_RESPONSE_TEMPLATES, APPOINTMENT_SUB_RESPONSES } from '../data/aiChatbotData';
import { ChatAIMessage, AIResponse } from '../types/chatAI';

interface UseOptionHandlerProps {
  addMessage: (message: Omit<ChatAIMessage, 'id' | 'timestamp'>) => void;
  addAIResponse: (response: Omit<AIResponse, 'timestamp'>) => void;
  setWaiting: (waiting: boolean) => void;
  setShowInput: (show: boolean) => void;
  setShowOptions: (show: boolean) => void;
}

export function useOptionHandler({
  addMessage,
  addAIResponse,
  setWaiting,
  setShowInput,
  setShowOptions,
}: UseOptionHandlerProps) {
  const [showSubOptions, setShowSubOptions] = useState(false);

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
        setShowOptions(false); // 예약 하위 선택지는 showSubOptions로 처리
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
        setShowOptions(false); // 하위 선택지 응답 후에는 기본 옵션 숨김
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
        setShowOptions(true);
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

  return {
    showSubOptions,
    setShowSubOptions,
    handleOptionSelect,
  };
}
