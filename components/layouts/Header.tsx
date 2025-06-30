import ModeToggleButton from './ModeToggleButton';

interface HeaderProps {
  onModeChange?: (mode: 'chat' | 'ai') => void;
  currentMode?: 'chat' | 'ai';
}

export default function Header({ onModeChange, currentMode = 'chat' }: HeaderProps) {
  return (
    <header className="flex w-full max-w-6xl items-center justify-between">
      <h1 className="text-3xl font-bold">🐱 고양이 병원</h1>

      {/* 모드 토글 버튼 - 클라이언트 컴포넌트 */}
      <ModeToggleButton onModeChange={onModeChange} currentMode={currentMode} />
    </header>
  );
}
