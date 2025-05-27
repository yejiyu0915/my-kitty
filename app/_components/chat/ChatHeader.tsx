export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">✨ Talk 예약</h2>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
        <span className="text-sm font-medium text-green-600">상담 가능</span>
      </div>
    </div>
  );
}
