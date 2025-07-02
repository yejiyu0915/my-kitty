import ModeToggleButton from './ModeToggleButton';
import Button from '@/components/ui/input/button';

interface HeaderProps {
  onModeChange?: (mode: 'chat' | 'ai') => void;
  currentMode?: 'chat' | 'ai';
  onReset?: () => void;
}

export default function Header({ onModeChange, currentMode = 'chat', onReset }: HeaderProps) {
  return (
    <header className="flex w-full max-w-6xl items-center justify-between">
      <h1 className="hidden text-2xl font-bold lg:block lg:text-3xl">🐱 고양이 병원</h1>

      <div className="flex items-center gap-2">
        {/* 모드 토글 버튼 - 클라이언트 컴포넌트 */}
        <ModeToggleButton onModeChange={onModeChange} currentMode={currentMode} />

        {/* 상담내용 리셋하기 버튼 */}
        <Button
          onClick={onReset}
          className="border border-gray-300 bg-white text-gray-600 transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white"
        >
          ⚡ 초기화
        </Button>
      </div>
    </header>
  );
}
