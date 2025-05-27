import type { TaskCategory } from '@/app/_components/tasks/types/task';

export function calculateCategoryProgress(categories: TaskCategory[]) {
  const stats = categories.reduce(
    (acc, category) => {
      const completed = category.content.filter((task) => task.isDone).length;
      return {
        completed: acc.completed + completed,
        total: acc.total + category.content.length,
      };
    },
    { completed: 0, total: 0 }
  );

  return {
    ...stats,
    percentage: Math.round((stats.completed / stats.total) * 100),
  };
}
