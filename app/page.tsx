import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="grid h-full w-full grid-cols-[1fr_350px] items-start justify-between gap-4">
      <div className="border-primary flex h-full w-full flex-col items-center gap-6 overflow-hidden rounded-lg border-2 bg-white px-8 pt-12 pb-0">
        <div className="flex h-full w-full flex-col space-y-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">✨ Talk 예약</h2>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-green-600">상담 가능</span>
            </div>
          </div>

          <div className="scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent my-4 flex-1 overflow-y-auto pr-4">
            {/* 왼쪽 말풍선 (상대방) */}
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 bg-gray-100">
                <span className="text-gray-600">🐱</span>
              </div>
              <div className="flex flex-col">
                <span className="mb-1 text-sm text-gray-500">고양이 원장</span>
                <div className="rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2">
                  <p className="text-gray-800">
                    안녕하세요, 고양이 병원입니다. 환자분 <span className="font-bold">성함</span>이
                    어떻게 되세요?
                  </p>
                </div>
              </div>
            </div>

            {/* 오른쪽 말풍선 (나) */}
            <div className="mb-4 flex items-start justify-end gap-3">
              <div className="flex flex-col items-end">
                <div className="bg-primary/20 rounded-2xl rounded-tr-none px-4 py-2">
                  <p className="text-gray-800">
                    <span className="font-bold">유예지</span> 입니다.
                  </p>
                </div>
              </div>
              <div className="bg-primary/30 border-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2">
                <span className="text-primary">😊</span>
              </div>
            </div>
          </div>
        </div>

        {/* 메시지 입력 영역 */}
        <div className="sticky bottom-0 left-0 mt-auto w-full border-t border-gray-200 bg-white p-4">
          <div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2">
            <input
              type="text"
              placeholder="성함을 입력하세요..."
              className="flex-1 bg-transparent outline-none"
            />
            <button className="text-primary hover:text-primary/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="border-primary bg-primary/5 flex h-full w-full flex-col overflow-hidden rounded-lg border-2 p-8">
        <div>
          <div className="flex flex-col gap-2 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">진료일자:</span>
              <span className="text-sm font-bold text-gray-700">
                {new Date().toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </span>
            </div>
          </div>
          <h2 className="my-4 text-2xl font-bold">환자 정보</h2>
          <Separator className="bg-gray-800" />
        </div>

        <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent my-6 flex-1 overflow-y-auto">
          <div className="my-8 mt-0 flex flex-col gap-4">
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <span className="text-primary">■</span>
                <span className="text-md text-gray-700">환자명:</span>
                <span className="text-md font-bold text-gray-700">유예지</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">■</span>
                <span className="text-md text-gray-700">생년월일:</span>
                <span className="text-md font-bold text-gray-700">1993-09-15 (만 31세)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">■</span>
                <span className="text-md text-gray-700">성별:</span>
                <span className="text-md font-bold text-gray-700">여</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">■</span>
                <span className="text-md text-gray-700">연락처:</span>
                <span className="text-md font-bold text-gray-700">010-1234-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">■</span>
                <span className="text-md text-gray-700">방문 경로:</span>
                <span className="text-md font-bold text-gray-700">검색, 지인 소개</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">■</span>
                <span className="text-md text-gray-700">증상:</span>
                <span className="text-md font-bold text-gray-700">코가 빠져서 못 먹음</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
