'use client';

import TaskListContent from './TaskListContent';
import TaskListHeader from './TaskListHeader';
import { useTaskListState } from './utils/taskListState';
import { useTaskListToggle } from './utils/taskListToggle';

export default function TaskList() {
  const { isOpen, toggleList } = useTaskListToggle();
  const { tasks, totalStats, toggleCategory, toggleTask } = useTaskListState();

  return (
    <aside className="fixed top-8 left-8">
      <TaskListHeader toggleList={toggleList} tasks={tasks} totalStats={totalStats} />
      <TaskListContent
        isOpen={isOpen}
        tasks={tasks}
        toggleCategory={toggleCategory}
        toggleTask={toggleTask}
      />
    </aside>
  );
}
