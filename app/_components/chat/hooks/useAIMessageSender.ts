import { useCallback } from 'react';
import { callAIService } from '../utils/aiService';
import { ChatAIMessage, AIResponse } from '../types/chatAI';

interface UseAIMessageSenderProps {
  addMessage: (message: Omit<ChatAIMessage, 'id' | 'timestamp'>) => void;
  addAIResponse: (response: Omit<AIResponse, 'timestamp'>) => void;
  setWaiting: (waiting: boolean) => void;
  setShowInput: (show: boolean) => void;
  messages: ChatAIMessage[];
  canMakeApiCall: () => boolean;
  recordApiCall: () => void;
  isProcessingRef: React.MutableRefObject<boolean>;
}

export function useAIMessageSender({
  addMessage,
  addAIResponse,
  setWaiting,
  setShowInput,
  messages,
  canMakeApiCall,
  recordApiCall,
  isProcessingRef,
}: UseAIMessageSenderProps) {
  // 실제 AI API 호출 (제한 적용)
  const handleSendMessage = useCallback(
    async (inputMessage: string) => {
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

      addMessage({
        message: inputMessage,
        type: 'user',
      });

      setWaiting(true);
      setShowInput(false);

      try {
        // API 호출 카운트 증가
        recordApiCall();

        const aiResponse = await callAIService(inputMessage, messages);

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
    },
    [
      addMessage,
      addAIResponse,
      setWaiting,
      setShowInput,
      messages,
      canMakeApiCall,
      recordApiCall,
      isProcessingRef,
    ]
  );

  return {
    handleSendMessage,
  };
}
