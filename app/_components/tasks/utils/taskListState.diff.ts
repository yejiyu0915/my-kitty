'use client';

import { useReducer, useCallback, useMemo } from 'react';
import { taskData } from '@/app/_components/tasks/data/taskData';
import type { TaskCategory } from '@/app/_components/tasks/types/task';

/**
 * [React Hooks 학습 포인트]
 *
 * 1. useReducer
 *    - 복잡한 상태 로직 관리
 *    - 상태 업데이트 로직 분리
 *    - 액션 기반 상태 관리
 *
 * 2. useCallback
 *    - 이벤트 핸들러 메모이제이션
 *    - dispatch 함수와 함께 사용
 *    - 의존성 배열 관리
 *
 * 3. useMemo
 *    - 계산 비용이 큰 연산 최적화
 *    - 통계 데이터 계산 최적화
 *    - 의존성 배열 관리
 */

// 액션 타입 정의
type TaskAction =
  | { type: 'TOGGLE_CATEGORY'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: { categoryId: string; taskId: string } };

// 리듀서 함수 정의
function taskReducer(state: TaskCategory[], action: TaskAction): TaskCategory[] {
  switch (action.type) {
    case 'TOGGLE_CATEGORY':
      return state.map((taskCategory) =>
        taskCategory.id === action.payload
          ? { ...taskCategory, isOpen: !taskCategory.isOpen }
          : taskCategory
      );
    case 'TOGGLE_TASK':
      return state.map((taskCategory) =>
        taskCategory.id === action.payload.categoryId
          ? {
              ...taskCategory,
              content: taskCategory.content.map((taskContent) =>
                taskContent.id === action.payload.taskId
                  ? { ...taskContent, isDone: !taskContent.isDone }
                  : taskContent
              ),
            }
          : taskCategory
      );
    default:
      return state;
  }
}

export function useTaskListState() {
  // useReducer: 복잡한 상태 관리
  // 장점: 상태 업데이트 로직이 명확하게 분리됨
  // 장점: 액션 기반으로 상태 변경 추적 가능
  // 장점: 테스트하기 쉬운 구조
  const [tasks, dispatch] = useReducer(taskReducer, taskData);

  // useCallback: 이벤트 핸들러 메모이제이션
  // 장점: dispatch 함수와 함께 사용하여 안정적인 참조 유지
  // 장점: 자식 컴포넌트의 불필요한 리렌더링 방지
  const toggleCategory = useCallback((index: number) => {
    dispatch({ type: 'TOGGLE_CATEGORY', payload: index.toString() });
  }, []);

  const toggleTask = useCallback((categoryIndex: number, taskIndex: number) => {
    dispatch({
      type: 'TOGGLE_TASK',
      payload: { categoryId: categoryIndex.toString(), taskId: taskIndex.toString() },
    });
  }, []);

  // useMemo: 카테고리별 통계 계산 최적화
  // 장점: 계산 비용이 큰 연산 최적화
  // 장점: tasks가 변경되지 않으면 재계산 방지
  const categoryStats = useMemo(() => {
    return tasks.map((category) => ({
      id: category.id,
      total: category.content.length,
      completed: category.content.filter((task) => task.isDone).length,
    }));
  }, [tasks]);

  // useMemo: 전체 통계 계산 최적화
  // 장점: 계산 비용이 큰 연산 최적화
  // 장점: categoryStats가 변경되지 않으면 재계산 방지
  const totalStats = useMemo(() => {
    return categoryStats.reduce(
      (acc, category) => ({
        total: acc.total + category.total,
        completed: acc.completed + category.completed,
      }),
      { total: 0, completed: 0 }
    );
  }, [categoryStats]);

  return {
    tasks,
    categoryStats,
    totalStats,
    toggleCategory,
    toggleTask,
  };
}
