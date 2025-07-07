// 서버 사이드 API 라우트 - SDK 방식
import { NextRequest, NextResponse } from 'next/server';
import { callGeminiAPI } from '@/lib/gemini/service';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    console.log('Gemini API 호출 시작:', { message });

    // SDK를 사용한 Gemini API 호출
    const aiResponse = await callGeminiAPI(message);

    console.log('Gemini 응답 성공:', aiResponse.message.substring(0, 100) + '...');

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      {
        error: '서버 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    );
  }
}
