"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { goalQueryOptions } from "@/entities/goal";
import { teamQueryOptions } from "@/entities/team";
import type { Todo } from "@/entities/todo";
import { TodoDetailModal } from "@/features/todo/ui/TodoDetailModal/TodoDetailModal";
import { useGoalId } from "@/shared/hooks/useGoalId";
import { useOverlay } from "@/shared/hooks/useOverlay";

const TODO_DETAIL_MODAL_ID = "todo-detail-modal";

export const useTodoDetailModal = ({ todo }: { todo: Todo }) => {
  const overlay = useOverlay();
  const params = useParams<{ teamId?: string }>();
  const teamId = params.teamId;

  const goalId = useGoalId();
  const {
    data: { goalName },
  } = useSuspenseQuery(goalQueryOptions.getSummary(goalId));
  const { data: teamSummary } = useQuery({
    ...teamQueryOptions.summary(teamId ?? ""),
    enabled: Boolean(teamId),
  });

  const closeTodoDetailModal = () => {
    overlay.close();
  };

  const openTodoDetailModal = () => {
    overlay.open(
      TODO_DETAIL_MODAL_ID,
      <TodoDetailModal
        onClose={closeTodoDetailModal}
        todo={todo}
        goalName={goalName}
        teamName={teamSummary?.teamName ?? "개인"}
      />,
    );
  };

  return {
    openTodoDetailModal,
    closeTodoDetailModal,
  };
};
