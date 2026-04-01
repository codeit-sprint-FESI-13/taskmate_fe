"use client";

import { Icon } from "@/components/common/Icon";
import { useTodoDeleteModal } from "@/features/todo/hooks/useTodoDeleteModal";
import { useTodoDetailModal } from "@/features/todo/hooks/useTodoDetailModal";
import { Todo } from "@/features/todo/types";

import { TodoItem } from "../TodoItem";
import { TodoAssigneeAvatars } from "./TodoAssigneeAvatars";
import { TodoStatusSelect } from "./TodoStatusSelect";

interface ItemProps {
  todo: Todo;
}

export const Item = ({ todo }: ItemProps) => {
  const { openTodoDeleteModal } = useTodoDeleteModal();
  const { openTodoDetailModal } = useTodoDetailModal();

  return (
    <li
      className="flex w-full items-center justify-between px-3 py-[10px]"
      onClick={openTodoDetailModal}
    >
      <div className="flex min-w-0 flex-1 items-center justify-start gap-2">
        <TodoStatusSelect
          initialStatus={todo.status}
          onChange={() => {
            // @TODO: PATCH todo status API 연동
          }}
        />
        <TodoItem.Name>{todo.title}</TodoItem.Name>
        <TodoItem.Day color="gray">D-5</TodoItem.Day>
      </div>
      <div className="flex items-center justify-end gap-3">
        <TodoAssigneeAvatars assignees={todo.assignees} />

        <button
          type="button"
          className="shrink-0 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            openTodoDeleteModal();
          }}
        >
          <Icon
            name="Trash"
            size={24}
            className="text-gray-300"
          />
        </button>
      </div>
    </li>
  );
};
