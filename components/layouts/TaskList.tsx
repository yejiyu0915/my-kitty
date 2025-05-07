'use client';

import { useState } from 'react';

// 할 일 목록 데이터
const taskData = [
  { id: 1, text: '전반적 레이아웃 구성', isDone: true },
  { id: 2, text: '큰 규모 컴포넌트 분리', isDone: true },
  { id: 3, text: 'TaskList 컴포넌트 제작', isDone: true },
  { id: 4, text: '입력 컴포넌트 제작', isDone: false },
  { id: 5, text: '데이터 바인딩', isDone: false },
  { id: 6, text: '컴포넌트 세분화', isDone: false },
  { id: 7, text: '추가 기능 구현', isDone: false },
  { id: 8, text: '오류 잡기', isDone: false },
  { id: 9, text: '반응형 작업', isDone: false },
  { id: 10, text: '애니메이션 추가', isDone: false },
];

export default function TaskList() {
  // 리스트 표시 여부
  const [isOpen, setIsOpen] = useState(false);
  // 할 일 목록 상태
  const [tasks, setTasks] = useState(taskData);

  // 리스트 열고 닫기
  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  // 할 일 완료 상태 변경
  const toggleTask = (taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      })
    );
  };

  return (
    <aside className="fixed top-8 left-8">
      {/* Task List 버튼 */}
      <button
        onClick={toggleList}
        className="bg-primary hover:bg-primary/90 cursor-pointer rounded-sm px-4 py-2 text-white shadow-xs transition-colors"
      >
        Task List
      </button>

      {/* Task List 내용 */}
      <div
        className={`mt-2 w-64 rounded-lg bg-white p-4 shadow-xs transition-all duration-200 ${
          isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <h2 className="mb-4 text-lg font-semibold">Task List</h2>
        <ul className="space-y-1 text-sm">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-2 rounded p-2 hover:bg-gray-100">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={task.isDone}
                onChange={() => toggleTask(task.id)}
              />
              <label
                className={`flex-1 cursor-pointer ${task.isDone ? 'text-gray-500 line-through' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
