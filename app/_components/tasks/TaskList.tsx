'use client';

import TaskListContent from './TaskListContent';
import TaskListHeader from './TaskListHeader';
import { useTaskListState, useTaskListToggle } from './hooks/useTaskList';

export default function TaskList() {
  const { isOpen, toggleList } = useTaskListToggle();
  const { tasks, toggleCategory, toggleTask } = useTaskListState();

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
