import { MainHeroProgressCard } from "@/components/main/MainHeroProgressCard";
import { MainSecondaryProgressCard } from "@/components/main/MainSecondaryProgressCard";

export default function MainPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* 히어로 카드: 할 일 개수만 넘기면 퍼센트 자동 계산 */}
      <MainHeroProgressCard
        title="프론트엔드 1팀"
        todoCount={10}
        completedCount={8}
        color="green"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MainSecondaryProgressCard
          title="디자인시스템"
          progress={86}
          color="green"
        />

        <MainSecondaryProgressCard
          title="컴포넌트 QA"
          progress={62}
          color="blue"
        />
      </div>
    </div>
  );
}
