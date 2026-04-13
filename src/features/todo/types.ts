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
  data: Todo[];
}

export type TodoListStatus = "TODO" | "DOING" | "DONE";

export interface TodoListQueryParams {
  sort: "DUE_DATE" | "CREATED_LATEST" | "CREATED_OLDEST";
  mineOnly: boolean;
  titleContains: string;
}
