'use client';

import { useState } from 'react';
import Chat from '@/app/_components/chat/Chat';
import ChatAI from '@/app/_components/chat/ChatAI';
import Report from '@/app/_components/report/Report';
import Header from '@/components/layouts/Header';
import TaskList from '@/app/_components/tasks/TaskList';
import { usePatientData } from '@/app/_components/chat/hooks/usePatientData';

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
  const [resetKey, setResetKey] = useState(0); // Report 컴포넌트 리셋을 위한 key
  const { clearPatientData } = usePatientData();

  const handleModeChange = (mode: 'chat' | 'ai') => {
    setCurrentMode(mode);
  };

  const handlePatientDataUpdate = (data: PatientData) => {
    setPatientData(data);
  };

  // AI 모드 리셋 함수
  const handleAIReset = () => {
    // AI 모드에서는 대화가 진행되었을 때만 리셋
    // ChatAI 컴포넌트 내부에서 대화 진행 상태를 확인하고 리셋 처리
    setResetKey((prev) => prev + 1);
  };

  // 상담내용 리셋하기 함수
  const handleReset = () => {
    if (currentMode === 'ai') {
      // AI 모드일 때는 AI 전용 리셋 함수 사용
      handleAIReset();
    } else {
      // 일반 채팅 모드일 때는 완전 리셋
      setPatientData({});
      clearPatientData();

      // 대화 내용도 삭제
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cathouse_conversation_data');
      }

      setResetKey((prev) => prev + 1);
      setCurrentMode('chat');
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden">
      <Header onModeChange={handleModeChange} currentMode={currentMode} onReset={handleReset} />

      <div
        className={`h-full w-full ${
          currentMode === 'chat'
            ? 'grid grid-cols-1 grid-rows-[2fr_0.9fr] items-start justify-between gap-4 overflow-hidden lg:grid-cols-[3fr_auto] lg:grid-rows-1'
            : 'flex flex-col overflow-hidden'
        }`}
      >
        {currentMode === 'chat' ? (
          <>
            <Chat key={`chat-${resetKey}`} onPatientDataUpdate={handlePatientDataUpdate} />
            <Report
              key={`report-${resetKey}`}
              patientData={patientData}
              currentMode={currentMode}
            />
          </>
        ) : (
          <div className="flex-1 overflow-hidden">
            <ChatAI key={`chat-${resetKey}`} />
          </div>
        )}
      </div>
      <TaskList />
    </div>
  );
}
