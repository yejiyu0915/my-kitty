import { ChatState } from '../data/chatSchemas';
import { TIMING } from './timingUtils';
import { getNextStep, getStepData } from './stepUtils';
import { formatAge } from './chatFormatter';
import { nanoid } from 'nanoid';

// 원장 메시지 생성
const createDoctorMessage = (message: string) => ({
  id: nanoid(),
  message,
  type: 'doctor' as const,
});

// {name} 플레이스홀더 치환
const replaceNamePlaceholder = (text: string, userName: string): string => {
  if (text.includes('{name}')) {
    return text.replace('{name}', userName);
  }
  return text;
};

/**
 * 메시지 처리 로직을 담당하는 클래스
 */
export class MessageProcessor {
  /**
   * message 타입 메시지 처리
   */
  static processMessageStep(
    nextStep: number,
    userMessage: string,
    setChatState: React.Dispatch<React.SetStateAction<ChatState>>
  ) {
    const nextStepData = getStepData(nextStep);

    setChatState((prev: ChatState) => ({
      ...prev,
      currentStep: nextStep,
    }));

    // message 타입 메시지 표시
    setTimeout(() => {
      setChatState((prev: ChatState) => ({
        ...prev,
        isWaiting: true,
      }));

      setTimeout(() => {
        // age_calculation 도메인인 경우 동적으로 나이 계산
        let messageText = nextStepData.message!;
        if (nextStepData.domain === 'age_calculation') {
          messageText = formatAge(userMessage);
        }

        setChatState((prev: ChatState) => ({
          ...prev,
          messages: [...prev.messages, createDoctorMessage(messageText)],
          isWaiting: false,
        }));

        // message 타입 메시지 후 다음 단계로 자동 진행
        setTimeout(() => {
          this.processNextStepAfterMessage(nextStep, userMessage, setChatState);
        }, TIMING.MESSAGE_DELAY);
      }, TIMING.DOCTOR_MESSAGE);
    }, TIMING.WAITING);
  }

  /**
   * message 타입 후 다음 단계 처리
   */
  private static processNextStepAfterMessage(
    currentStep: number,
    userMessage: string,
    setChatState: React.Dispatch<React.SetStateAction<ChatState>>
  ) {
    const nextStep = getNextStep(currentStep);
    if (nextStep === null) return;

    const nextStepData = getStepData(nextStep);

    setChatState((prev: ChatState) => ({
      ...prev,
      currentStep: nextStep,
    }));

    if (nextStepData.type === 'question') {
      this.processQuestionStep(nextStep, userMessage, setChatState);
    } else if (nextStepData.type === 'message') {
      this.processConsecutiveMessageStep(nextStep, userMessage, setChatState);
    }
  }

  /**
   * question 타입 메시지 처리
   */
  static processQuestionStep(
    step: number,
    userMessage: string,
    setChatState: React.Dispatch<React.SetStateAction<ChatState>>
  ) {
    const stepData = getStepData(step);

    setTimeout(() => {
      setChatState((prev: ChatState) => ({
        ...prev,
        isWaiting: true,
      }));

      setTimeout(() => {
        // {name} 플레이스홀더 치환
        const questionText = replaceNamePlaceholder(stepData.question!, userMessage);

        setChatState((prev: ChatState) => ({
          ...prev,
          messages: [...prev.messages, createDoctorMessage(questionText)],
          isWaiting: false,
        }));

        // question 메시지 완료 후 input 표시
        setTimeout(() => {
          setChatState((prev: ChatState) => ({
            ...prev,
            showInput: true,
          }));
        }, TIMING.INPUT_SHOW);
      }, TIMING.DOCTOR_MESSAGE);
    }, TIMING.WAITING);
  }

  /**
   * 연속된 message 타입 처리
   */
  private static processConsecutiveMessageStep(
    step: number,
    userMessage: string,
    setChatState: React.Dispatch<React.SetStateAction<ChatState>>
  ) {
    const stepData = getStepData(step);

    setTimeout(() => {
      setChatState((prev: ChatState) => ({
        ...prev,
        isWaiting: true,
      }));

      setTimeout(() => {
        setChatState((prev: ChatState) => ({
          ...prev,
          messages: [...prev.messages, createDoctorMessage(stepData.message!)],
          isWaiting: false,
        }));

        // 연속된 message 타입 처리 (재귀적으로 다음 단계 확인)
        setTimeout(() => {
          const nextStep = getNextStep(step);
          if (nextStep === null) return;

          const nextStepData = getStepData(nextStep);

          if (nextStepData.type === 'question') {
            setChatState((prev: ChatState) => ({
              ...prev,
              currentStep: nextStep,
            }));

            this.processQuestionStep(nextStep, userMessage, setChatState);
          }
        }, TIMING.MESSAGE_DELAY);
      }, TIMING.DOCTOR_MESSAGE);
    }, TIMING.WAITING);
  }
}
