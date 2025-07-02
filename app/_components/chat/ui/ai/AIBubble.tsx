import { ChatAIMessage } from '../../types/chatAI';
import ChatAvatar from '../ChatAvatar';
import ChatMessage from '../ChatMessage';
import { DOCTOR_DEFAULT, PATIENT_DEFAULT } from '../../data/chatUser';
import AIChatbotOptions from './AIChatbotOptions';

interface AIMessageProps {
  message: ChatAIMessage;
  showOptions?: boolean;
  showSubOptions?: boolean;
  onOptionSelect?: (message: string) => void;
  isWaiting?: boolean;
}

export default function AIMessage({
  message,
  showOptions = false,
  showSubOptions = false,
  onOptionSelect,
  isWaiting = false,
}: AIMessageProps) {
  const isDoctor = message.type === 'assistant';

  return (
    <div
      className={`mb-4 flex items-start gap-3 ${!isDoctor ? 'justify-end' : ''} animate-slide-up`}
      style={{
        animation: 'slide-up 0.3s ease-out forwards',
      }}
    >
      {isDoctor ? (
        <>
          {/* AI 아바타 */}
          <ChatAvatar emoji={DOCTOR_DEFAULT.emoji} isDoctor={true} />
          <div className="flex flex-col">
            <span className="mb-1 text-sm text-gray-500">
              {DOCTOR_DEFAULT.name} (AI 어시스턴트)
            </span>
            <ChatMessage message={message.message} isDoctor={true} className="whitespace-pre-line">
              {/* 선택지가 포함된 메시지인 경우 */}
              {(showOptions || showSubOptions) && onOptionSelect && (
                <AIChatbotOptions
                  onOptionSelect={onOptionSelect}
                  disabled={isWaiting}
                  showSubOptions={showSubOptions}
                />
              )}
            </ChatMessage>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-end">
            <ChatMessage message={message.message} isDoctor={false} />
          </div>
          {/* 사용자 아바타 */}
          <ChatAvatar emoji={PATIENT_DEFAULT.emoji} isDoctor={false} />
        </>
      )}
    </div>
  );
}
