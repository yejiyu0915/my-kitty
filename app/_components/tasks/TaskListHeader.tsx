'use client';

import { calculateCategoryProgress } from '@/app/_components/tasks/utils/taskProgressCalculate';
import type { TaskListHeaderProps } from '@/app/_components/tasks/types/task';
import Button from '@/components/ui/button';
import Progress from '@/app/_components/tasks/ui/TaskProgress';

export default function TaskListHeader({ toggleList, tasks }: TaskListHeaderProps) {
  const { completed, total, percentage } = calculateCategoryProgress(tasks);

  return (
    <div className="flex items-center gap-2">
      <Button onClick={toggleList}>Task List</Button>
      <Progress
        completed={completed}
        total={total}
        percentage={percentage}
        showLabel
        label="진행률"
      />
    </div>
  );
}
