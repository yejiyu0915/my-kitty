import { useState } from 'react';
import { taskData } from '@/app/data/taskData';
import type { TaskCategory } from '@/app/types/task';

export function useTaskList() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskCategory[]>(taskData);

  const toggleList = () => setIsOpen(!isOpen);

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
    isOpen,
    tasks,
    toggleList,
    toggleCategory,
    toggleTask,
  };
}
