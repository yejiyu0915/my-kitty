'use client';

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
  return (
    <Accordion
      isOpen={category.isOpen}
      onToggle={() => toggleCategory(categoryIndex)}
      header={<TaskListCategoryTitleText category={category} categoryIndex={categoryIndex} />}
    >
      <TaskListItem
        tasks={category.content}
        toggleTask={(taskIndex) => toggleTask(categoryIndex, taskIndex)}
      />
    </Accordion>
  );
}
