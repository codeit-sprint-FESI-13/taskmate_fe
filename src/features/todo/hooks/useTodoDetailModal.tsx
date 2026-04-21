"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

import defaultAvatar from "@/assets/images/avatar.png";
import { goalQueries } from "@/entities/goal/api/query/goal.queryKey";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { teamQueries } from "@/features/team/query/team.queryKey";
import { useOverlay } from "@/hooks/useOverlay";
import Button from "@/shared/ui/Button/Button/Button";
import { Icon } from "@/shared/ui/Icon";
import { Modal } from "@/shared/ui/Modal";

import { Todo } from "../../../entities/todo/types/types";

const TODO_DETAIL_MODAL_ID = "todo-detail-modal";

interface TodoDetailModalProps {
  onClose: () => void;
  todo: Todo;
  goalName: string;
  teamName: string;
}

const TodoDetailModal = ({
  onClose,
  todo,
  goalName,
  teamName,
}: TodoDetailModalProps) => {
  return (
    <Modal.Root onClose={onClose}>
      <Modal.Backdrop />
      <div className="relative z-10 flex w-full max-w-[488px] flex-col items-start gap-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex w-fit items-center justify-start gap-[6px]">
          <h2 className="typography-heading-2 font-semibold">{todo.title}</h2>
          <span className="typography-label-2 rounded-lg bg-gray-100 px-[10px] py-1 font-semibold text-gray-400">
            {teamName}
          </span>
        </div>

        <div className="mt-2 grid grid-cols-[100px_1fr] gap-x-4 gap-y-3">
          <div className="flex items-center justify-start gap-[6px]">
            <Icon
              name="Flag"
              size={16}
              className="text-gray-400"
            />
            <span className="typography-label-1 font-medium text-gray-400">
              목표
            </span>
          </div>
          <span className="typography-label-1 text-label-neutral font-medium">
            {goalName}
          </span>

          <div className="flex items-center justify-start gap-[6px]">
            <Icon
              name="Calendar"
              size={16}
              className="text-gray-400"
            />
            <span className="typography-label-1 font-medium text-gray-400">
              시작 날짜
            </span>
          </div>
          <span className="typography-label-1 text-label-neutral font-medium">
            {todo.startDate}
          </span>

          <div className="flex items-center justify-start gap-[6px]">
            <Icon
              name="Calendar"
              size={16}
              className="text-gray-400"
            />
            <span className="typography-label-1 font-medium text-gray-400">
              마감 날짜
            </span>
          </div>
          <span className="typography-label-1 text-label-neutral font-medium">
            {todo.dueDate}
          </span>
        </div>

        <div className="flex w-full flex-col items-start gap-[5px]">
          <h3 className="typography-body-2 font-semibold">담당자</h3>
          <div className="flex max-h-[120px] w-full flex-wrap items-start justify-start gap-4 overflow-y-scroll rounded-2xl border border-gray-300 px-4 py-3">
            {todo.assignees.map((assignee) => (
              <div
                key={assignee.userId}
                className="flex shrink-0 items-center gap-1"
              >
                <Image
                  src={defaultAvatar.src}
                  alt="Avatar Image"
                  width={32}
                  height={32}
                  className="shrink-0 rounded-full object-cover"
                />
                <span className="typography-label-1 shrink-0 font-semibold">
                  {assignee.nickname}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-[5px]">
          <h3 className="typography-body-2 font-semibold">메모</h3>
          <div className="flex max-h-[120px] w-full flex-wrap items-start justify-start gap-4 overflow-y-scroll rounded-2xl border border-gray-300 px-4 py-3">
            <span className="typography-body-2 text-label-normal">
              {todo.memo}
            </span>
          </div>
        </div>

        <Button
          size="xl"
          className="mt-2 w-full"
          onClick={onClose}
        >
          닫기
        </Button>
      </div>
    </Modal.Root>
  );
};

export const useTodoDetailModal = ({ todo }: { todo: Todo }) => {
  const overlay = useOverlay();
  const params = useParams<{ teamId?: string }>();
  const teamId = params.teamId;

  const goalId = useGoalId();
  const {
    data: { goalName },
  } = useSuspenseQuery(goalQueries.getSummary(goalId));
  const { data: teamSummary } = useQuery({
    ...teamQueries.summary(teamId ?? ""),
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
