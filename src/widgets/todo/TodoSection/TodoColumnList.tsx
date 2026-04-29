"use client";

import { useMemo, useState } from "react";

import { todoQueryOptions } from "@/entities/todo";
import {
  TODO_COLUMN_DEFAULT_SORT_LABEL,
  TODO_COLUMN_SORT_LABEL_ORDER,
  TODO_LIST_SORT_BY_LABEL,
  TodoList as TodoListUi,
  type TodoListSortLabel,
} from "@/features/todo";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { Spacing } from "@/shared/ui/Spacing";

type TodoColumnStatus = "TODO" | "DOING" | "DONE";

interface TodoColumnListProps {
  status: TodoColumnStatus;
  goalId: string;
  keyword: string;
  isMyTodo: boolean;
}

const QUERY_FNS: Record<
  TodoColumnStatus,
  typeof todoQueryOptions.todoListInfinite
> = {
  TODO: todoQueryOptions.todoListInfinite,
  DOING: todoQueryOptions.doingListInfinite,
  DONE: todoQueryOptions.doneListInfinite,
};

type ColumnConfig = {
  defaultSort: TodoListSortLabel;
  sortOptions: readonly TodoListSortLabel[];
  height: string;
  showCreateButton: boolean;
};

const COLUMN_CONFIG: Record<TodoColumnStatus, ColumnConfig> = {
  TODO: {
    defaultSort: TODO_COLUMN_DEFAULT_SORT_LABEL.TODO,
    sortOptions: TODO_COLUMN_SORT_LABEL_ORDER.TODO,
    height: "728px",
    showCreateButton: true,
  },
  DOING: {
    defaultSort: TODO_COLUMN_DEFAULT_SORT_LABEL.DOING,
    sortOptions: TODO_COLUMN_SORT_LABEL_ORDER.DOING,
    height: "320px",
    showCreateButton: false,
  },
  DONE: {
    defaultSort: TODO_COLUMN_DEFAULT_SORT_LABEL.DONE,
    sortOptions: TODO_COLUMN_SORT_LABEL_ORDER.DONE,
    height: "320px",
    showCreateButton: false,
  },
};

export function TodoColumnList({
  status,
  goalId,
  keyword,
  isMyTodo,
}: TodoColumnListProps) {
  const config = COLUMN_CONFIG[status];

  const [selectedSort, setSelectedSort] = useState<TodoListSortLabel>(
    config.defaultSort,
  );
  const sort = TODO_LIST_SORT_BY_LABEL[selectedSort];

  const options = useMemo(
    () => QUERY_FNS[status](goalId, { keyword, isMyTodo, sort }),
    [status, goalId, isMyTodo, keyword, sort],
  );

  const { data, ref } = useInfiniteScroll(options, 0.4);
  const items = data.pages.flatMap((page) => page.items);

  return (
    <TodoListUi.List
      name={status}
      height={config.height}
      sortOptions={[...config.sortOptions]}
      selectedSort={selectedSort}
      onSortChange={(value) => setSelectedSort(value as TodoListSortLabel)}
      footer={
        config.showCreateButton ? (
          <>
            <Spacing size={24} />
            <TodoListUi.CreateButton />
          </>
        ) : undefined
      }
    >
      {items.map((todo) => (
        <TodoListUi.Item
          key={todo.id}
          todo={todo}
        />
      ))}
      <li
        className="h-1 w-full list-none"
        aria-hidden
      >
        <div
          ref={ref}
          className="h-full w-full"
        />
      </li>
      {!config.showCreateButton && (
        <li
          className="h-6 list-none"
          aria-hidden
        />
      )}
    </TodoListUi.List>
  );
}
