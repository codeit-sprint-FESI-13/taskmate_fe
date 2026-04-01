import AsyncBoundary from "@/components/common/AsyncBoundary";
import { GoalList } from "@/components/team/GoalList";
import { MemberList } from "@/components/team/MemberList";
import { Summary } from "@/components/team/Summary";

export default function Page() {
  return (
    <div className="flex flex-col gap-10">
      {/* @TODO: Loading & Error 처리 */}
      <AsyncBoundary>
        <Summary />
      </AsyncBoundary>

      {/* @TODO: Loading & Error 처리 */}
      <AsyncBoundary>
        <GoalList />
      </AsyncBoundary>

      {/* @TODO: Loading & Error 처리 */}
      <AsyncBoundary>
        <MemberList />
      </AsyncBoundary>
    </div>
  );
}
