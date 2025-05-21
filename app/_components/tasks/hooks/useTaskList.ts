'use client';

import { useState } from 'react';
import { taskData } from '@/app/_components/tasks/data/taskData';
import type { TaskCategory } from '@/app/_components/tasks/types/task';

export function useTaskListState() {
  const [tasks, setTasks] = useState<TaskCategory[]>(taskData);

  const toggleCategory = (index: number) => {
    setTasks(
      tasks.map((taskCategory, i) =>
        i === index ? { ...taskCategory, isOpen: !taskCategory.isOpen } : taskCategory
      )
    );
  };

  const toggleTask = (categoryIndex: number, taskIndex: number) => {
    setTasks(
      tasks.map((taskCategory, i) =>
        i === categoryIndex
          ? {
              ...taskCategory,
              content: taskCategory.content.map((taskContent, j) =>
                j === taskIndex ? { ...taskContent, isDone: !taskContent.isDone } : taskContent
              ),
            }
          : taskCategory
      )
    );
  };

  return {
    tasks,
    toggleCategory,
    toggleTask,
  };
}

export function useTaskListToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = () => setIsOpen(!isOpen);

  return {
    isOpen,
    toggleList,
  };
}
