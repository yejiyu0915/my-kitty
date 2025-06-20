export const formatName = (value: string): string => {
  return `${value}입니다.`;
};

// 생년월일 포맷팅 (YYYY-MM-DD -> YYYY년 MM월 DD일입니다.)
export const formatBirthDate = (value: string): string => {
  if (!value) return '';

  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일입니다.`;
};

// 만 나이 계산 및 포맷팅
export const formatAge = (birthDate: string): string => {
  if (!birthDate) return '';

  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // 생일이 지나지 않았으면 1살 빼기
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return `만 ${age}세시군요.`;
};

// 성별 포맷팅
export const formatGender = (value: string): string => {
  return `${value}입니다.`;
};

// 연락처 포맷팅 (숫자에 하이픈 추가)
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

// 방문 날짜/시간 포맷팅
export const formatVisitDateTime = (value: string): string => {
  if (!value) return '';

  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분입니다.`;
};
