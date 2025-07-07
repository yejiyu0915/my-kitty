import { NextResponse } from 'next/server';
import { resetChatSession } from '@/lib/gemini/service';

export async function POST() {
  try {
    resetChatSession();
    console.log('Gemini 대화 세션이 리셋되었습니다.');
    return NextResponse.json({ success: true, message: '대화 세션이 리셋되었습니다.' });
  } catch (error) {
    console.error('세션 리셋 오류:', error);
    return NextResponse.json({ error: '세션 리셋에 실패했습니다.' }, { status: 500 });
  }
}
