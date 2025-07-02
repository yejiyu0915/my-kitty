import { nanoid } from 'nanoid';

export const taskData = [
  {
    id: nanoid(),
    category: 'Layout',
    isOpen: false,
    content: [
      { id: nanoid(), text: 'Header, Footer, Main 분리', isDone: true },
      { id: nanoid(), text: '전반적 레이아웃 구성', isDone: true },
      { id: nanoid(), text: '레이아웃 스타일링', isDone: true },
    ],
  },
  {
    id: nanoid(),
    category: 'TaskList',
    isOpen: false,
    content: [
      { id: nanoid(), text: 'TaskList 컴포넌트 제작', isDone: true },
      { id: nanoid(), text: 'TaskList type 정의, data 분리', isDone: true },
      { id: nanoid(), text: 'TaskList 컴포넌트 분리', isDone: true },
      { id: nanoid(), text: 'TaskList 코드 리팩토링', isDone: true },
      { id: nanoid(), text: 'TaskList 카테고리 분리', isDone: true },
      { id: nanoid(), text: 'TaskList 카테고리 토글 구현', isDone: true },
      { id: nanoid(), text: 'TaskList 코드 리팩토링(2)', isDone: true },
    ],
  },
  {
    id: nanoid(),
    category: 'Chat',
    isOpen: true,
    content: [
      { id: nanoid(), text: 'Chat 컴포넌트 분리', isDone: true },
      { id: nanoid(), text: 'Chat data 분리', isDone: true },
      { id: nanoid(), text: '입력 컴포넌트 제작', isDone: true },
      { id: nanoid(), text: '스크롤 훅 적용', isDone: true },
      { id: nanoid(), text: '스키마 적용', isDone: true },
      { id: nanoid(), text: 'Chat 컴포넌트 코드 리팩토링', isDone: true },
      { id: nanoid(), text: 'AI 전용 컴포넌트 제작', isDone: true },
      { id: nanoid(), text: '모드 토글 버튼 제작', isDone: true },
      { id: nanoid(), text: 'Chat 컴포넌트 코드 리팩토링(2)', isDone: true },
    ],
  },
  {
    id: nanoid(),
    category: 'Report',
    isOpen: false,
    content: [
      { id: nanoid(), text: 'Report 컴포넌트 분리', isDone: true },
      { id: nanoid(), text: 'Chat 이용, 데이터 바인딩', isDone: true },
      { id: nanoid(), text: 'localStorage 적용', isDone: true },
      { id: nanoid(), text: 'Report 컴포넌트 코드 리팩토링', isDone: true },
    ],
  },
];
