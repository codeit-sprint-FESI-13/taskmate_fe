import type { TodoListSort } from "../types";

const TODO_LIST_SORT_BY_LABEL_CONST = {
  "마감일 순": "DUE_DATE",
  최신순: "CREATED_LATEST",
  오래된순: "CREATED_OLDEST",
} as const;

export const TODO_LIST_SORT_BY_LABEL: Record<
  keyof typeof TODO_LIST_SORT_BY_LABEL_CONST,
  TodoListSort
> = TODO_LIST_SORT_BY_LABEL_CONST;

export type TodoListSortLabel = keyof typeof TODO_LIST_SORT_BY_LABEL_CONST;

export const TODO_COLUMN_SORT_LABEL_ORDER = {
  TODO: ["마감일 순", "최신순", "오래된순"],
  DOING: ["최신순", "마감일 순", "오래된순"],
  DONE: ["오래된순", "최신순", "마감일 순"],
} as const satisfies Record<
  "TODO" | "DOING" | "DONE",
  readonly TodoListSortLabel[]
>;

export const TODO_COLUMN_DEFAULT_SORT_LABEL = {
  TODO: "마감일 순",
  DOING: "최신순",
  DONE: "오래된순",
} as const satisfies Record<
  keyof typeof TODO_COLUMN_SORT_LABEL_ORDER,
  TodoListSortLabel
>;
