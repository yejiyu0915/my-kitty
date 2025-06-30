'use client';
import ChatHeader from './ui/ChatHeader';
import ChatContent from './ui/ChatContent';
import ChatBottom from './ui/ChatBottom';
import ChatLayout from './ui/ChatLayout';
import { useChatState } from './hooks/useChatState';
import { useMessageHandler } from './utils/chatMessageHandler';

export default function Chat() {
  const { chatState, setChatState } = useChatState();
  const { handleSendMessage } = useMessageHandler(chatState, setChatState);

  return (
    <ChatLayout
      header={<ChatHeader />}
      input={
        <ChatBottom
          currentStep={chatState.currentStep}
          onSendMessage={handleSendMessage}
          isTyping={chatState.isWaiting}
          showInput={chatState.showInput}
        />
      }
    >
      <ChatContent messages={chatState.messages} isWaiting={chatState.isWaiting} />
    </ChatLayout>
  );
}
