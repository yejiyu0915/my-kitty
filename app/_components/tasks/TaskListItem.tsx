'use client';

import { useCallback, memo, useMemo } from 'react';
import type { TaskListItemProps } from '@/app/_components/tasks/types/task';
import Checkbox from '@/components/ui/checkbox';

const TaskCheckbox = memo(function TaskCheckbox({
  task,
  index,
  onToggle,
}: {
  task: { id: string; text: string; isDone: boolean };
  index: number;
  onToggle: (index: number) => void;
}) {
  return (
    <li className="flex items-center gap-2 rounded-md bg-white p-2">
      <Checkbox checked={task.isDone} onChange={() => onToggle(index)} label={task.text} />
    </li>
  );
});

function TaskListItem({ tasks, toggleTask }: TaskListItemProps) {
  const handleTaskToggle = useCallback(
    (index: number) => {
      toggleTask(index);
    },
    [toggleTask]
  );

  const taskList = useMemo(
    () =>
      tasks.map((task, index) => (
        <TaskCheckbox key={task.id} task={task} index={index} onToggle={handleTaskToggle} />
      )),
    [tasks, handleTaskToggle]
  );

  return <ul className="border-primary/20 mt-2 ml-5 space-y-1 border-l-2 pl-2">{taskList}</ul>;
}

export default memo(TaskListItem);
