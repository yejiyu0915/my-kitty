'use client';

import type { TaskContent } from '@/app/types/task';
import Checkbox from '@/app/_components/ui/Checkbox';

interface TaskListItemProps {
  tasks: TaskContent[];
  toggleTask: (taskIndex: number) => void;
}

export default function TaskListItem({ tasks, toggleTask }: TaskListItemProps) {
  return (
    <ul className="border-primary/20 mt-2 ml-5 space-y-1 border-l-2 pl-2">
      {tasks.map((task, index) => (
        <li key={index} className="flex items-center gap-2 rounded-md bg-white p-2">
          <Checkbox checked={task.isDone} onChange={() => toggleTask(index)} label={task.text} />
        </li>
      ))}
    </ul>
  );
}
