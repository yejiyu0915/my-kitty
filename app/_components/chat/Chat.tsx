'use client';
import ChatHeader from './ui/legacy/ChatHeader';
import ChatContent from './ui/legacy/ChatContent';
import ChatBottom from './ui/legacy/ChatBottom';
import ChatLayout from './ui/ChatLayout';
import { useChatState } from './hooks/useChatState';
import { useMessageHandler } from './utils/chatMessageHandler';
import { usePatientDataManager } from './hooks/usePatientDataManager';
import { useConversationManager } from './hooks/useConversationManager';
import { ChatMessage } from './data/chatSchemas';
import { ChatProps } from './types/chat';

export default function Chat({ onPatientDataUpdate }: ChatProps) {
  const { chatState, setChatState } = useChatState();
  const { handleSendMessage } = useMessageHandler(chatState, setChatState);

  // 분리된 훅들 사용
  const { handleFirstAnswer } = usePatientDataManager({
    onPatientDataUpdate,
    chatState,
  });

  const { showFinishMessage } = useConversationManager({ chatState });

  // 메시지 핸들러 래핑
  const handleSendMessageWithUpdate = (message: ChatMessage) => {
    // 포맷팅 전의 원본 메시지로 환자 데이터 업데이트
    handleFirstAnswer(message);
    handleSendMessage(message);
  };

  return (
    <ChatLayout
      header={<ChatHeader />}
      input={
        <ChatBottom
          currentStep={chatState.currentStep}
          onSendMessage={handleSendMessageWithUpdate}
          isTyping={chatState.isWaiting}
          showInput={chatState.showInput}
        />
      }
    >
      <ChatContent
        messages={chatState.messages}
        isWaiting={chatState.isWaiting}
        showInput={chatState.showInput}
        isConversationFinished={showFinishMessage}
      />
    </ChatLayout>
  );
}
