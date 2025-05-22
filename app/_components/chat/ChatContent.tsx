import ChatBubble from './ui/ChatBubble';
import { chatScript } from './data/chatScript';

export default function ChatContent() {
  return (
    <div className="scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent my-4 flex-1 overflow-y-auto pr-4">
      {chatScript.map((item) => (
        <ChatBubble key={item.id} type={item.type} message={item.message} />
      ))}
    </div>
  );
}
