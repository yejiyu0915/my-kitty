'use client';

import { useMemo } from 'react';
import type { TaskListContentProps } from '@/app/_components/tasks/types/task';
import TaskListCategory from './TaskListCategory';

export default function TaskListContent({
  isOpen,
  tasks,
  toggleCategory,
  toggleTask,
}: TaskListContentProps) {
  const categoryList = useMemo(
    () =>
      tasks.map((category, categoryIndex) => (
        <TaskListCategory
          key={category.id}
          category={category}
          categoryIndex={categoryIndex}
          toggleCategory={toggleCategory}
          toggleTask={toggleTask}
        />
      )),
    [tasks, toggleCategory, toggleTask]
  );

  return (
    <div
      className={`mt-2 max-h-[80vh] w-80 overflow-y-auto rounded-lg bg-white shadow-xs transition-all duration-200 ${
        isOpen
          ? 'pointer-events-auto visible z-50 translate-y-0 opacity-100'
          : 'pointer-events-none invisible -z-10 -translate-y-2 opacity-0 select-none'
      }`}
    >
      <h2 className="sticky top-0 z-10 bg-white p-4 text-lg font-semibold">고양이 병원 🏥</h2>
      <div className="space-y-2 px-4 pb-4">{categoryList}</div>
    </div>
  );
}
