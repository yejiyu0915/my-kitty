/**
 * 채팅 단계 도메인 상수
 *
 * 이 파일은 채팅 플로우의 모든 도메인을 중앙에서 관리합니다.
 * 도메인 추가/수정/삭제 시 이 파일만 수정하면 됩니다.
 */

// 도메인 목록을 상수로 분리
export const CHAT_STEP_DOMAINS = [
  'greeting', // 인사
  'symptoms', // 증상
  'pain_level', // 통증 강도
  'confirmation', // 확인 메시지
  'patient_info', // 환자 정보
  'birth_date', // 생년월일
  'age_calculation', // 나이 계산
  'gender', // 성별
  'visit_reason', // 방문 경위
  'contact', // 연락처
  'appreciation', // 감사 메시지
  'appointment', // 예약
  'appointment_confirmation', // 예약 확정
  'appointment_close', // 예약 마무리
] as const;

// 도메인 타입 추론
export type ChatStepDomain = (typeof CHAT_STEP_DOMAINS)[number];

// 도메인별 메타데이터 (향후 확장용)
export const DOMAIN_METADATA = {
  greeting: { label: '인사', requiresValidation: true, category: 'user_info' },
  symptoms: { label: '증상', requiresValidation: false, category: 'medical' },
  pain_level: { label: '통증 강도', requiresValidation: false, category: 'medical' },
  confirmation: { label: '확인 메시지', requiresValidation: false, category: 'system' },
  patient_info: { label: '환자 정보', requiresValidation: false, category: 'system' },
  birth_date: { label: '생년월일', requiresValidation: true, category: 'user_info' },
  age_calculation: { label: '나이 계산', requiresValidation: false, category: 'system' },
  gender: { label: '성별', requiresValidation: true, category: 'user_info' },
  visit_reason: { label: '방문 경위', requiresValidation: false, category: 'user_info' },
  contact: { label: '연락처', requiresValidation: true, category: 'user_info' },
  appreciation: { label: '감사 메시지', requiresValidation: false, category: 'system' },
  appointment: { label: '예약', requiresValidation: true, category: 'appointment' },
  appointment_confirmation: { label: '예약 확정', requiresValidation: false, category: 'system' },
  appointment_close: { label: '예약 마무리', requiresValidation: false, category: 'system' },
} as const;

// 유틸리티 함수들
export const getDomainLabel = (domain: ChatStepDomain): string => {
  return DOMAIN_METADATA[domain].label;
};

export const getDomainCategory = (domain: ChatStepDomain): string => {
  return DOMAIN_METADATA[domain].category;
};

export const requiresValidation = (domain: ChatStepDomain): boolean => {
  return DOMAIN_METADATA[domain].requiresValidation;
};
