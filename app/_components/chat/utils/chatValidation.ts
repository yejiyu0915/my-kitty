// 이름 유효성 검사 정규식
export const NAME_REGEX = /^[가-힣a-zA-Z]{2,}$/;

export const validateName = (value: string): boolean => {
  return NAME_REGEX.test(value);
};

// 생년월일 유효성 검사
export const validateBirthDate = (value: string): boolean => {
  if (!value) return false;

  const selectedDate = new Date(value);
  const minDate = new Date('1900-01-01');
  const maxDate = new Date();

  // 1900년 이후부터 오늘까지의 날짜만 유효
  return selectedDate >= minDate && selectedDate <= maxDate;
};

// 성별 유효성 검사
export const validateGender = (value: string): boolean => {
  return ['남성', '여성'].includes(value);
};

// 연락처 유효성 검사 (전화번호만)
export const validateContact = (value: string): boolean => {
  if (!value) return false;

  // 숫자만 추출
  const numbers = value.replace(/\D/g, '');

  // 10자리 또는 11자리 전화번호만 유효
  return numbers.length === 10 || numbers.length === 11;
};

// 방문 날짜/시간 유효성 검사
export const validateVisitDateTime = (value: string): boolean => {
  if (!value) return false;

  const selectedDateTime = new Date(value);
  const now = new Date();

  // 현재 시간 이후의 날짜/시간만 유효
  if (selectedDateTime <= now) return false;

  // 일요일 제외 (0 = 일요일)
  if (selectedDateTime.getDay() === 0) return false;

  // 9:00 ~ 18:00 시간대만 유효
  const hours = selectedDateTime.getHours();
  if (hours < 9 || hours >= 18) return false;

  // 30분 단위만 유효 (분이 0 또는 30)
  const minutes = selectedDateTime.getMinutes();
  if (minutes !== 0 && minutes !== 30) return false;

  return true;
};
