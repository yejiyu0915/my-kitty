'use client';

import type { TaskCategory } from '@/app/types/task';
import TaskListCategoryTitle from './TaskListCategoryTitle';
import TaskListItem from './TaskListItem';

interface TaskListCategoryProps {
  category: TaskCategory;
  categoryIndex: number;
  toggleCategory: (index: number) => void;
  toggleTask: (categoryIndex: number, taskIndex: number) => void;
}

export default function TaskListCategory({
  category,
  categoryIndex,
  toggleCategory,
  toggleTask,
}: TaskListCategoryProps) {
  return (
    <div>
      <TaskListCategoryTitle
        category={category}
        categoryIndex={categoryIndex}
        toggleCategory={toggleCategory}
      />
      {category.isOpen && (
        <TaskListItem
          tasks={category.content}
          toggleTask={(taskIndex) => toggleTask(categoryIndex, taskIndex)}
        />
      )}
    </div>
  );
}
