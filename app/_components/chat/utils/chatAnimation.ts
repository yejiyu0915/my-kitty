import { ChatMessage } from '../types/chat';
import { getDoctorMessage } from './chatMessage';

const ANIMATION_DELAYS = {
  WAITING: 500,
  DOCTOR_MESSAGE: 1000,
  BOTTOM_SHOW: 300,
} as const;

interface MessageSequenceCallbacks {
  onWaitingStart: () => void;
  onDoctorMessage: (message: ChatMessage) => void;
  onWaitingEnd: () => void;
  onAnimationComplete: () => void;
}

export const createMessageSequence = (
  message: ChatMessage,
  nextStep: number,
  callbacks: MessageSequenceCallbacks
) => {
  const { onWaitingStart, onDoctorMessage, onWaitingEnd, onAnimationComplete } = callbacks;

  setTimeout(() => {
    onWaitingStart();
    setTimeout(() => {
      const doctorMessage = getDoctorMessage(nextStep, message.message);
      onDoctorMessage(doctorMessage);
      onWaitingEnd();
      setTimeout(onAnimationComplete, ANIMATION_DELAYS.BOTTOM_SHOW);
    }, ANIMATION_DELAYS.DOCTOR_MESSAGE);
  }, ANIMATION_DELAYS.WAITING);
};
