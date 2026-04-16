"use client";

import { useMemo, useState } from "react";

import { Spacing } from "@/components/common/Spacing";
import { TodoList as TodoListUi } from "@/components/todo/List";
import {
  TODO_COLUMN_DEFAULT_SORT_LABEL,
  TODO_COLUMN_SORT_LABEL_ORDER,
  TODO_LIST_SORT_BY_LABEL,
  type TodoListSortLabel,
} from "@/features/todo/constants/todoColumnSort";
import { todoQueries } from "@/features/todo/query/todo.queryKey";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface DoingListProps {
  goalId: string;
  keyword: string;
  isMyTodo: boolean;
}

export const DoingList = ({ goalId, keyword, isMyTodo }: DoingListProps) => {
  const [selectedSort, setSelectedSort] = useState<TodoListSortLabel>(
    TODO_COLUMN_DEFAULT_SORT_LABEL.DOING,
  );
  const sort = TODO_LIST_SORT_BY_LABEL[selectedSort];

  const infiniteQueryOptions = useMemo(
    () =>
      todoQueries.doingListInfinite(goalId, {
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
      name="DOING"
      height="320px"
      sortOptions={[...TODO_COLUMN_SORT_LABEL_ORDER.DOING]}
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
