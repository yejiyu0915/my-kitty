import { differenceInYears, parseISO, format, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

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
