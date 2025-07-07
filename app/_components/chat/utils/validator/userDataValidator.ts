import { CHAT_STEP_DOMAINS } from '../../data/chatDomains';
import { validateByDomain } from './domainValidator';

// 단계별 유효성 검사 (chatSteps.ts에서 사용)
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
