import { Icon } from "@/components/common/Icon";
import { MainSecondaryProgressCard } from "@/components/team/MainSecondaryProgressCard";

// @TODO: GET goalList API 및 useSuspenseInfiniteQuery 적용
// @TODO: 목표 목록 조회 시 무한 스크롤 처리
export const GoalList = () => {
  return (
    <div className="flex w-full flex-col items-start gap-5">
      <div className="flex items-center justify-start gap-3">
        <Icon
          name="FlagGreen"
          size={24}
        />
        <h2 className="typography-body-1 text-label-neutral font-medium">
          목표
        </h2>
        <span className="typography-body-1 ml-[-8px] font-medium text-gray-400">
          6개
        </span>
      </div>
      {/* @TODO: order UI */}
      <div></div>
      <div className="grid w-full grid-cols-3 gap-4">
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

        <MainSecondaryProgressCard
          title="디자인시스템"
          progress={86}
          color="green"
        />
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

        <MainSecondaryProgressCard
          title="디자인시스템"
          progress={86}
          color="green"
        />
      </div>
    </div>
  );
};
