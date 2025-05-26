'use client';

import { useCallback, memo } from 'react';
import type { TaskListCategoryProps } from '@/app/_components/tasks/types/task';
import TaskListCategoryTitleText from './TaskListCategoryTitleText';
import TaskListItem from './TaskListItem';
import Accordion from '@/components/ui/accordion';

/**
 * [React Hooks 학습 포인트]
 *
 * 1. useCallback
 *    - 중첩된 이벤트 핸들러 최적화
 *    - 여러 단계의 콜백 함수 메모이제이션
 *    - 의존성 배열 관리의 중요성
 *
 * 2. memo
 *    - 컴포넌트 메모이제이션
 *    - props 변경 시에만 리렌더링
 *    - 불필요한 리렌더링 방지
 */

function TaskListCategory({
  category,
  categoryIndex,
  toggleCategory,
  toggleTask,
}: TaskListCategoryProps) {
  // useCallback: 카테고리 토글 핸들러 메모이제이션
  // 장점: Accordion 컴포넌트의 불필요한 리렌더링 방지
  // 단점: 단순한 함수의 경우 오히려 오버헤드 발생 가능
  const handleToggle = useCallback(() => {
    toggleCategory(categoryIndex);
  }, [toggleCategory, categoryIndex]);

  // useCallback: 태스크 토글 핸들러 메모이제이션
  // 장점: TaskListItem 컴포넌트의 불필요한 리렌더링 방지
  // 단점: 중첩된 콜백의 경우 의존성 관리가 복잡해질 수 있음
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

export default memo(TaskListCategory);
