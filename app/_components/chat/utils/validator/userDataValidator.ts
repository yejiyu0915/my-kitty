import { z } from 'zod';
import { UserDataSchema, UserData, PartialUserData } from '../../data/chatSchemas';
import { CHAT_STEP_DOMAINS } from '../../data/chatDomains';
import { validateByDomain } from './domainValidator';

// 단계별 유효성 검사 (기존 호환성을 위해 유지)
export const validateByStep = (
  step: number,
  value: string
): { isValid: boolean; error?: string } => {
  const domain = CHAT_STEP_DOMAINS[step];
  if (!domain) {
    return { isValid: true }; // 유효성 검사가 필요 없는 단계
  }
  return validateByDomain(domain, value);
};

// 전체 사용자 데이터 유효성 검사
export const validateUserData = (
  data: PartialUserData
): {
  isValid: boolean;
  errors?: Record<string, string>;
} => {
  try {
    UserDataSchema.parse(data);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: '알 수 없는 오류가 발생했습니다' } };
  }
};

// 특정 필드만 유효성 검사
export const validateField = <T extends keyof UserData>(
  field: T,
  value: UserData[T]
): { isValid: boolean; error?: string } => {
  try {
    UserDataSchema.shape[field].parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: '알 수 없는 오류가 발생했습니다' };
  }
};
