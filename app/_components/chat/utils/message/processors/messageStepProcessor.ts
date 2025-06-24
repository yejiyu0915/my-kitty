import { ChatState } from '../../../data/chatSchemas';
import { TIMING } from '../../timingUtils';
import { getNextStep, getStepData } from '../../stepUtils';
import { createDoctorMessage } from '../createMessage';
import { createDynamicMessage } from '../messageTextProcessor';
import { setWaitingState, addMessage, executeTimingSequence } from '../messageTiming';
import { processQuestionStep } from './questionStepProcessor';
import { processConsecutiveMessageStep } from './consecutiveMessageProcessor';

// message 타입 메시지 처리
export const processMessageStep = (
  nextStep: number,
  userMessage: string,
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>
) => {
  const nextStepData = getStepData(nextStep);

  // 단계 업데이트
  setChatState((prev: ChatState) => ({
    ...prev,
    currentStep: nextStep,
  }));

  // 메시지 표시 시퀀스
  executeTimingSequence([
    {
      delay: TIMING.WAITING,
      action: () => setWaitingState(setChatState, true),
    },
    {
      delay: TIMING.DOCTOR_MESSAGE,
      action: () => {
        const messageText = createDynamicMessage(
          nextStepData.domain,
          userMessage,
          nextStepData.message!
        );
        const doctorMessage = createDoctorMessage(messageText);

        addMessage(setChatState, doctorMessage);
        setWaitingState(setChatState, false);
      },
    },
    {
      delay: TIMING.MESSAGE_DELAY,
      action: () => processNextStepAfterMessage(nextStep, userMessage, setChatState),
    },
  ]);
};

// message 타입 후 다음 단계 처리
const processNextStepAfterMessage = (
  currentStep: number,
  userMessage: string,
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>
) => {
  const nextStep = getNextStep(currentStep);
  if (nextStep === null) return;

  const nextStepData = getStepData(nextStep);

  setChatState((prev: ChatState) => ({
    ...prev,
    currentStep: nextStep,
  }));

  if (nextStepData.type === 'question') {
    processQuestionStep(nextStep, userMessage, setChatState);
  } else if (nextStepData.type === 'message') {
    processConsecutiveMessageStep(nextStep, userMessage, setChatState);
  }
};
