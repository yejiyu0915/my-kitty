// 텍스트 포맷팅 함수들
export const formatName = (value: string): string => {
  return `${value}라고 합니다.`;
};

export const formatGender = (value: string): string => {
  return `${value}입니다.`;
};

export const formatContact = (value: string): string => {
  if (!value) return '';

  // 숫자만 추출
  const numbers = value.replace(/\D/g, '');

  // 전화번호 형식으로 변환 (010-1234-5678)
  if (numbers.length === 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}입니다.`;
  } else if (numbers.length === 10) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}입니다.`;
  }

  return `${value}입니다.`;
};
