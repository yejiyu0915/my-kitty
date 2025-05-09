'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { TaskCategory } from '@/app/types/task';
import TaskListCategoryTitleText from './TaskListCategoryTitleText';

interface TaskListCategoryTitleProps {
  category: TaskCategory;
  categoryIndex: number;
  toggleCategory: (index: number) => void;
}

export default function TaskListCategoryTitle({
  category,
  categoryIndex,
  toggleCategory,
}: TaskListCategoryTitleProps) {
  return (
    <button
      onClick={() => toggleCategory(categoryIndex)}
      className={`flex w-full cursor-pointer items-center justify-between rounded-sm border-2 border-gray-100 px-3 py-2 transition-all duration-200 ${
        category.isOpen ? 'border-primary/40' : ''
      }`}
    >
      <TaskListCategoryTitleText category={category} categoryIndex={categoryIndex} />
      <ChevronDownIcon
        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
          category.isOpen ? 'text-primary rotate-180' : ''
        }`}
      />
    </button>
  );
}
