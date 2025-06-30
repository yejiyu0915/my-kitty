import { ChatAIMessage } from '../types/chatAI';
import ChatAvatar from './ChatAvatar';
import { DOCTOR_DEFAULT, PATIENT_DEFAULT } from '../data/chatUser';

interface AIMessageProps {
  message: ChatAIMessage;
}

export default function AIMessage({ message }: AIMessageProps) {
  return (
    <div
      className={`mb-4 flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : ''} animate-slide-up`}
      style={{
        animation: 'slide-up 0.3s ease-out forwards',
      }}
    >
      {message.type === 'assistant' ? (
        <>
          {/* AI 아바타 */}
          <ChatAvatar emoji={DOCTOR_DEFAULT.emoji} isDoctor={true} />
          <div className="flex flex-col">
            <span className="mb-1 text-sm text-gray-500">
              {DOCTOR_DEFAULT.name} (AI 어시스턴트)
            </span>
            <div className="rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2">
              <p className="text-gray-800">{message.message}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-end">
            <div className="bg-primary/20 rounded-2xl rounded-tr-none px-4 py-2">
              <p className="text-gray-800">{message.message}</p>
            </div>
          </div>
          {/* 사용자 아바타 */}
          <ChatAvatar emoji={PATIENT_DEFAULT.emoji} isDoctor={false} />
        </>
      )}
    </div>
  );
}
