// Report 전용 포맷터 함수들
// 기존 utils/formatters.ts의 함수들을 재사용하되, Report에 특화된 포맷터도 추가

import {
  formatBirthDateWithAge,
  formatPhoneNumber,
  formatVisitDateTime,
  getPainLevelLabel,
} from '@/utils/formatters';

// Report에서 사용할 포맷터들을 재export
export { formatBirthDateWithAge, formatPhoneNumber, formatVisitDateTime, getPainLevelLabel };

// Report 전용 포맷터들
export const formatReportDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
};

// 답변 내용 포맷터
export const formatAnswerContent = (content: string): string => {
  if (!content) return '';

  // 긴 텍스트의 경우 줄바꿈 처리
  return content.length > 50 ? `${content.substring(0, 50)}...` : content;
};

// 필드 라벨 포맷터
export const formatFieldLabel = (label: string): string => {
  return `${label}:`;
};
