import { nanoid } from 'nanoid';

// AI 챗봇 초기 메시지
export const AI_WELCOME_MESSAGE = {
  id: nanoid(),
  message: '안녕하세요! 고양이 병원 AI 어시스턴트입니다. 🐱\n\n어떤 도움이 필요하신가요?',
  type: 'assistant' as const,
  timestamp: new Date().toISOString(),
};

// AI 챗봇 선택지 옵션들
export const AI_CHATBOT_OPTIONS = [
  {
    id: 'symptoms',
    text: '증상 상담',
    message: '증상에 대해 상담받고 싶습니다.',
  },
  {
    id: 'appointment',
    text: '예약 문의',
    message: '병원 예약에 대해 문의하고 싶습니다.',
  },
  {
    id: 'emergency',
    text: '긴급 상황',
    message: '긴급한 상황에 대한 조언이 필요합니다.',
  },
  {
    id: 'general',
    text: '일반 상담',
    message: '건강에 대한 일반적인 상담을 받고 싶습니다.',
  },
  {
    id: 'cost',
    text: '비용 문의',
    message: '진료 비용에 대해 문의하고 싶습니다.',
  },
] as const;

// 선택지별 AI 응답 템플릿
export const AI_RESPONSE_TEMPLATES = {
  symptoms: {
    message:
      '증상 상담을 도와드리겠습니다. 증상을 자세히 설명해주세요.\n\n- 언제부터 증상이 나타났나요?\n- 어떤 증상인가요? (구토, 설사, 식욕부진 등)\n- 다른 이상한 행동은 없나요?',
    suggestedActions: ['증상 상세 설명', '응급 여부 확인', '예약 안내'],
  },
  appointment: {
    message: '예약 문의를 도와드리겠습니다. 어떤 종류의 예약을 원하시나요?',
    suggestedActions: ['정기검진', '증상 진료', '예방접종', '수술 상담'],
    hasSubOptions: true,
  },
  emergency: {
    message:
      '긴급 상황이군요! 다음 중 어떤 상황인지 알려주세요:\n\n🚨 즉시 병원 방문이 필요한 경우:\n- 호흡 곤란\n- 심한 출혈\n- 의식 없음\n- 심한 통증\n\n⚠️ 관찰이 필요한 경우:\n- 식욕부진\n- 가벼운 설사\n- 기침',
    suggestedActions: ['긴급 상황 설명', '가까운 병원 안내', '응급 조치법'],
  },
  general: {
    message:
      '고양이 건강에 대한 일반적인 상담을 도와드리겠습니다. 어떤 부분이 궁금하신가요?\n\n- 영양 관리\n- 예방접종\n- 구충제\n- 치아 관리\n- 털 관리',
    suggestedActions: ['영양 상담', '예방접종 안내', '구충제 안내'],
  },
  cost: {
    message:
      '진료 비용에 대해 안내해드리겠습니다. 어떤 진료를 받으실 예정인가요?\n\n- 정기검진: 30,000원\n- 예방접종: 50,000원\n- 기본 진료: 40,000원\n- 특수 검사: 별도 문의\n\n* 정확한 비용은 증상과 검사 내용에 따라 달라질 수 있습니다.',
    suggestedActions: ['진료 종류 선택', '상세 비용 안내', '예약 문의'],
  },
} as const;

// 예약 관련 추가 선택지
export const APPOINTMENT_SUB_OPTIONS = [
  {
    id: 'checkup',
    text: '정기검진',
    message: '정기검진 예약을 원합니다.',
  },
  {
    id: 'symptom',
    text: '증상 진료',
    message: '증상이 있어서 진료받고 싶습니다.',
  },
  {
    id: 'vaccination',
    text: '예방접종',
    message: '예방접종을 받고 싶습니다.',
  },
  {
    id: 'surgery',
    text: '수술 상담',
    message: '수술에 대한 상담을 받고 싶습니다.',
  },
] as const;

// 예약 하위 선택지별 응답 템플릿
export const APPOINTMENT_SUB_RESPONSES = {
  checkup: {
    message:
      '정기검진 예약을 도와드리겠습니다.\n\n정기검진은 다음과 같은 내용을 포함합니다:\n- 기본 신체검사\n- 혈액검사\n- 예방접종 상태 확인\n- 영양 상담\n\n어떤 날짜에 방문을 원하시나요?',
    suggestedActions: ['날짜 선택', '시간 선택', '준비사항 안내'],
  },
  symptom: {
    message:
      '증상 진료 예약을 도와드리겠습니다.\n\n증상을 자세히 설명해주세요:\n- 언제부터 증상이 나타났나요?\n- 어떤 증상인가요?\n- 증상의 심각도는 어느 정도인가요?\n\n증상에 따라 긴급 진료가 필요할 수 있습니다.',
    suggestedActions: ['증상 상세 설명', '긴급 여부 확인', '예약 날짜 선택'],
  },
  vaccination: {
    message:
      '예방접종 예약을 도와드리겠습니다.\n\n다음 중 어떤 예방접종을 받으실 예정인가요?\n- 3종 혼합백신 (FVRCP)\n- 백혈병 백신 (FeLV)\n- 광견병 백신\n- 전염성 복막염 백신 (FIP)\n\n고양이의 나이와 이전 접종 이력을 알려주세요.',
    suggestedActions: ['백신 종류 선택', '접종 이력 확인', '예약 날짜 선택'],
  },
  surgery: {
    message:
      '수술 상담 예약을 도와드리겠습니다.\n\n어떤 수술을 고려하고 계신가요?\n- 중성화 수술 (거세/불임)\n- 치과 수술\n- 외과 수술\n- 기타 특수 수술\n\n수술 상담 시 고양이의 건강 상태와 수술 목적을 자세히 설명해주세요.',
    suggestedActions: ['수술 종류 선택', '상담 목적 설명', '예약 날짜 선택'],
  },
} as const;

// 선택지 타입
export type ChatbotOptionId = (typeof AI_CHATBOT_OPTIONS)[number]['id'];
