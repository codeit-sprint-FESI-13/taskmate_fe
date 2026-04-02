"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input";
import { Modal } from "@/components/common/Modal";
import { Spacing } from "@/components/common/Spacing";
import { AssigneeSelect } from "@/components/todo/AssigneeSelect";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { goalQueries } from "@/features/goal/query/goal.queryKey";
import { teamQueries } from "@/features/team/query/team.queryKey";
import { Member } from "@/features/team/types";
import { useOverlay } from "@/hooks/useOverlay";

import { useCreateTodoForm } from "./useCreateTodoForm";

const TODO_CREATE_MODAL_ID = "todo-create-modal";

// @TODO: 할일 생성 실패 시, 처리 빠짐
// @TODO: 멤버 리스트 가져와서 처리하기 ( 효진님 작업 이후 )
const TodoCreateModal = ({
  onClose,
  goalName,
  teamName,
}: {
  onClose: () => void;
  goalName: string;
  teamName: string;
}) => {
  const goalId = useGoalId();

  const memberList: Member[] = [];

  const {
    assigneeIds,
    setAssigneeIds,
    startDate,
    handleStartDateChange,
    handleSubmit,
    isPending,
  } = useCreateTodoForm({
    goalId,
    onSuccess: onClose,
  });

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Backdrop />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex max-h-[90vh] w-full max-w-[488px] flex-col items-start overflow-y-scroll rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="flex w-fit items-center justify-start gap-[6px]">
          <h2 className="typography-heading-2 font-semibold">{goalName}</h2>
          <span className="typography-label-2 rounded-lg bg-gray-100 px-[10px] py-1 font-semibold text-gray-400">
            {teamName}
          </span>
        </div>

        <Spacing size={32} />

        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              목표
            </label>
            <div className="w-full">
              <Input
                variant="disabled"
                type="text"
                name="goal"
                className="w-full"
                value={goalName}
                disabled
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              제목 <span className="typography-body-2 text-red-normal">*</span>
            </label>
            <div className="w-full">
              <Input
                type="text"
                name="title"
                className="w-full"
                placeholder="할 일 제목을 입력해주세요"
                required
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              시작 날짜
              <span className="typography-body-2 text-red-normal">*</span>
            </label>
            <div className="w-full">
              <Input
                type="date"
                name="startDate"
                className="w-full"
                placeholder="시작 날짜를 선택해주세요"
                value={startDate}
                onChange={handleStartDateChange}
                required
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              마감 날짜
              <span className="typography-body-2 text-red-normal">*</span>
            </label>
            <div className="w-full">
              <Input
                type="date"
                name="dueDate"
                className="w-full"
                placeholder="마감 날짜를 선택해주세요"
                min={startDate}
                required
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              담당자
            </label>
            <div className="w-full">
              <AssigneeSelect
                members={memberList}
                value={assigneeIds}
                onChange={setAssigneeIds}
                placeholder="담당자를 선택해주세요"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              메모
            </label>
            <div className="w-full">
              <textarea
                name="memo"
                className="h-[120px] w-full resize-none rounded-xl border border-gray-300 p-3"
                placeholder="80자 이내로 입력해주세요"
                maxLength={80}
              />
            </div>
          </div>
        </div>

        <Spacing size={40} />

        <div className="flex w-full items-center justify-between gap-2">
          <button
            type="button"
            className="shadow-[0 0 14px 0 rgba(138, 138, 138, 0.08)] h-[64px] w-full cursor-pointer rounded-full border border-gray-300 px-4 py-3"
            onClick={onClose}
          >
            <span className="typography-body-2 font-semibold text-gray-400">
              취소
            </span>
          </button>
          <Button
            color="gray"
            size="xxl"
            className="w-full"
            type="submit"
            isDisabled={isPending}
          >
            할일 생성
          </Button>
        </div>
      </form>
    </Modal.Root>
  );
};

export const useTodoCreateModal = () => {
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

  const closeTodoCreateModal = () => {
    overlay.close();
  };

  const openTodoCreateModal = () => {
    overlay.open(
      TODO_CREATE_MODAL_ID,
      <TodoCreateModal
        onClose={closeTodoCreateModal}
        goalName={goalName}
        teamName={teamSummary?.teamName ?? "개인"}
      />,
    );
  };

  return {
    openTodoCreateModal,
    closeTodoCreateModal,
  };
};
