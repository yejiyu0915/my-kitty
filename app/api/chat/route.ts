// 서버 사이드 API 라우트
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // 서버에서만 API 키 사용
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    console.log('환경변수 확인:', {
      hasApiKey: !!GEMINI_API_KEY,
      apiKeyLength: GEMINI_API_KEY?.length,
      apiKeyStart: GEMINI_API_KEY?.substring(0, 10) + '...',
      allEnvVars: Object.keys(process.env).filter((key) => key.includes('GEMINI')),
    });

    if (!GEMINI_API_KEY) {
      console.error('Gemini API 키가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요.' },
        { status: 500 }
      );
    }

    console.log('Gemini API 호출 시작:', { message });

    // Gemini API 호출 (Google AI Studio에서 제공하는 정확한 엔드포인트)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
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
                  text: `당신은 병원의 AI 어시스턴트입니다. 한국어로 친근하게 응답해주세요. 진단이나 처방은 하지 말고, 기본적인 조언만 제공해주세요.

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

    console.log('Gemini API 응답 상태:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API 오류:', errorText);
      return NextResponse.json(
        { error: `Gemini API 오류: ${response.status} - ${errorText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse =
      data.candidates[0]?.content?.parts[0]?.text || '죄송합니다. 응답을 생성할 수 없습니다.';

    console.log('Gemini 응답 성공:', aiResponse.substring(0, 100) + '...');

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
    return NextResponse.json(
      { error: `서버 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}` },
      { status: 500 }
    );
  }
}
