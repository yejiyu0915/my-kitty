'use client';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import ChatBottom from './ChatBottom';
import { useChatState } from './hooks/useChatState';
import { useMessageHandler } from './utils/chatMessageHandler';

export default function Chat() {
  const { chatState, setChatState } = useChatState();
  const { handleSendMessage } = useMessageHandler(chatState, setChatState);

  return (
    <div className="border-primary relative flex h-full w-full flex-col items-center overflow-hidden rounded-lg border-2 bg-white px-8 pt-12 pb-0">
      <div className="flex h-full w-full flex-col space-y-4 overflow-hidden">
        <ChatHeader />
        <ChatContent messages={chatState.messages} isWaiting={chatState.isWaiting} />
      </div>

      <ChatBottom
        currentStep={chatState.currentStep}
        onSendMessage={handleSendMessage}
        isTyping={chatState.isWaiting}
        showInput={chatState.showInput}
      />
    </div>
  );
}
