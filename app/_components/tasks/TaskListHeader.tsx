'use client';

import type { TaskListHeaderProps } from '@/app/_components/tasks/types/task';
import Button from '@/components/ui/button';
import Progress from '@/app/_components/tasks/ui/TaskProgress';

export default function TaskListHeader({ toggleList, totalStats }: TaskListHeaderProps) {
  const percentage = Math.round((totalStats.completed / totalStats.total) * 100);

  return (
    <div className="flex items-center gap-2">
      <Button onClick={toggleList}>Task List</Button>
      <Progress
        completed={totalStats.completed}
        total={totalStats.total}
        percentage={percentage}
        showLabel
        label="진행률"
      />
    </div>
  );
}
