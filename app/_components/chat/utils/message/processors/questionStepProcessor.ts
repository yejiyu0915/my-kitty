import { ChatState } from '../../../data/chatSchemas';
import { TIMING } from '../../timingUtils';
import { getStepData } from '../../stepUtils';
import { createDoctorMessage } from '../createMessage';
import { replaceNamePlaceholder } from '../messageTextProcessor';
import { setWaitingState, addMessage, executeTimingSequence } from '../messageTiming';

// question 타입 메시지 처리
export const processQuestionStep = (
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
        const questionText = replaceNamePlaceholder(stepData.question!, userMessage);
        const doctorMessage = createDoctorMessage(questionText);

        addMessage(setChatState, doctorMessage);
        setWaitingState(setChatState, false);
      },
    },
    {
      delay: TIMING.INPUT_SHOW,
      action: () => {
        setChatState((prev: ChatState) => ({
          ...prev,
          showInput: true,
        }));
      },
    },
  ]);
};
