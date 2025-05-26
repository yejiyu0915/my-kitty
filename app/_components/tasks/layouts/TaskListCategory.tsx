'use client';

import { memo } from 'react';
import type { TaskListCategoryProps } from '@/app/_components/tasks/types/task';
import TaskListCategoryTitleText from './TaskListCategoryTitleText';
import TaskListItem from './TaskListItem';
import Accordion from '@/components/ui/accordion';

function TaskListCategory({
  category,
  categoryIndex,
  toggleCategory,
  toggleTask,
}: TaskListCategoryProps) {
  return (
    <Accordion
      isOpen={category.isOpen}
      onToggle={() => toggleCategory(category.id)}
      header={<TaskListCategoryTitleText category={category} categoryIndex={categoryIndex} />}
    >
      <TaskListItem tasks={category.content} categoryId={category.id} toggleTask={toggleTask} />
    </Accordion>
  );
}

export default memo(TaskListCategory);
