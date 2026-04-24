"use client";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import type { Todo, TodoStatus } from "@/entities/todo/types/types";
import { usePatchTodoStatusMutation } from "@/features/todo/mutation/usePatchTodoStatusMutation";
import { useDropdown } from "@/shared/hooks/useDropdown";
import { Icon } from "@/shared/ui/Icon";

const todoStatusBadgeVariants = cva(
  "flex items-center gap-[6px] rounded-full px-[10px] py-1",
  {
    variants: {
      status: {
        TODO: "bg-blue-100 text-blue-800",
        DOING: "bg-amber-100 text-amber-800",
        DONE: "bg-emerald-100 text-emerald-800",
      },
    },
    defaultVariants: {
      status: "TODO",
    },
  },
);

export const TodoStatusBadge = ({
  status,
}: VariantProps<typeof todoStatusBadgeVariants>) => {
  return (
    <div className={todoStatusBadgeVariants({ status })}>
      <Icon
        name="Dot"
        size={6}
        className="shrink-0"
      />
      <span className="typography-body-2 font-semibold">{status}</span>
    </div>
  );
};

const STATUS_OPTIONS = [
  "TODO",
  "DOING",
  "DONE",
] as const satisfies readonly TodoStatus[];

interface TodoStatusSelectProps {
  todo: Todo;
}

export const TodoStatusSelect = ({ todo }: TodoStatusSelectProps) => {
  const { isOpen, selected, toggle, selectItem, containerRef } = useDropdown(
    [...STATUS_OPTIONS],
    todo.status,
  );

  const { mutate: patchTodoStatus, isPending } = usePatchTodoStatusMutation();

  const currentStatus = (selected || todo.status) as TodoStatus;

  const handleSelect = (value: string) => {
    if (isPending) return;

    const nextStatus = value as TodoStatus;
    selectItem(value);

    patchTodoStatus({
      goalId: todo.goalId.toString(),
      todoId: todo.id.toString(),
      todoData: {
        title: todo.title,
        startDate: todo.startDate,
        dueDate: todo.dueDate,
        status: nextStatus,
        memo: todo.memo,
        assigneeIds: todo.assignees.map((assignee) => assignee.userId),
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1"
        onClick={toggle}
      >
        <TodoStatusBadge status={currentStatus} />
      </button>

      {isOpen && (
        <ul className="absolute left-0 z-20 mt-1 min-w-[88px] rounded-xl border border-gray-200 bg-white py-1 shadow-sm">
          {STATUS_OPTIONS.map((option) => (
            <li key={option}>
              <button
                type="button"
                className="w-full px-3 py-2"
                onClick={() => handleSelect(option)}
                disabled={isPending}
              >
                <TodoStatusBadge status={option} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
