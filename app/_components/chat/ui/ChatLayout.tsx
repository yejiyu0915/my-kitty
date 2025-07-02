import { ReactNode } from 'react';

interface ChatLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  input?: ReactNode;
}

export default function ChatLayout({ children, header, input }: ChatLayoutProps) {
  return (
    <div className="border-primary relative flex h-full w-full flex-col items-center overflow-hidden rounded-lg border-2 bg-white px-8 pt-12 pb-0">
      <div className="flex h-full w-full flex-col space-y-4 overflow-hidden">
        {header}
        {children}
      </div>
      {input}
    </div>
  );
}
