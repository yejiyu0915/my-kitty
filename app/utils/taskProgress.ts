import type { TaskCategory, TaskContent } from '@/app/types/task';

export function calculateTaskProgress(tasks: TaskContent[]) {
  const completed = tasks.reduce((acc, task) => acc + (task.isDone ? 1 : 0), 0);
  const total = tasks.length;
  const percentage = Math.round((completed / total) * 100);

  return {
    completed,
    total,
    percentage,
  };
}

export function calculateCategoryProgress(categories: TaskCategory[]) {
  const completed = categories.reduce(
    (acc, category) => acc + category.content.filter((task) => task.isDone).length,
    0
  );
  const total = categories.reduce((acc, category) => acc + category.content.length, 0);
  const percentage = Math.round((completed / total) * 100);

  return {
    completed,
    total,
    percentage,
  };
}
