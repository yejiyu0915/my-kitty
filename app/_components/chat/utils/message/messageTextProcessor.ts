import { formatAge } from '@/utils/formatters';

// {name} 플레이스홀더 치환
export const replaceNamePlaceholder = (text: string, userName: string): string => {
  if (text.includes('{name}')) {
    return text.replace('{name}', userName);
  }
  return text;
};

// 동적 메시지 생성 (나이 계산 등)
export const createDynamicMessage = (
  domain: string,
  userMessage: string,
  defaultMessage: string
): string => {
  if (domain === 'age_calculation') {
    return formatAge(userMessage);
  }
  return defaultMessage;
};
