// Hugging Face 설정
export const HUGGINGFACE_CONFIG = {
  // API 엔드포인트
  baseUrl: 'https://api-inference.huggingface.co/models',

  // 번역 모델들
  translationModel: 'Helsinki-NLP/opus-mt-en-ko', // 영어→한국어
  multilingualModel: 'facebook/mbart-large-50-many-to-many-mmt', // 다국어

  // 기본 생성 모델 (영어)
  generationModel: 'gpt2',

  // API 키 (환경변수에서 가져옴)
  apiKey: process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || '',

  // 응답 설정
  maxLength: 50,
  temperature: 0.7,

  // 무료 API 제한
  rateLimit: {
    requestsPerMinute: 30, // 분당 30회 요청
    requestsPerHour: 1000, // 시간당 1000회 요청
  },
};

// 시스템 프롬프트
export const SYSTEM_PROMPT = `당신은 병원의 AI 어시스턴트입니다. 
한국어로 친근하게 응답해주세요. 
진단이나 처방은 하지 말고, 기본적인 조언만 제공해주세요.`;
