"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { goalQueryOptions } from "@/entities/goal";
import { useGoalActions } from "@/features/goal/hooks/useGoalActions";
import { useGoalId } from "@/features/goal/hooks/useGoalId";
import { useOptionalTeamId } from "@/features/team/hooks/useOptionalTeamId";
import { Icon } from "@/shared/ui/Icon";
import { cn } from "@/shared/utils/styles/cn";

export function GoalInfo() {
  const goalId = useGoalId();
  const teamId = useOptionalTeamId();

  const [optionOpen, setOptionOpen] = useState(false);

  const { data: summary } = useSuspenseQuery(
    goalQueryOptions.getSummary(goalId),
  );

  const { openEditModal, openDeleteConfirm, isMutationPending } =
    useGoalActions({
      goalId,
      teamId,
      summary,
      onMenuClose: () => setOptionOpen(false),
    });

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

        <GoalOptionMenu
          isOpen={optionOpen}
          isPending={isMutationPending}
          onToggle={() => setOptionOpen((prev) => !prev)}
          onEdit={openEditModal}
          onDelete={openDeleteConfirm}
        />
      </div>
    </div>
  );
}

// --- internal component ---

type GoalOptionMenuProps = {
  isOpen: boolean;
  isPending: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const GOAL_ACTIONS: { key: "edit" | "delete"; label: string }[] = [
  { key: "edit", label: "목표 수정" },
  { key: "delete", label: "목표 삭제" },
];

function GoalOptionMenu({
  isOpen,
  isPending,
  onToggle,
  onEdit,
  onDelete,
}: GoalOptionMenuProps) {
  const handleAction = (key: "edit" | "delete") => {
    if (key === "edit") onEdit();
    else onDelete();
  };

  return (
    <div
      className={cn(
        "absolute top-7 right-5 shrink-0",
        "desktop:top-[60px] desktop:right-8",
      )}
    >
      <button
        type="button"
        className="flex cursor-pointer items-center justify-center rounded-lg p-1 hover:bg-gray-100"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="목표 옵션"
        disabled={isPending}
        onClick={onToggle}
      >
        <Icon
          name="Kebab"
          size={24}
          className="text-gray-300"
        />
      </button>

      {isOpen && (
        <ul
          role="menu"
          aria-label="목표 옵션"
          className="absolute top-full right-0 z-20 mt-2 w-max rounded-2xl border border-gray-200 bg-white px-2 py-1 shadow-sm"
        >
          {GOAL_ACTIONS.map(({ key, label }) => (
            <li
              key={key}
              className="rounded-xl"
            >
              <button
                type="button"
                role="menuitem"
                disabled={isPending}
                className={cn(
                  "group w-full cursor-pointer rounded-xl px-3 py-2 text-center hover:bg-blue-800",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                )}
                onClick={() => handleAction(key)}
              >
                <span className="typography-body-2 font-semibold text-gray-500 group-hover:text-white">
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
