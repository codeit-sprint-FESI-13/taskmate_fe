export type TodoStatus = "TODO" | "DOING" | "DONE";

export type CreateTodoInput = {
  title: string;
  startDate: string;
  dueDate: string;
  assigneeIds: number[];
  memo: string;
};

export type UpdateTodoInput = {
  title: string;
  startDate: string;
  dueDate: string;
  status: TodoStatus;
  memo: string;
  assigneeIds: number[];
};

export type ResponseCreateTodo = {
  success: boolean;
  code: string;
  message: string;
};

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
  success: boolean;
  code: string;
  message: string;
  data: {
    sort: TodoListSort;
    items: Todo[];
    hasNext: boolean;
    nextCursorDueDate: string | null;
    nextCursorCreatedAt: string | null;
    nextCursorId: number | null;
  };
}

export type TodoListStatus = "TODO" | "DOING" | "DONE";
export type TodoListSort = "DUE_DATE" | "CREATED_LATEST" | "CREATED_OLDEST";

export interface TodoListQueryParams {
  sort: TodoListSort;
  mineOnly: boolean;
  titleContains: string;
  cursorDueDate?: string;
  cursorCreatedAt?: string;
  cursorId?: number;
  limit?: number;
}

// GET - query params

export type InfiniteQueryParams = {
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

export type RecentSuccessResponse = {
  success: true;
  code: string;
  message: string;
  data: {
    items: TodoItem[];
    hasNext: boolean;
    nextCursorCreatedAt: string;
    nextCursorId: number;
  };
  timestamp: string;
};

export type DueSoonSuccessResponse = {
  success: true;
  code: string;
  message: string;
  data: {
    items: TodoItem[];
    hasNext: boolean;
    nextCursorDueDate: string;
    nextCursorId: number;
  };
  timestamp: string;
};
