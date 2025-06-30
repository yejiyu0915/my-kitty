// Ollama API 호출 함수
import { OllamaRequest, OllamaResponse, ChatbotResponse } from './types';
import { OLLAMA_CONFIG, SYSTEM_PROMPT } from './config';

export async function callOllamaAPI(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<ChatbotResponse> {
  try {
    // Ollama 서버 연결 확인
    const healthCheck = await fetch(`${OLLAMA_CONFIG.baseUrl}/api/tags`);
    if (!healthCheck.ok) {
      throw new Error('Ollama 서버에 연결할 수 없습니다. Ollama가 실행 중인지 확인해주세요.');
    }

    // 한국어 강화 프롬프트
    const koreanPrompt = `${SYSTEM_PROMPT}

사용자 질문: ${userMessage}

한국어로 답변해주세요:`;

    console.log('Ollama API 호출:', {
      model: OLLAMA_CONFIG.model,
      prompt: koreanPrompt,
    });

    // generate API 사용 (chat 대신)
    const response = await fetch(`${OLLAMA_CONFIG.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_CONFIG.model,
        prompt: koreanPrompt,
        stream: false,
        options: {
          temperature: OLLAMA_CONFIG.temperature,
          num_predict: OLLAMA_CONFIG.maxTokens,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ollama API 오류 응답:', errorText);
      throw new Error(`Ollama API 호출 실패: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.response || '죄송합니다. 응답을 생성할 수 없습니다.';

    console.log('Ollama 응답:', aiResponse);

    // 응답 신뢰도 계산
    const confidence = calculateConfidence(userMessage, aiResponse);

    return {
      message: aiResponse,
      confidence,
      suggestedActions: extractSuggestedActions(aiResponse),
    };
  } catch (error) {
    console.error('Ollama API 호출 오류:', error);

    // 오류 시 기본 응답 반환
    return {
      message: '죄송합니다. AI 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.',
      confidence: 0,
    };
  }
}

// 신뢰도 계산 함수
function calculateConfidence(userMessage: string, aiResponse: string): number {
  // 간단한 신뢰도 계산 로직
  const keywords = ['증상', '아픔', '예약', '방문', '준비', '질문', '고양이', '병원', '치료'];
  const hasRelevantKeywords = keywords.some(
    (keyword) => userMessage.includes(keyword) || aiResponse.includes(keyword)
  );

  // 응답 길이가 적절한지 확인
  const responseLength = aiResponse.length;
  const isGoodLength = responseLength > 10 && responseLength < 500;

  return hasRelevantKeywords && isGoodLength ? 0.8 : 0.6;
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
