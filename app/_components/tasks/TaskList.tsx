'use client';

import { useState } from 'react';
import { taskData } from '@/app/data/taskData';
import type { TaskCategory } from '@/app/types/task';
import TaskListContent from './TaskListContent';
import TaskListHeader from './TaskListHeader';

export default function TaskList() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = () => setIsOpen(!isOpen);

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

  return (
    <aside className="fixed top-8 left-8">
      <TaskListHeader toggleList={toggleList} tasks={tasks} />
      <TaskListContent
        isOpen={isOpen}
        tasks={tasks}
        toggleCategory={toggleCategory}
        toggleTask={toggleTask}
      />
    </aside>
  );
}
