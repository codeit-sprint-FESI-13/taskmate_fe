"use client";

import type { Todo } from "@/entities/todo";
import { useTodoDeleteModal } from "@/features/todo/hooks/useTodoDeleteModal";
import { useTodoDetailModal } from "@/features/todo/hooks/useTodoDetailModal";
import { formatDDay } from "@/features/todo/utils/formatDDay";
import { Icon } from "@/shared/ui/Icon";

import { TodoItem } from "../TodoItem";
import { TodoAssigneeAvatars } from "./TodoAssigneeAvatars";
import { TodoStatusSelect } from "./TodoStatusSelect";

interface ItemProps {
  todo: Todo;
}

export const Item = ({ todo }: ItemProps) => {
  const { openTodoDeleteModal } = useTodoDeleteModal({
    todoId: todo.id.toString(),
  });
  const { openTodoDetailModal } = useTodoDetailModal({ todo });

  return (
    <li
      className="flex w-full items-center justify-between px-3 py-2.5"
      onClick={openTodoDetailModal}
    >
      <div className="flex min-w-0 flex-1 items-center justify-start gap-2">
        <TodoStatusSelect todo={todo} />
        <TodoItem.Name>{todo.title}</TodoItem.Name>
        <TodoItem.Day color="gray">{formatDDay(todo.dueDate)}</TodoItem.Day>
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
