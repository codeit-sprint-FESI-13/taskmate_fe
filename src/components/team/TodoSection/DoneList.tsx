"use client";

import { useMemo, useState } from "react";

import { TodoList as TodoListUi } from "@/components/todo/List";
import {
  TODO_COLUMN_DEFAULT_SORT_LABEL,
  TODO_COLUMN_SORT_LABEL_ORDER,
  TODO_LIST_SORT_BY_LABEL,
  type TodoListSortLabel,
} from "@/features/todo/constants/todoColumnSort";
import { todoQueries } from "@/features/todo/query/todo.queryKey";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Spacing } from "@/shared/ui/Spacing";

interface DoneListProps {
  goalId: string;
  keyword: string;
  isMyTodo: boolean;
}

export const DoneList = ({ goalId, keyword, isMyTodo }: DoneListProps) => {
  const [selectedSort, setSelectedSort] = useState<TodoListSortLabel>(
    TODO_COLUMN_DEFAULT_SORT_LABEL.DONE,
  );
  const sort = TODO_LIST_SORT_BY_LABEL[selectedSort];

  const infiniteQueryOptions = useMemo(
    () =>
      todoQueries.doneListInfinite(goalId, {
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
      name="DONE"
      height="320px"
      sortOptions={[...TODO_COLUMN_SORT_LABEL_ORDER.DONE]}
      selectedSort={selectedSort}
      onSortChange={(value) => setSelectedSort(value as TodoListSortLabel)}
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
      <Spacing size={24} />
    </TodoListUi.List>
  );
};
