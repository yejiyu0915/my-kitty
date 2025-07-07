/**
 * 공통 포맷팅 유틸리티 함수들
 */

import { differenceInYears, parseISO, format, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

// 생년월일 포맷팅 및 나이 계산 함수
export const formatBirthDateWithAge = (birthDateString: string) => {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  // 나이 계산
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // 생일이 지나지 않았으면 나이에서 1 빼기
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // 생년월일 포맷팅
  const formattedDate = birthDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return `${formattedDate} (만 ${age}세)`;
};

// Chat용 생년월일 포맷팅 (YYYY-MM-DD -> YYYY년 MM월 DD일입니다.)
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

// 만 나이 계산 및 포맷팅 (Chat용)
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

// 연락처 포맷팅 함수 (Report용)
export const formatPhoneNumber = (phoneNumber: string) => {
  // 숫자만 추출
  const numbers = phoneNumber.replace(/\D/g, '');

  // 길이에 따라 다른 포맷팅 적용
  if (numbers.length === 10) {
    // 0101234567 -> 010-1234-567
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  } else if (numbers.length === 11) {
    // 01012345678 -> 010-1234-5678
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  } else {
    // 다른 길이는 원본 반환
    return phoneNumber;
  }
};

// 연락처 포맷팅 함수 (Chat용)
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

// 방문일시 포맷팅 함수 (Report용)
export const formatVisitDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);

  // 2025년 6월 30일 15시 30분 형식으로 포맷팅
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};

// 방문 날짜/시간 포맷팅 (Chat용)
export const formatVisitDateTimeForChat = (value: string): string => {
  if (!value) return '';

  try {
    const date = parseISO(value);
    if (!isValid(date)) return '';

    return format(date, 'yyyy년 M월 d일 HH시 mm분입니다.', { locale: ko });
  } catch {
    return '';
  }
};

// 증상 강도 label 찾기 함수
export const getPainLevelLabel = (painLevelValue: string) => {
  const painLevelOptions = [
    { value: '매우 심합니다.', label: '매우 심함' },
    { value: '심합니다.', label: '심함' },
    { value: '보통입니다.', label: '보통' },
    { value: '약합니다.', label: '약함' },
    { value: '매우 약합니다.', label: '매우 약함' },
  ];

  const option = painLevelOptions.find((opt) => opt.value === painLevelValue);
  return option ? option.label : painLevelValue;
};

// 이름 포맷팅 함수 (Chat용)
export const formatName = (value: string): string => {
  return `${value}(이)라고 합니다.`;
};

// 성별 포맷팅 함수 (Chat용)
export const formatGender = (value: string): string => {
  return `${value}입니다.`;
};

// 방문 경로 포맷팅 함수 (Chat용)
export const formatVisitPath = (value: string): string => {
  switch (value) {
    case '인터넷 검색':
      return '인터넷 검색으로 알아보고 왔습니다.';
    case '지인 소개':
      return '지인 소개로 알아보고 왔습니다.';
    case '광고/홍보물':
      return '광고/홍보물로 알아보고 왔습니다.';
    default:
      return value;
  }
};
