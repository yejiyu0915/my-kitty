'use client';

import { useCallback, memo } from 'react';
import type { TaskListItemProps } from '@/app/_components/tasks/types/task';
import Checkbox from '@/components/ui/checkbox';

function TaskListItem({ tasks, toggleTask }: TaskListItemProps) {
  const handleTaskToggle = useCallback(
    (index: number) => {
      toggleTask(index);
    },
    [toggleTask]
  );

  return (
    <ul className="border-primary/20 mt-2 ml-5 space-y-1 border-l-2 pl-2">
      {tasks.map((task, index) => (
        <li key={task.id} className="flex items-center gap-2 rounded-md bg-white p-2">
          <Checkbox
            checked={task.isDone}
            onChange={() => handleTaskToggle(index)}
            label={task.text}
          />
        </li>
      ))}
    </ul>
  );
}

export default memo(TaskListItem);
