'use client';

import { useMemo } from 'react';
import type { TaskListContentProps } from '@/app/_components/tasks/types/task';
import TaskListCategory from './TaskListCategory';

/**
 * [React Hooks 학습 포인트]
 *
 * 1. useMemo
 *    - 리스트 렌더링 최적화
 *    - 실제로 필요한 최적화의 예시
 *    - 의존성 배열이 변경될 때만 재계산
 *
 * 2. 성능 최적화
 *    - 실제로 필요한 최적화와 불필요한 최적화의 구분
 *    - 리스트 렌더링에서의 최적화 중요성
 *    - 의존성 배열 관리의 중요성
 */

export default function TaskListContent({
  isOpen,
  tasks,
  toggleCategory,
  toggleTask,
}: TaskListContentProps) {
  // useMemo: 카테고리 리스트 렌더링 최적화
  // 장점: tasks 배열이 변경되지 않으면 리스트 재생성 방지
  // 장점: 실제로 필요한 최적화의 예시
  // 장점: 리스트 렌더링 성능 향상
  const categoryList = useMemo(
    () =>
      tasks.map((category, categoryIndex) => (
        <TaskListCategory
          key={category.id}
          category={category}
          categoryIndex={categoryIndex}
          toggleCategory={toggleCategory}
          toggleTask={toggleTask}
        />
      )),
    [tasks, toggleCategory, toggleTask]
  );

  return (
    <div
      className={`mt-2 max-h-[80vh] w-80 overflow-y-auto rounded-lg bg-white p-4 shadow-xs transition-all duration-200 ${
        isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
    >
      <h2 className="mb-4 text-lg font-semibold">고양이 병원 🏥</h2>
      <div className="space-y-2">{categoryList}</div>
    </div>
  );
}
