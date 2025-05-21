'use client';

import { memo } from 'react';
import { calculateTaskProgress } from '@/app/_components/tasks/utils/taskProgressCalculate';
import type { TaskListCategoryTitleTextProps } from '@/app/_components/tasks/types/task';
import Progress from '@/app/_components/tasks/ui/TaskProgress';

function TaskListCategoryTitleText({ category, categoryIndex }: TaskListCategoryTitleTextProps) {
  const { completed, total, percentage } = calculateTaskProgress(category.content);

  return (
    <div className="flex items-center gap-2">
      <h3 className={`flex items-center ${category.isOpen ? 'font-bold' : 'font-medium'}`}>
        <span className="text-primary border-primary/50 mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 text-xs font-medium">
          {categoryIndex + 1}
        </span>
        <span>{category.category}</span>
      </h3>
      <Progress completed={completed} total={total} percentage={percentage} className="text-xs" />
    </div>
  );
}

export default memo(TaskListCategoryTitleText);
