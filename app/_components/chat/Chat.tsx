import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import ChatBottom from './ChatBottom';

export default function Chat() {
  return (
    <div className="border-primary flex h-full w-full flex-col items-center gap-6 overflow-hidden rounded-lg border-2 bg-white px-8 pt-12 pb-0">
      <div className="flex h-full w-full flex-col space-y-4 overflow-hidden">
        <ChatHeader />
        <ChatContent />
      </div>

      {/* 메시지 입력 영역 */}
      <ChatBottom />
    </div>
  );
}
