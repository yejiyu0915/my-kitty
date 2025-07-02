import ChatAvatar from '../ChatAvatar';
import { DOCTOR_DEFAULT } from '../../data/chatUser';

export default function AIWaitingMessage() {
  return (
    <div className="animate-slide-up mb-4 flex items-start gap-3">
      <ChatAvatar emoji={DOCTOR_DEFAULT.emoji} isDoctor={true} />
      <div className="flex flex-col">
        <span className="mb-1 text-sm text-gray-500">{DOCTOR_DEFAULT.name}</span>
        <div className="rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2">
          <p className="text-gray-400">AI 어시스턴트가 입력하는 중...</p>
        </div>
      </div>
    </div>
  );
}
