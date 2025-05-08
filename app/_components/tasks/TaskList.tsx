'use client';

import { useState } from 'react';
import { taskData } from '@/app/data/taskData';
import type { Task } from '@/app/types/task';
import TaskListContent from './TaskListContent';
import TaskListHeader from './TaskListHeader';

export default function TaskList() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = () => setIsOpen(!isOpen);

  const [tasks, setTasks] = useState<Task[]>(taskData);
  const toggleTask = (index: number) => {
    setTasks(tasks.map((task, i) => (i === index ? { ...task, isDone: !task.isDone } : task)));
  };

  return (
    <aside className="fixed top-8 left-8">
      <TaskListHeader toggleList={toggleList} tasks={tasks} />
      <TaskListContent isOpen={isOpen} tasks={tasks} toggleTask={toggleTask} />
    </aside>
  );
}
