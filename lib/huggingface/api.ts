// Hugging Face API 호출 함수
import { HuggingFaceRequest, HuggingFaceResponse, ChatbotResponse } from './types';
import { HUGGINGFACE_CONFIG, SYSTEM_PROMPT } from './config';

export async function callHuggingFaceAPI(
  userMessage: string,
  conversationHistory: string[] = []
): Promise<ChatbotResponse> {
  try {
    // API 키 확인
    if (!HUGGINGFACE_CONFIG.apiKey) {
      throw new Error('Hugging Face API 키가 설정되지 않았습니다.');
    }

    // 대화 히스토리와 현재 메시지 결합
    const fullConversation = [SYSTEM_PROMPT, ...conversationHistory, userMessage].join('\n');

    console.log('Hugging Face API 호출:', {
      model: HUGGINGFACE_CONFIG.model,
      message: userMessage,
    });

    // Hugging Face API 호출
    const response = await fetch(`${HUGGINGFACE_CONFIG.baseUrl}/${HUGGINGFACE_CONFIG.model}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: fullConversation,
        parameters: {
          max_length: HUGGINGFACE_CONFIG.maxLength,
          temperature: HUGGINGFACE_CONFIG.temperature,
          do_sample: true,
          return_full_text: false,
        },
      } as HuggingFaceRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API 오류:', errorText);
      throw new Error(`Hugging Face API 호출 실패: ${response.status} - ${errorText}`);
    }

    const data: HuggingFaceResponse[] = await response.json();
    const aiResponse = data[0]?.generated_text || '죄송합니다. 응답을 생성할 수 없습니다.';

    console.log('Hugging Face 응답:', aiResponse);

    // 응답 신뢰도 계산
    const confidence = calculateConfidence(userMessage, aiResponse);

    return {
      message: aiResponse,
      confidence,
      suggestedActions: extractSuggestedActions(aiResponse),
    };
  } catch (error) {
    console.error('Hugging Face API 호출 오류:', error);

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
  const isGoodLength = responseLength > 5 && responseLength < 300;

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
