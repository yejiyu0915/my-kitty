'use client';

import { memo, useMemo } from 'react';
import type { TaskListCategoryTitleTextProps } from '@/app/_components/tasks/types/task';
import Progress from '@/app/_components/tasks/ui/TaskProgress';

/**
 * [React Hooks 학습 포인트]
 *
 * 1. useMemo
 *    - 계산된 값을 메모이제이션
 *    - 간단한 계산의 경우 불필요한 최적화
 *    - 의존성 배열이 변경될 때만 재계산
 *
 * 2. memo
 *    - 컴포넌트 메모이제이션
 *    - props 변경 시에만 리렌더링
 *    - 불필요한 리렌더링 방지
 */

const CategoryNumber = memo(function CategoryNumber({ number }: { number: number }) {
  return (
    <span className="text-primary border-primary/50 mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 text-xs font-medium">
      {number}
    </span>
  );
});

function TaskListCategoryTitleText({ category, categoryIndex }: TaskListCategoryTitleTextProps) {
  // useMemo: 완료된 태스크 수 계산 메모이제이션
  // 장점: category.content가 변경되지 않으면 재계산 방지
  // 단점: 간단한 filter 연산의 경우 오히려 오버헤드 발생 가능
  const completed = useMemo(
    () => category.content.filter((task) => task.isDone).length,
    [category.content]
  );

  return (
    <div className="flex items-center gap-2">
      <h3 className={`flex items-center ${category.isOpen ? 'font-bold' : 'font-medium'}`}>
        <CategoryNumber number={categoryIndex + 1} />
        <span>{category.category}</span>
      </h3>
      <Progress completed={completed} total={category.content.length} className="text-xs" />
    </div>
  );
}

export default memo(TaskListCategoryTitleText);
