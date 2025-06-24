import { ChatState } from '../../../data/chatSchemas';
import { TIMING } from '../../timingUtils';
import { getNextStep, getStepData } from '../../stepUtils';
import { createDoctorMessage } from '../createMessage';
import { setWaitingState, addMessage, executeTimingSequence } from '../messageTiming';
import { processQuestionStep } from './questionStepProcessor';

// 연속된 message 타입 처리
export const processConsecutiveMessageStep = (
  step: number,
  userMessage: string,
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>
) => {
  const stepData = getStepData(step);

  executeTimingSequence([
    {
      delay: TIMING.WAITING,
      action: () => setWaitingState(setChatState, true),
    },
    {
      delay: TIMING.DOCTOR_MESSAGE,
      action: () => {
        const doctorMessage = createDoctorMessage(stepData.message!);
        addMessage(setChatState, doctorMessage);
        setWaitingState(setChatState, false);
      },
    },
    {
      delay: TIMING.MESSAGE_DELAY,
      action: () => {
        const nextStep = getNextStep(step);
        if (nextStep === null) return;

        const nextStepData = getStepData(nextStep);

        if (nextStepData.type === 'question') {
          setChatState((prev: ChatState) => ({
            ...prev,
            currentStep: nextStep,
          }));
          processQuestionStep(nextStep, userMessage, setChatState);
        }
      },
    },
  ]);
};
