'use client';

import { memo } from 'react';
import type { TaskListItemProps } from '@/app/_components/tasks/types/task';
import Checkbox from '@/components/ui/input/checkbox';

const TaskCheckbox = memo(function TaskCheckbox({
  task,
  onToggle,
}: {
  task: { id: string; text: string; isDone: boolean };
  onToggle: (taskId: string) => void;
}) {
  return (
    <li className="flex items-center gap-2 rounded-md bg-white p-2">
      <Checkbox checked={task.isDone} onChange={() => onToggle(task.id)} label={task.text} />
    </li>
  );
});

function TaskListItem({ tasks, toggleTask, categoryId }: TaskListItemProps) {
  return (
    <ul className="border-primary/20 mt-2 ml-5 space-y-1 border-l-2 pl-2">
      {tasks.map((task) => (
        <TaskCheckbox
          key={task.id}
          task={task}
          onToggle={(taskId) => toggleTask(taskId, categoryId)}
        />
      ))}
    </ul>
  );
}

export default memo(TaskListItem);
