"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Icon } from "@/components/common/Icon";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { goalQueries } from "@/features/goal/query/goal.queryKey";
import { useTeamId } from "@/features/team/hooks/useTeamId";
import { teamQueries } from "@/features/team/query/team.queryKey";
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
  const goalId = useGoalId();
  const teamId = useTeamId();
  const {
    data: { goalName },
  } = useSuspenseQuery(goalQueries.getSummary(goalId));

  const {
    data: { teamName },
  } = useSuspenseQuery(teamQueries.summary(teamId));

  const { openTodoDeleteModal } = useTodoDeleteModal();
  const { openTodoDetailModal } = useTodoDetailModal({
    todo,
    goalName,
    teamName,
  });

  return (
    <li
      className="flex w-full items-center justify-between px-3 py-[10px]"
      onClick={openTodoDetailModal}
    >
      <div className="flex min-w-0 flex-1 items-center justify-start gap-2">
        <TodoStatusSelect todo={todo} />
        <TodoItem.Name>{todo.title}</TodoItem.Name>
        {/* @TODO: DDay  */}
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
