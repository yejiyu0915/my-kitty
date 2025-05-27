// 대화 단계 타입
export type ChatStep = {
  id: number;
  question: string;
  validation?: (value: string) => boolean;
  errorMessage?: string;
  messageFormat?: (value: string) => string;
  inputType?: 'text' | 'textarea' | 'select';
  options?: { value: string; label: string }[];
};
