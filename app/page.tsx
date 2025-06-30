'use client';

import { useState } from 'react';
import Chat from '@/app/_components/chat/Chat';
import ChatAI from '@/app/_components/chat/ChatAI';
import Report from '@/app/_components/report/Report';
import Header from '@/components/layouts/Header';
import TaskList from '@/app/_components/tasks/TaskList';

export default function Home() {
  const [currentMode, setCurrentMode] = useState<'chat' | 'ai'>('ai');

  const handleModeChange = (mode: 'chat' | 'ai') => {
    setCurrentMode(mode);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden">
      <Header onModeChange={handleModeChange} currentMode={currentMode} />

      <div className="grid h-full w-full grid-cols-[3fr_1.2fr] items-start justify-between gap-4 overflow-hidden">
        {currentMode === 'chat' ? <Chat /> : <ChatAI />}
        <Report />
      </div>
      <TaskList />
    </div>
  );
}
