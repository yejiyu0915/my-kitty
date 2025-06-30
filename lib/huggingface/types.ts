// Hugging Face API 타입
export interface HuggingFaceRequest {
  inputs: string;
  parameters?: {
    max_length?: number;
    temperature?: number;
    do_sample?: boolean;
    return_full_text?: boolean;
  };
}

export interface HuggingFaceResponse {
  generated_text: string;
  error?: string;
}

export interface ChatbotResponse {
  message: string;
  confidence: number;
  suggestedActions?: string[];
}
