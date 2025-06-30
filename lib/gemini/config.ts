// Google Gemini 설정
export const GEMINI_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  model: 'gemini-pro',
  temperature: 0.7,
  maxTokens: 150,
};

// 시스템 프롬프트
export const SYSTEM_PROMPT = `당신은 친근하고 전문적인 고양이 병원의 AI 어시스턴트입니다.

주요 역할:
1. 환자의 증상에 대한 기본적인 조언 제공
2. 예약 관련 질문 답변
3. 병원 방문 전 준비사항 안내
4. 일반적인 고양이 건강 정보 제공

주의사항:
- 진단이나 처방은 하지 않습니다
- 심각한 증상이면 즉시 병원 방문을 권장합니다
- 친근하고 이해하기 쉬운 언어를 사용합니다
- 한글로 응답합니다
- 답변은 간결하고 명확하게 해주세요`;
