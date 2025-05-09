'use client';

import type { TaskCategory } from '@/app/types/task';
import TaskListCategory from './TaskListCategory';

interface TaskListContentProps {
  isOpen: boolean;
  tasks: TaskCategory[];
  toggleCategory: (categoryIndex: number) => void;
  toggleTask: (categoryIndex: number, taskIndex: number) => void;
}

export default function TaskListContent({
  isOpen,
  tasks,
  toggleCategory,
  toggleTask,
}: TaskListContentProps) {
  return (
    <div
      className={`mt-2 max-h-[80vh] w-80 overflow-y-auto rounded-lg bg-white p-4 shadow-xs transition-all duration-200 ${
        isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
    >
      <h2 className="mb-4 text-lg font-semibold">고양이 병원 🏥</h2>
      <div className="space-y-2">
        {tasks.map((category, categoryIndex) => (
          <TaskListCategory
            key={categoryIndex}
            category={category}
            categoryIndex={categoryIndex}
            toggleCategory={toggleCategory}
            toggleTask={toggleTask}
          />
        ))}
      </div>
    </div>
  );
}
