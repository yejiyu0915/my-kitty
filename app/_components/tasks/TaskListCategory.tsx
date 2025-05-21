'use client';

import { useCallback } from 'react';
import type { TaskListCategoryProps } from '@/app/_components/tasks/types/task';
import TaskListCategoryTitleText from './TaskListCategoryTitleText';
import TaskListItem from './TaskListItem';
import Accordion from '@/components/ui/accordion';

export default function TaskListCategory({
  category,
  categoryIndex,
  toggleCategory,
  toggleTask,
}: TaskListCategoryProps) {
  const handleToggle = useCallback(() => {
    toggleCategory(categoryIndex);
  }, [toggleCategory, categoryIndex]);

  const handleTaskToggle = useCallback(
    (taskIndex: number) => {
      toggleTask(categoryIndex, taskIndex);
    },
    [toggleTask, categoryIndex]
  );

  return (
    <Accordion
      isOpen={category.isOpen}
      onToggle={handleToggle}
      header={<TaskListCategoryTitleText category={category} categoryIndex={categoryIndex} />}
    >
      <TaskListItem tasks={category.content} toggleTask={handleTaskToggle} />
    </Accordion>
  );
}
