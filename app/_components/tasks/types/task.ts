// Domain Types
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

// Component Props Types
export interface TaskListCategoryProps {
  category: TaskCategory;
  categoryIndex: number;
  toggleCategory: (index: number) => void;
  toggleTask: (categoryIndex: number, taskIndex: number) => void;
}

export interface TaskListCategoryTitleTextProps {
  category: TaskCategory;
  categoryIndex: number;
}

export interface TaskListContentProps {
  isOpen: boolean;
  tasks: TaskCategory[];
  toggleCategory: (index: number) => void;
  toggleTask: (categoryIndex: number, taskIndex: number) => void;
}

export interface TaskListHeaderProps {
  toggleList: () => void;
  tasks: TaskCategory[];
}

export interface TaskListItemProps {
  tasks: TaskContent[];
  toggleTask: (taskIndex: number) => void;
}

export interface ProgressProps {
  completed: number;
  total: number;
  percentage: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
}
