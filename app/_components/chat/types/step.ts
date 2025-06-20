// 대화 단계 타입
export type ChatStep = {
  id: string;
  // 원장님이 물어보는 메시지 (input이 나타나는 경우)
  question?: string;
  // 원장님이 답변을 받지 않고 이어서 말하는 메시지
  message?: string;
  // 메시지 타입 구분
  type: 'question' | 'message';
  // 입력 관련 설정 (question 타입일 때만 사용)
  placeholder?: string;
  validation?: (value: string) => boolean;
  errorMessage?: string;
  messageFormat?: (value: string) => string;
  inputType?: 'text' | 'textarea' | 'select' | 'date' | 'datetime-local' | 'radio' | 'number';
  options?: { value: string; label: string }[];
};
