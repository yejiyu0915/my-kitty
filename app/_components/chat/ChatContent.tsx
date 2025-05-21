export default function ChatContent() {
  return (
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
              안녕하세요, 고양이 병원입니다. 환자분 <span className="font-bold">성함</span>이 어떻게
              되세요?
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
  );
}
