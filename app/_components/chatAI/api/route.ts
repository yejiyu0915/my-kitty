// 서버 사이드 API 라우트
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    // 서버에서만 API 키 사용
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 });
    }

    // Gemini API 호출
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `당신은 고양이 병원의 AI 어시스턴트입니다. 한국어로 친근하게 응답해주세요. 진단이나 처방은 하지 말고, 기본적인 조언만 제공해주세요.

사용자 질문: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150,
            topP: 0.8,
            topK: 40,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API 오류:', errorText);
      throw new Error(`Gemini API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse =
      data.candidates[0]?.content?.parts[0]?.text || '죄송합니다. 응답을 생성할 수 없습니다.';

    // 제안 액션 추출
    const suggestedActions: string[] = [];
    if (aiResponse.includes('예약') || aiResponse.includes('방문'))
      suggestedActions.push('예약하기');
    if (aiResponse.includes('증상') || aiResponse.includes('아픔'))
      suggestedActions.push('증상 확인');
    if (aiResponse.includes('준비') || aiResponse.includes('가져올 것'))
      suggestedActions.push('준비사항');
    if (aiResponse.includes('비용') || aiResponse.includes('가격'))
      suggestedActions.push('비용 안내');

    return NextResponse.json({
      message: aiResponse,
      confidence: 0.8,
      suggestedActions: suggestedActions,
    });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json({ error: 'AI 서비스에 일시적인 문제가 있습니다.' }, { status: 500 });
  }
}
