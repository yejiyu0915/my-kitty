import { chatSteps } from '../data/chatSteps';

/**
 * 다음 단계 가져오기
 */
export const getNextStep = (currentStep: number): number | null => {
  const nextStep = currentStep + 1;
  return nextStep < chatSteps.length ? nextStep : null;
};

/**
 * 단계 데이터 가져오기
 */
export const getStepData = (step: number) => {
  return chatSteps[step];
};

/**
 * 단계가 유효한지 확인
 */
export const isValidStep = (step: number): boolean => {
  return step >= 0 && step < chatSteps.length;
};

/**
 * 다음 단계가 message 타입인지 확인
 */
export const isNextStepMessage = (currentStep: number): boolean => {
  const nextStep = getNextStep(currentStep);
  if (nextStep === null) return false;

  const nextStepData = getStepData(nextStep);
  return nextStepData.type === 'message';
};

/**
 * 다음 단계가 question 타입인지 확인
 */
export const isNextStepQuestion = (currentStep: number): boolean => {
  const nextStep = getNextStep(currentStep);
  if (nextStep === null) return false;

  const nextStepData = getStepData(nextStep);
  return nextStepData.type === 'question';
};
