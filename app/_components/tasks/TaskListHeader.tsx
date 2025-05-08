'use client';

import Button from '@/app/_components/ui/Button';
import type { Task } from '@/app/types/task';

interface TaskListHeaderProps {
  toggleList: () => void;
  tasks: Task[];
}

export default function TaskListHeader({ toggleList, tasks }: TaskListHeaderProps) {
  const completed = tasks.filter((task) => task.isDone).length;
  const total = tasks.length;
  const progress = Math.round((completed / total) * 100);

  return (
    <div className="flex items-center gap-4">
      <Button onClick={toggleList}>Task List</Button>
      <div className="text-sm text-gray-500">
        진행률: <span className="font-bold">{progress}%</span> ({completed}/{total})
      </div>
    </div>
  );
}
