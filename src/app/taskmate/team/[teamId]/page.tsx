import AsyncBoundary from "@/components/common/AsyncBoundary";
import { GoalList } from "@/components/team/GoalList";
import { MemberList } from "@/components/team/MemberList";
import { Summary } from "@/components/team/Summary";

export default function Page() {
  return (
    <div className="mx-auto w-full space-y-6 p-6">
      {/* @TODO: Loading & Error 처리 */}
      <AsyncBoundary
        loadingFallback={<div>Loading...</div>}
        errorFallback={<div>Error</div>}
      >
        <Summary />
      </AsyncBoundary>

      {/* @TODO: Loading & Error 처리 */}
      <AsyncBoundary
        loadingFallback={<div>Loading...</div>}
        errorFallback={<div>Error</div>}
      >
        <GoalList />
      </AsyncBoundary>

      {/* @TODO: Loading & Error 처리 */}
      <AsyncBoundary
        loadingFallback={<div>Loading...</div>}
        errorFallback={<div>Error</div>}
      >
        <MemberList />
      </AsyncBoundary>
    </div>
  );
}
