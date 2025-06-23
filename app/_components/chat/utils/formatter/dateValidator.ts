import { parseISO, isValid, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

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
