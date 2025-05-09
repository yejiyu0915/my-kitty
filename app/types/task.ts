export interface TaskContent {
  text: string;
  isDone: boolean;
}

export interface TaskCategory {
  category: string;
  isOpen: boolean;
  content: TaskContent[];
}
