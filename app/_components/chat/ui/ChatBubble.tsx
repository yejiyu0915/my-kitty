import ChatAvatar from './bubble/ChatAvatar';
import ChatMessage from './bubble/ChatMessage';
import { DOCTOR_DEFAULT, PATIENT_DEFAULT } from '@/app/_components/chat/data/chatUser';
import { ChatBubbleProps } from '@/app/_components/chat/types/chatBubble';

export default function ChatBubble({
  type,
  message,
  name = type === 'doctor' ? DOCTOR_DEFAULT.name : undefined,
  emoji = type === 'doctor' ? DOCTOR_DEFAULT.emoji : PATIENT_DEFAULT.emoji,
}: ChatBubbleProps) {
  const isDoctor = type === 'doctor';
  const avatar = <ChatAvatar emoji={emoji} isDoctor={isDoctor} />;

  return (
    <div className={`mb-4 flex items-start gap-3 ${!isDoctor && 'justify-end'}`}>
      {isDoctor ? (
        <>
          {avatar}
          <div className="flex flex-col">
            <span className="mb-1 text-sm text-gray-500">{name}</span>
            <ChatMessage message={message} isDoctor={isDoctor} />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-end">
            <ChatMessage message={message} isDoctor={isDoctor} />
          </div>
          {avatar}
        </>
      )}
    </div>
  );
}
