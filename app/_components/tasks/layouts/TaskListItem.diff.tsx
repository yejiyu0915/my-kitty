'use client';

import { useCallback, memo, useMemo } from 'react';
import type { TaskListItemProps } from '@/app/_components/tasks/types/task';
import Checkbox from '@/components/ui/checkbox';

/**
 * [React Hooks 학습 포인트]
 *
 * 1. useCallback
 *    - 이벤트 핸들러 함수를 메모이제이션
 *    - 자식 컴포넌트의 불필요한 리렌더링 방지
 *    - 의존성 배열이 변경될 때만 함수 재생성
 *
 * 2. useMemo
 *    - 계산된 값을 메모이제이션
 *    - 리스트 렌더링 최적화
 *    - 의존성 배열이 변경될 때만 재계산
 *
 * 3. memo
 *    - 컴포넌트 자체를 메모이제이션
 *    - props가 변경되지 않으면 리렌더링 방지
 *    - 불필요한 리렌더링 최적화
 */

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
  // useCallback: 이벤트 핸들러 메모이제이션
  // 장점: 자식 컴포넌트의 불필요한 리렌더링 방지
  // 단점: 단순한 함수의 경우 오히려 오버헤드 발생 가능
  const handleTaskToggle = useCallback(
    (index: number) => {
      toggleTask(index);
    },
    [toggleTask]
  );

  // useMemo: 리스트 렌더링 최적화
  // 장점: tasks 배열이 변경되지 않으면 리스트 재생성 방지
  // 단점: 간단한 매핑의 경우 오히려 오버헤드 발생 가능
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
