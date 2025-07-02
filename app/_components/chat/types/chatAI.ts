// chatAI 관련 타입 정의
export interface ChatAIMessage {
  id: string;
  message: string;
  type: 'user' | 'assistant' | 'system';
  timestamp: string;
}

export interface ChatAIState {
  messages: ChatAIMessage[];
  isWaiting: boolean;
  showInput: boolean;
  showOptions: boolean;
  userData: Record<string, unknown>;
  aiResponses: AIResponse[];
  lastAIResponse?: AIResponse;
}

export interface AIResponse {
  message: string;
  confidence: number;
  suggestedActions?: string[];
  domain?: string;
  timestamp: string;
}

export interface ChatAIProps {
  onAIResponse?: (response: AIResponse) => void;
}
