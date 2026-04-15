"use client";

import AsyncBoundary from "@/components/common/AsyncBoundary";
import { cn } from "@/utils/utils";

import { GoalInfo } from "./GoalInfo";
import { GoalProgress } from "./GoalProgress";

export default function Summary() {
  return (
    <div
      className={cn(
        "flex w-full flex-col justify-start gap-4",
        "tablet:grid tablet:grid-cols-[55%_45%] tablet:gap-4",
      )}
    >
      <AsyncBoundary
        loadingFallback={<GoalInfo.Loading />}
        errorFallback={(error, onReset) => (
          <GoalInfo.Error
            error={error}
            onReset={onReset}
          />
        )}
      >
        <GoalInfo />
      </AsyncBoundary>
      <AsyncBoundary
        loadingFallback={<GoalProgress.Loading />}
        errorFallback={(error, onReset) => (
          <GoalProgress.Error
            error={error}
            onReset={onReset}
          />
        )}
      >
        <GoalProgress />
      </AsyncBoundary>
    </div>
  );
}
