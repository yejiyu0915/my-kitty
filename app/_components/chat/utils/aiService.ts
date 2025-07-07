import { ChatAIMessage, AIResponse } from '../types/chatAI';

// AI API 호출 함수 (SDK 방식으로 개선)
export async function callAIService(
  message: string,
  conversationHistory: ChatAIMessage[]
): Promise<AIResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory: conversationHistory.map((msg) => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.message,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API 호출 실패');
    }

    const aiResponse = await response.json();

    return {
      message: aiResponse.message,
      confidence: aiResponse.confidence || 0.8,
      suggestedActions: aiResponse.suggestedActions || [],
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('AI 서비스 호출 오류:', error);
    throw error;
  }
}

// 대화 세션 리셋 함수
export async function resetAISession(): Promise<void> {
  try {
    const response = await fetch('/api/chat/reset', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('세션 리셋 실패');
    }

    console.log('AI 대화 세션이 리셋되었습니다.');
  } catch (error) {
    console.error('세션 리셋 오류:', error);
    throw error;
  }
}

// 제안 액션 추출 함수
export function extractSuggestedActions(aiResponse: string): string[] {
  const suggestedActions: string[] = [];

  if (aiResponse.includes('예약') || aiResponse.includes('방문')) {
    suggestedActions.push('예약하기');
  }
  if (aiResponse.includes('증상') || aiResponse.includes('아픔')) {
    suggestedActions.push('증상 확인');
  }
  if (aiResponse.includes('준비') || aiResponse.includes('가져올 것')) {
    suggestedActions.push('준비사항');
  }
  if (aiResponse.includes('비용') || aiResponse.includes('가격')) {
    suggestedActions.push('비용 안내');
  }

  return suggestedActions;
}

// 에러 메시지 생성 함수
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다.';
}
