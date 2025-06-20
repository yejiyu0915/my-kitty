import { ChatMessage } from '../types/chat';
import { chatSteps } from '../data/chatSteps';
import { createDoctorMessage } from './messageUtils';

export const getInitialMessage = (): ChatMessage => {
  return createDoctorMessage(chatSteps[0].question!);
};
