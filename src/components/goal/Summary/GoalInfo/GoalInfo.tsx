"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { useDeleteGoalMutation } from "@/features/goal/mutation/useDeleteGoalMutation";
import { useUpdateGoalMutation } from "@/features/goal/mutation/useUpdateGoalMutation";
import { goalQueries } from "@/features/goal/query/goal.queryKey";
import { useOverlay } from "@/hooks/useOverlay";
import { cn } from "@/utils/utils";

import { GoalEditModal } from "./GoalEditModal";

const GOAL_ACTIONS = ["목표 수정", "목표 삭제"] as const;
const GOAL_EDIT_MODAL_ID = "goal-edit-modal";
const GOAL_DELETE_MODAL_ID = "goal-delete-confirm-modal";

export function GoalInfo() {
  const goalId = useGoalId();
  const params = useParams();
  const overlay = useOverlay();

  // TeamId가 없는 경우도 있음 ( personal 페이지 )
  const teamId = params.teamId != null ? String(params.teamId) : null;

  const [optionOpen, setOptionOpen] = useState(false);
  const optionRef = useRef<HTMLDivElement>(null);

  const { data: summary } = useSuspenseQuery(goalQueries.getSummary(goalId));

  const deleteMutation = useDeleteGoalMutation({
    goalId,
    teamId,
    onDeleted: () => overlay.close(),
  });

  const updateMutation = useUpdateGoalMutation({
    goalId,
    teamId,
    onUpdated: () => overlay.close(),
  });

  const openEditModal = () => {
    setOptionOpen(false);
    overlay.open(
      GOAL_EDIT_MODAL_ID,
      <GoalEditModal
        initialName={summary.goalName}
        initialDueDate={summary.dueDate}
        onClose={() => overlay.close()}
        isPending={updateMutation.isPending}
        onSave={(input) => updateMutation.mutate(input)}
      />,
    );
  };

  const openDeleteConfirm = () => {
    setOptionOpen(false);
    overlay.open(
      GOAL_DELETE_MODAL_ID,
      <ConfirmModal
        title="목표를 휴지통으로 이동할까요?"
        description="이동한 목표는 휴지통에서 복구하거나 완전히 삭제할 수 있어요."
        confirmLabel="휴지통으로 이동"
        cancelLabel="취소"
        onClose={() => overlay.close()}
        onConfirm={() => deleteMutation.mutate()}
      />,
    );
  };

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-start gap-3 rounded-4xl bg-white p-5",
        "tablet:gap-6",
        "desktop:flex-row desktop:items-center desktop:gap-5 desktop:px-8",
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-200",
          "desktop:mb-[36px]",
        )}
      >
        <Icon
          name="GoalFlag"
          size={30}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
        <span
          className={cn(
            "typography-body-2 w-full truncate font-semibold",
            "tablet:typography-body-1",
            "desktop:typography-title-2",
          )}
        >
          {summary.goalName}
        </span>
        <div
          className={cn(
            "flex items-center justify-start gap-2",
            "tablet:gap-3",
          )}
        >
          <span
            className={cn(
              "typography-label-1 text-label-alternative font-semibold",
              "tablet:typography-body-2",
              "desktop:typography-body-1",
            )}
          >
            {summary.dueDate} 까지
          </span>
          <span className="typography-label-2 text-label-alternative rounded-lg bg-gray-100 px-[10px] py-1 font-semibold">
            D-{summary.dDay}
          </span>
        </div>

        <div
          ref={optionRef}
          className={cn(
            "absolute top-7 right-5 shrink-0",
            "desktop:top-[60px] desktop:right-8",
          )}
        >
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-lg p-1 hover:bg-gray-100"
            aria-expanded={optionOpen}
            aria-haspopup="menu"
            aria-label="목표 옵션"
            onClick={() => setOptionOpen((open) => !open)}
          >
            <Icon
              name="Kebab"
              size={24}
              className="text-gray-300"
            />
          </button>

          {optionOpen && (
            <ul
              role="menu"
              aria-label="목표 옵션"
              className="absolute top-full right-0 z-20 mt-2 w-max rounded-2xl border border-gray-200 bg-white px-2 py-1 shadow-sm"
            >
              {GOAL_ACTIONS.map((label) => (
                <li
                  key={label}
                  role="menuitem"
                  className="group cursor-pointer rounded-xl px-3 py-2 text-center hover:bg-blue-800"
                  onClick={() => {
                    if (label === "목표 수정") openEditModal();
                    else openDeleteConfirm();
                  }}
                >
                  <span className="typography-body-2 font-semibold text-gray-500 group-hover:text-white">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
