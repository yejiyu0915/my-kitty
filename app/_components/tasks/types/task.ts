// 도메인 타입
export interface TaskContent {
  id: string;
  text: string;
  isDone: boolean;
}

export interface TaskCategory {
  id: string;
  category: string;
  isOpen: boolean;
  content: TaskContent[];
}

// 공통 타입
export type ToggleTaskHandler = (taskId: string, categoryId: string) => void;
export type ToggleCategoryHandler = (id: string) => void;

export interface CategoryProps {
  category: TaskCategory;
  categoryIndex: number;
}

// 컴포넌트 Props 타입
export interface TaskListCategoryProps extends CategoryProps {
  toggleCategory: ToggleCategoryHandler;
  toggleTask: ToggleTaskHandler;
}

export type TaskListCategoryTitleTextProps = CategoryProps;

export interface TaskListContentProps {
  isOpen: boolean;
  tasks: TaskCategory[];
  toggleCategory: ToggleCategoryHandler;
  toggleTask: ToggleTaskHandler;
}

export interface TaskListHeaderProps {
  toggleList: () => void;
  totalStats: {
    total: number;
    completed: number;
  };
}

export interface TaskListItemProps {
  tasks: TaskContent[];
  categoryId: string;
  toggleTask: ToggleTaskHandler;
}

export interface ProgressProps {
  completed: number;
  total: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
}
