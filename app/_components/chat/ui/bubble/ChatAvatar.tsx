import { ChatAvatarProps } from '../../types/chat';

export default function ChatAvatar({ emoji, isDoctor }: ChatAvatarProps) {
  return (
    <div
      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 ${
        isDoctor ? 'bg-gray-100' : 'bg-primary/30 border-primary'
      }`}
    >
      <span className={isDoctor ? 'text-gray-600' : 'text-primary'}>{emoji}</span>
    </div>
  );
}
