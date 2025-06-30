// 더 간단한 Ollama API 호출
export async function callOllamaSimple(userMessage: string): Promise<ChatbotResponse> {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2:7b',
        prompt: `고양이 병원 AI 어시스턴트입니다. 다음 질문에 한글로 친근하게 답변해주세요: ${userMessage}`,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 100,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.response || '죄송합니다. 응답을 생성할 수 없습니다.';

    return {
      message: aiResponse,
      confidence: 0.7,
      suggestedActions: [],
    };
  } catch (error) {
    console.error('Ollama API 오류:', error);
    return {
      message: '죄송합니다. AI 서비스에 일시적인 문제가 있습니다.',
      confidence: 0,
    };
  }
}
