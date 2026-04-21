"use client";

import { useMemo, useState } from "react";

import { todoQueries } from "@/entities/todo/query/todo.queryKey";
import {
  TODO_COLUMN_DEFAULT_SORT_LABEL,
  TODO_COLUMN_SORT_LABEL_ORDER,
  TODO_LIST_SORT_BY_LABEL,
  type TodoListSortLabel,
} from "@/features/todo/constants/todoColumnSort";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { Spacing } from "@/shared/ui/Spacing";
import { TodoList as TodoListUi } from "@/widgets/todo/List";

interface TodoListProps {
  goalId: string;
  keyword: string;
  isMyTodo: boolean;
}

export const TodoList = ({ goalId, keyword, isMyTodo }: TodoListProps) => {
  const [selectedSort, setSelectedSort] = useState<TodoListSortLabel>(
    TODO_COLUMN_DEFAULT_SORT_LABEL.TODO,
  );
  const sort = TODO_LIST_SORT_BY_LABEL[selectedSort];

  const infiniteQueryOptions = useMemo(
    () =>
      todoQueries.todoListInfinite(goalId, {
        keyword,
        isMyTodo,
        sort,
      }),
    [goalId, isMyTodo, keyword, sort],
  );

  const { data, ref } = useInfiniteScroll(infiniteQueryOptions, 0.4);
  const items = data.pages.flatMap((page) => page.items);

  return (
    <TodoListUi.List
      name="TODO"
      height="728px"
      sortOptions={[...TODO_COLUMN_SORT_LABEL_ORDER.TODO]}
      selectedSort={selectedSort}
      onSortChange={(value) => setSelectedSort(value as TodoListSortLabel)}
      footer={
        <>
          <Spacing size={24} />
          <TodoListUi.CreateButton />
        </>
      }
    >
      {items.map((todo) => (
        <TodoListUi.Item
          key={todo.id}
          todo={todo}
        />
      ))}
      <div
        ref={ref}
        className="h-1 w-full"
      />
    </TodoListUi.List>
  );
};
