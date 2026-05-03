export type TodoStatus = "TODO" | "DOING" | "DONE";
export type TodoListStatus = "TODO" | "DOING" | "DONE";
export type TodoListSort = "DUE_DATE" | "CREATED_LATEST" | "CREATED_OLDEST";

export type CreateTodoRequest = {
  title: string;
  startDate: string;
  dueDate: string;
  assigneeIds: number[];
  memo: string;
};

export type UpdateTodoRequest = {
  title: string;
  startDate: string;
  dueDate: string;
  status: TodoStatus;
  memo: string;
  assigneeIds: number[];
};

export type CreateTodoResponse = null;

export interface Todo {
  id: number;
  goalId: number;
  title: string;
  startDate: string;
  dueDate: string;
  status: TodoStatus;
  memo: string;
  assigneeSummary: string;
  assignees: {
    userId: number;
    nickname: string;
  }[];
}

export interface TodoListResponse {
  sort: TodoListSort;
  items: Todo[];
  hasNext: boolean;
  nextCursorDueDate: string | null;
  nextCursorCreatedAt: string | null;
  nextCursorId: number | null;
}

export interface TodoListQueryParams {
  sort: TodoListSort;
  mineOnly: boolean;
  titleContains: string;
  cursorDueDate?: string;
  cursorCreatedAt?: string;
  cursorId?: number;
  limit?: number;
}

export type TodoInfiniteQueryParams = {
  cursorId?: number;
  cursorCreatedAt?: string;
  size?: number;
};

export type TodoItem = {
  todoId: number;
  title: string;
  teamDisplayName: string;
  goalTitle: string;
  dueDate: string;
};

export type RecentTodoListResponse = {
  items: TodoItem[];
  hasNext: boolean;
  nextCursorCreatedAt?: string;
  nextCursorId?: number;
};

export type DueSoonTodoListResponse = {
  items: TodoItem[];
  hasNext: boolean;
  nextCursorDueDate?: string;
  nextCursorId?: number;
};
