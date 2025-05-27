'use client';

import { useState, useCallback, useMemo } from 'react';
import { taskData } from '@/app/_components/tasks/data/taskData';
import type { TaskCategory } from '@/app/_components/tasks/types/task';

export function useTaskListState() {
  const [tasks, setTasks] = useState<TaskCategory[]>(taskData);

  const toggleCategory = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((taskCategory) =>
        taskCategory.id === id ? { ...taskCategory, isOpen: !taskCategory.isOpen } : taskCategory
      )
    );
  }, []);

  const toggleTask = useCallback((taskId: string, categoryId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((taskCategory) =>
        taskCategory.id === categoryId
          ? {
              ...taskCategory,
              content: taskCategory.content.map((taskContent) =>
                taskContent.id === taskId
                  ? { ...taskContent, isDone: !taskContent.isDone }
                  : taskContent
              ),
            }
          : taskCategory
      )
    );
  }, []);

  // 카테고리별 태스크 상태 계산 메모이제이션
  const categoryStats = useMemo(() => {
    return tasks.map((category) => ({
      id: category.id,
      total: category.content.length,
      completed: category.content.filter((task) => task.isDone).length,
    }));
  }, [tasks]);

  // 전체 태스크 상태 계산 메모이제이션
  const totalStats = useMemo(() => {
    return categoryStats.reduce(
      (acc, category) => ({
        total: acc.total + category.total,
        completed: acc.completed + category.completed,
      }),
      { total: 0, completed: 0 }
    );
  }, [categoryStats]);

  return {
    tasks,
    categoryStats,
    totalStats,
    toggleCategory,
    toggleTask,
  };
}
