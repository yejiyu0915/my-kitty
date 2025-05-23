import ChatAvatar from './bubble/ChatAvatar';
import ChatMessage from './bubble/ChatMessage';
import { DOCTOR_DEFAULT, PATIENT_DEFAULT } from '../data/chatUser';
import { ChatBubbleProps } from '../types/chat';

export default function ChatBubble({
  type,
  message,
  name = type === 'doctor' ? DOCTOR_DEFAULT.name : undefined,
  emoji = type === 'doctor' ? DOCTOR_DEFAULT.emoji : PATIENT_DEFAULT.emoji,
  messageClassName,
}: ChatBubbleProps) {
  const isDoctor = type === 'doctor';
  const avatar = <ChatAvatar emoji={emoji} isDoctor={isDoctor} />;

  return (
    <div
      className={`mb-4 flex items-start gap-3 ${!isDoctor && 'justify-end'} animate-slide-up`}
      style={{
        animation: 'slide-up 0.3s ease-out forwards',
      }}
    >
      {isDoctor ? (
        <>
          {avatar}
          <div className="flex flex-col">
            <span className="mb-1 text-sm text-gray-500">{name}</span>
            <ChatMessage message={message} isDoctor={isDoctor} className={messageClassName} />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-end">
            <ChatMessage message={message} isDoctor={isDoctor} className={messageClassName} />
          </div>
          {avatar}
        </>
      )}
    </div>
  );
}
