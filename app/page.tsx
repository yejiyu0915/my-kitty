'use client';

import { useState } from 'react';
import Chat from '@/app/_components/chat/Chat';
import ChatAI from '@/app/_components/chat/ChatAI';
import Report from '@/app/_components/report/Report';
import Header from '@/components/layouts/Header';
import TaskList from '@/app/_components/tasks/TaskList';

interface PatientData {
  name?: string;
  birthDate?: string;
  gender?: string;
  phone?: string;
  visitPath?: string;
  symptoms?: string;
}

export default function Home() {
  const [currentMode, setCurrentMode] = useState<'chat' | 'ai'>('chat');
  const [patientData, setPatientData] = useState<PatientData>({});

  const handleModeChange = (mode: 'chat' | 'ai') => {
    setCurrentMode(mode);
  };

  const handlePatientDataUpdate = (data: PatientData) => {
    setPatientData(data);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden">
      <Header onModeChange={handleModeChange} currentMode={currentMode} />

      <div className="grid h-full w-full grid-cols-[3fr_1.2fr] items-start justify-between gap-4 overflow-hidden">
        {currentMode === 'chat' ? (
          <Chat onPatientDataUpdate={handlePatientDataUpdate} />
        ) : (
          <ChatAI />
        )}
        <Report patientData={patientData} />
      </div>
      <TaskList />
    </div>
  );
}
