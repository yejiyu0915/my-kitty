import {
  differenceInYears,
  parseISO,
  format,
  isValid,
  isAfter,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatName = (value: string): string => {
  return `${value}입니다.`;
};

// 생년월일 포맷팅 (YYYY-MM-DD -> YYYY년 MM월 DD일입니다.)
export const formatBirthDate = (value: string): string => {
  if (!value) return '';

  try {
    const date = parseISO(value);
    if (!isValid(date)) return '';

    return format(date, 'yyyy년 M월 d일입니다.', { locale: ko });
  } catch {
    return '';
  }
};

// 만 나이 계산 및 포맷팅
export const formatAge = (birthDate: string): string => {
  if (!birthDate) return '';

  try {
    const birth = parseISO(birthDate);
    if (!isValid(birth)) return '';

    const age = differenceInYears(new Date(), birth);
    return `만 ${age}세시군요.`;
  } catch {
    return '';
  }
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

  try {
    const date = parseISO(value);
    if (!isValid(date)) return '';

    return format(date, 'yyyy년 M월 d일 HH시 mm분입니다.', { locale: ko });
  } catch {
    return '';
  }
};

// 날짜 유효성 검사 헬퍼 함수
export const isValidDateRange = (date: string, minDate?: Date, maxDate?: Date): boolean => {
  try {
    const parsedDate = parseISO(date);
    if (!isValid(parsedDate)) return false;

    if (minDate && isBefore(parsedDate, startOfDay(minDate))) return false;
    if (maxDate && isAfter(parsedDate, endOfDay(maxDate))) return false;

    return true;
  } catch {
    return false;
  }
};

// 방문 시간 유효성 검사
export const isValidVisitTime = (dateTime: string): boolean => {
  try {
    const date = parseISO(dateTime);
    if (!isValid(date)) return false;

    const now = new Date();

    // 현재 시간 이후
    if (date <= now) return false;

    // 일요일 제외 (0 = 일요일)
    if (date.getDay() === 0) return false;

    // 9:00 ~ 18:00 시간대
    const hours = date.getHours();
    if (hours < 9 || hours >= 18) return false;

    // 30분 단위
    const minutes = date.getMinutes();
    if (minutes !== 0 && minutes !== 30) return false;

    return true;
  } catch {
    return false;
  }
};
