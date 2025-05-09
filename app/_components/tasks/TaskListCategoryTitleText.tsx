'use client';

import { calculateTaskProgress } from '@/app/utils/taskProgress';
import type { TaskCategory } from '@/app/types/task';

interface TaskListCategoryTitleTextProps {
  category: TaskCategory;
  categoryIndex: number;
}

export default function TaskListCategoryTitleText({
  category,
  categoryIndex,
}: TaskListCategoryTitleTextProps) {
  const { completed, total, percentage } = calculateTaskProgress(category.content);

  return (
    <div className="flex items-center gap-2">
      <h3 className={`flex items-center ${category.isOpen ? 'font-bold' : 'font-medium'}`}>
        <span className="text-primary border-primary/50 mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 text-xs font-medium">
          {categoryIndex + 1}
        </span>
        <span>{category.category}</span>
      </h3>
      <span className="flex items-center gap-1 text-xs text-gray-500">
        <span className={`${percentage === 100 ? 'text-primary font-bold' : ''}`}>
          {percentage}%
        </span>
        <span>
          ({completed}/{total})
        </span>
      </span>
    </div>
  );
}
