'use client';

import Button from '@/components/ui/input/button';

interface ModeToggleButtonProps {
  onModeChange?: (mode: 'chat' | 'ai') => void;
  currentMode?: 'chat' | 'ai';
}

export default function ModeToggleButton({
  onModeChange,
  currentMode = 'chat',
}: ModeToggleButtonProps) {
  const handleModeToggle = () => {
    const newMode = currentMode === 'chat' ? 'ai' : 'chat';
    onModeChange?.(newMode);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleModeToggle}
        className={`text-primary hover:bg-primary border border-gray-100 bg-white transition-all duration-200 hover:text-white`}
      >
        {currentMode === 'chat' ? '🤖 AI 상담으로 변경' : '✨ 일반 상담으로 변경'}
      </Button>
    </div>
  );
}
