"use client";

import AsyncBoundary from "@/shared/ui/AsyncBoundary";
import { GoalList } from "@/widgets/team/GoalList";
import { MemberList } from "@/widgets/team/MemberList";
import { Summary } from "@/widgets/team/Summary";

export default function Page() {
  return (
    <div className="mobile:py-8 flex flex-col gap-10 px-6 pt-[88px]">
      <AsyncBoundary
        loadingFallback={<Summary.Loading />}
        errorFallback={(error, onReset) => (
          <Summary.Error
            error={error}
            onReset={onReset}
          />
        )}
      >
        <Summary />
      </AsyncBoundary>

      <AsyncBoundary
        loadingFallback={<GoalList.Loading />}
        errorFallback={(error, onReset) => (
          <GoalList.Error
            error={error}
            onReset={onReset}
          />
        )}
      >
        <GoalList />
      </AsyncBoundary>

      <AsyncBoundary
        loadingFallback={<MemberList.Loading />}
        errorFallback={(error, onReset) => (
          <MemberList.Error
            error={error}
            onReset={onReset}
          />
        )}
      >
        <MemberList />
      </AsyncBoundary>
    </div>
  );
}
