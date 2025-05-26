'use client';

import { memo } from 'react';
import TaskListContent from './layouts/TaskListContent';
import TaskListHeader from './layouts/TaskListHeader';
import { useTaskListState } from './utils/taskListState';
import { useTaskListToggle } from './utils/taskListToggle';

function TaskList() {
  const { isOpen, toggleList } = useTaskListToggle();
  const { tasks, totalStats, toggleCategory, toggleTask } = useTaskListState();

  return (
    <aside className="fixed top-8 left-8">
      <TaskListHeader toggleList={toggleList} totalStats={totalStats} />
      <TaskListContent
        isOpen={isOpen}
        tasks={tasks}
        toggleCategory={toggleCategory}
        toggleTask={toggleTask}
      />
    </aside>
  );
}

export default memo(TaskList);
