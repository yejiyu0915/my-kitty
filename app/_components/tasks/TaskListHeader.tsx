'use client';

import { calculateCategoryProgress } from '@/app/utils/taskProgress';
import type { TaskCategory } from '@/app/types/task';
import Button from '@/app/_components/ui/Button';

interface TaskListHeaderProps {
  toggleList: () => void;
  tasks: TaskCategory[];
}

export default function TaskListHeader({ toggleList, tasks }: TaskListHeaderProps) {
  const { completed, total, percentage } = calculateCategoryProgress(tasks);

  return (
    <div className="flex items-center gap-2">
      <Button onClick={toggleList}>Task List</Button>
      <span className="text-sm text-gray-500">
        진행률: <span className="font-bold text-gray-700">{percentage}%</span> ({completed}/{total})
      </span>
    </div>
  );
}
