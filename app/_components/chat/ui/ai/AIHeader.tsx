interface AIHeaderProps {
  isWaiting: boolean;
}

export default function AIHeader({ isWaiting }: AIHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">🤖 Talk 예약 (AI 어시스턴트)</h2>
      <div className="flex items-center gap-2">
        {isWaiting ? (
          <>
            <div className="border-primary-500 h-3 w-3 animate-spin rounded-full border-b-2"></div>
            <span className="text-primary-600 text-sm font-medium">AI 응답 생성 중...</span>
          </>
        ) : (
          <>
            <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-green-600">AI 상담 가능</span>
          </>
        )}
      </div>
    </div>
  );
}
