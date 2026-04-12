"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon";
import { Spacing } from "@/components/common/Spacing";
import { FavoriteGoalsItem } from "@/components/home/FavoriteGoalsItem";
import { mainInfiniteQueries } from "@/features/home/query/mainInfiniteQueries";
import { FavoriteGoalItem } from "@/features/home/types";
// import { teamQueries } from "@/features/team/query/team.queryKey";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll/useInfiniteScroll";

export function FavoriteGoalsSection() {
  const router = useRouter();

  const { ref, data, isFetchingNextPage } = useInfiniteScroll(
    mainInfiniteQueries.favoriteGoalsInfinite(),
  );

  const items = data.pages.flatMap((page) =>
    page.items.map((item: FavoriteGoalItem) => ({
      teamId: item.teamId,
      teamName: item.teamName,
      goal: {
        goalId: item.goalId,
        goalName: item.goalName,
        progressPercent: item.progressPercent,
        isFavorite: item.isFavorite,
        createdAt: item.createdAt,
      },
    })),
  );

  // 팀 리스트 가져오기
  // const { data: teamList } = useSuspenseQuery(teamQueries.all());
  // const items = teamList.flatMap((team) =>
  //   team.goals.map((goal) => ({
  //     teamId: team.teamId,
  //     teamName: team.teamName,
  //     goal,
  //   })),
  // );

  // 여기에 useInfiniteScroll

  // 데이터 안전성: teamList가 null/undefined이면 flatMap에서 바로 에러가 납니다. 그런 경우가 가능하다면 const items = (teamList ?? []).flatMap(...)처럼 기본값 넣기

  if (items.length === 0) {
    return (
      <div className="flex h-52.5 w-full flex-col items-center justify-center gap-1 rounded-4xl bg-white">
        <span className="typography-heading-2 text-gray-500">
          중요한 할일을 즐겨찾기 해주세요
        </span>
        <Spacing size={16} />
        <Button
          onClick={() => {
            router.push("/taskmate/team/create");
          }}
        >
          <div className="flex items-center gap-2">
            <Icon
              name="Plus"
              size={16}
            />
            <span className="typography-label-1 font-semibold text-white">
              팀 만들기
            </span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full min-w-0">
      <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden overscroll-x-contain">
        <div className="inline-flex w-full flex-nowrap gap-4 pb-2">
          {items.map(({ teamId, teamName, goal }) => (
            <FavoriteGoalsItem
              key={`${teamId}-${goal.goalId}`}
              teamId={teamId}
              teamName={teamName}
              goal={goal}
            />
          ))}
        </div>

        {/* 트리거 */}
        <div ref={ref} />

        {/* 로딩 UI */}
        {isFetchingNextPage && <p>불러오는 중...</p>}
      </div>
    </div>
  );
}
