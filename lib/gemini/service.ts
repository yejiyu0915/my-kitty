import { GoogleGenerativeAI, ChatSession } from '@google/generative-ai';

// Gemini API 클라이언트 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 모델 설정
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 150,
    topP: 0.8,
    topK: 40,
  },
});

// 대화 세션 관리
let chatSession: ChatSession | null = null;

// Gemini API 호출 함수
export async function callGeminiAPI(message: string): Promise<{
  message: string;
  confidence: number;
  suggestedActions: string[];
}> {
  try {
    // API 키 확인
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Gemini API 키가 설정되지 않았습니다.');
    }

    // 첫 번째 메시지인 경우 새 세션 시작
    if (!chatSession) {
      chatSession = model.startChat({
        history: [
          {
            role: 'user',
            parts: [
              {
                text: '당신은 병원의 AI 어시스턴트입니다. 한국어로 친근하게 응답해주세요. 진단이나 처방은 하지 말고, 기본적인 조언만 제공해주세요.',
              },
            ],
          },
          {
            role: 'model',
            parts: [{ text: '안녕하세요! 병원 AI 어시스턴트입니다. 무엇을 도와드릴까요?' }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        },
      });
    }

    // 메시지 전송
    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    const aiResponse = response.text();

    // 제안 액션 추출
    const suggestedActions = extractSuggestedActions(aiResponse);

    return {
      message: aiResponse,
      confidence: 0.9,
      suggestedActions,
    };
  } catch (error) {
    console.error('Gemini API 오류:', error);
    throw new Error('AI 서비스에 일시적인 문제가 있습니다.');
  }
}

// 제안 액션 추출 함수
function extractSuggestedActions(aiResponse: string): string[] {
  const actions: string[] = [];

  if (aiResponse.includes('예약') || aiResponse.includes('방문')) {
    actions.push('예약하기');
  }
  if (aiResponse.includes('증상') || aiResponse.includes('아픔')) {
    actions.push('증상 확인');
  }
  if (aiResponse.includes('준비') || aiResponse.includes('가져올 것')) {
    actions.push('준비사항');
  }
  if (aiResponse.includes('비용') || aiResponse.includes('가격')) {
    actions.push('비용 안내');
  }
  if (aiResponse.includes('위치') || aiResponse.includes('오시는 길')) {
    actions.push('위치 안내');
  }

  return actions;
}

// 대화 세션 리셋
export function resetChatSession(): void {
  chatSession = null;
}

// 타입 정의
export interface GeminiResponse {
  message: string;
  confidence: number;
  suggestedActions: string[];
}
