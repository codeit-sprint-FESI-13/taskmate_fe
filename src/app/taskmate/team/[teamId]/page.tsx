"use client";

import { GoalList } from "@/components/team/GoalList";
import { MemberList } from "@/components/team/MemberList";
import { Summary } from "@/components/team/Summary";
import AsyncBoundary from "@/shared/ui/AsyncBoundary";

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
