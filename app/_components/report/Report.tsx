import { Separator } from '@/components/ui/separator';

export default function Report() {
  return (
    <div className="border-primary bg-primary/5 flex h-full w-full flex-col overflow-hidden rounded-lg border-2 px-6 py-8">
      <div>
        <div className="flex flex-col pb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">진료일자:</span>
            {/* <span className="text-sm font-bold text-gray-700">
              {new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </span> */}
          </div>
        </div>
        <h2 className="my-1 text-2xl font-bold">환자 정보</h2>
        <Separator className="bg-gray-800" />
      </div>

      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent my-6 flex-1 overflow-y-auto">
        {/* <div className="my-8 mt-0 flex flex-col gap-4">
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
        </div> */}
      </div>
    </div>
  );
}
