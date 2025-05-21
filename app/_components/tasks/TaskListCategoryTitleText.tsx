'use client';

import { memo, useMemo } from 'react';
import type { TaskListCategoryTitleTextProps } from '@/app/_components/tasks/types/task';
import Progress from '@/app/_components/tasks/ui/TaskProgress';

const CategoryNumber = memo(function CategoryNumber({ number }: { number: number }) {
  return (
    <span className="text-primary border-primary/50 mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 text-xs font-medium">
      {number}
    </span>
  );
});

function TaskListCategoryTitleText({ category, categoryIndex }: TaskListCategoryTitleTextProps) {
  const completed = useMemo(
    () => category.content.filter((task) => task.isDone).length,
    [category.content]
  );

  return (
    <div className="flex items-center gap-2">
      <h3 className={`flex items-center ${category.isOpen ? 'font-bold' : 'font-medium'}`}>
        <CategoryNumber number={categoryIndex + 1} />
        <span>{category.category}</span>
      </h3>
      <Progress completed={completed} total={category.content.length} className="text-xs" />
    </div>
  );
}

export default memo(TaskListCategoryTitleText);
