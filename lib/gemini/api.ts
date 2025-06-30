// Gemini API 호출 함수
import { GeminiRequest, GeminiResponse, ChatbotResponse } from './types';
import { GEMINI_CONFIG, SYSTEM_PROMPT } from './config';

export async function callGeminiAPI(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<ChatbotResponse> {
  try {
    // API 키 확인
    if (!GEMINI_CONFIG.apiKey) {
      throw new Error('Gemini API 키가 설정되지 않았습니다.');
    }

    // 대화 히스토리 구성
    const contents = [
      {
        role: 'user' as const,
        parts: [{ text: SYSTEM_PROMPT }],
      },
    ];

    // 이전 대화 히스토리 추가
    conversationHistory.forEach((msg) => {
      contents.push({
        role: msg.role as 'user' | 'model',
        parts: [{ text: msg.content }],
      });
    });

    // 현재 사용자 메시지 추가
    contents.push({
      role: 'user' as const,
      parts: [{ text: userMessage }],
    });

    console.log('Gemini API 호출:', {
      model: GEMINI_CONFIG.model,
      message: userMessage,
    });

    // Gemini API 호출
    const response = await fetch(`${GEMINI_CONFIG.baseUrl}?key=${GEMINI_CONFIG.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: GEMINI_CONFIG.temperature,
          maxOutputTokens: GEMINI_CONFIG.maxTokens,
          topP: 0.8,
          topK: 40,
        },
      } as GeminiRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API 오류:', errorText);
      throw new Error(`Gemini API 호출 실패: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    const aiResponse =
      data.candidates[0]?.content?.parts[0]?.text || '죄송합니다. 응답을 생성할 수 없습니다.';

    console.log('Gemini 응답:', aiResponse);

    // 응답 신뢰도 계산
    const confidence = calculateConfidence(userMessage, aiResponse);

    return {
      message: aiResponse,
      confidence,
      suggestedActions: extractSuggestedActions(aiResponse),
    };
  } catch (error) {
    console.error('Gemini API 호출 오류:', error);

    // 오류 시 기본 응답 반환
    return {
      message: '죄송합니다. AI 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.',
      confidence: 0,
    };
  }
}

// 신뢰도 계산 함수
function calculateConfidence(userMessage: string, aiResponse: string): number {
  const keywords = ['증상', '아픔', '예약', '방문', '준비', '질문', '고양이', '병원', '치료'];
  const hasRelevantKeywords = keywords.some(
    (keyword) => userMessage.includes(keyword) || aiResponse.includes(keyword)
  );

  const responseLength = aiResponse.length;
  const isGoodLength = responseLength > 10 && responseLength < 500;

  return hasRelevantKeywords && isGoodLength ? 0.9 : 0.7;
}

// 제안 액션 추출 함수
function extractSuggestedActions(response: string): string[] {
  const actions: string[] = [];

  if (response.includes('예약') || response.includes('방문')) actions.push('예약하기');
  if (response.includes('증상') || response.includes('아픔')) actions.push('증상 확인');
  if (response.includes('준비') || response.includes('가져올 것')) actions.push('준비사항');
  if (response.includes('비용') || response.includes('가격')) actions.push('비용 안내');

  return actions;
}
