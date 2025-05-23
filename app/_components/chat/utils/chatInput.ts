import { ChatMessage } from '../types/chat';
import { nanoid } from 'nanoid';

export const validateInput = (input: string, validation?: (value: string) => boolean) => {
  return validation ? validation(input) : input.trim().length > 0;
};

export const createChatMessage = (message: string): ChatMessage => ({
  id: nanoid(),
  message,
});

export const handleKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  isValid: boolean,
  isTyping: boolean,
  onSubmit: (e: React.FormEvent) => void
) => {
  if (e.key === 'Enter' && isValid && !isTyping) {
    onSubmit(e);
  }
};
