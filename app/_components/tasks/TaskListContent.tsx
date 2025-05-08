'use client';

import type { Task } from '@/app/types/task';
import Checkbox from '@/app/_components/ui/Checkbox';

interface TaskListContentProps {
  isOpen: boolean;
  tasks: Task[];
  toggleTask: (index: number) => void;
}

export default function TaskListContent({ isOpen, tasks, toggleTask }: TaskListContentProps) {
  return (
    <div
      className={`mt-2 max-h-[80vh] w-80 overflow-y-auto rounded-lg bg-white p-4 shadow-xs transition-all duration-200 ${isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'} `}
    >
      <h2 className="mb-4 text-lg font-semibold">Task List</h2>
      <ul className="space-y-1 text-sm">
        {tasks.map((task, index) => (
          <li key={index} className="rounded p-2 hover:bg-gray-100">
            <Checkbox checked={task.isDone} onChange={() => toggleTask(index)} label={task.text} />
          </li>
        ))}
      </ul>
    </div>
  );
}
