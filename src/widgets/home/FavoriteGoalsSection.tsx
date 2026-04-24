"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { FavoriteGoalItem } from "@/entities/goal/types/favorite.types";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll/useInfiniteScroll";
import Button from "@/shared/ui/Button/Button/Button";
import { Icon } from "@/shared/ui/Icon";
import { Spacing } from "@/shared/ui/Spacing";
import { FavoriteGoalsItem } from "@/widgets/home/FavoriteGoalsItem";
import { mainInfiniteQueries } from "@/widgets/home/query/mainInfiniteQueries";

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

  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollByItem = (direction: "left" | "right") => {
    const container = listRef.current;
    if (!container) return;

    const track = container.firstElementChild as HTMLElement;
    if (!track) return;

    const firstItem = track.firstElementChild as HTMLElement;
    if (!firstItem) return;

    const gap = 16;
    const move = firstItem.offsetWidth + gap;

    container.scrollBy({
      left: direction === "right" ? move : -move,
      behavior: "smooth",
    });
  };

  const updateScrollState = () => {
    const container = listRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    updateScrollState(); // 초기값 설정

    container.addEventListener("scroll", updateScrollState);
    return () => container.removeEventListener("scroll", updateScrollState);
  }, []);

  // useEffect(() => {
  //   const handleFavoriteToggled = () => {
  //     queryClient.invalidateQueries({ queryKey: ["favoriteGoals"] });
  //   };

  //   // @TODO: entities에 정의되어있던 부분 제거 > features로 이동 예정
  //   window.addEventListener("goal-favorite-toggled", handleFavoriteToggled);
  //   return () => {
  //     window.removeEventListener(
  //       "goal-favorite-toggled",
  //       handleFavoriteToggled,
  //     );
  //   };
  // }, [queryClient]);

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
    <div className="relative w-full max-w-full min-w-0">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByItem("left")}
          className="bg-background-normal border-background-elevated-normal-alternative absolute top-1/2 left-3 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border p-2"
        >
          <Icon
            name="RightArrow"
            size={25}
            className="rotate-180"
          />
        </button>
      )}

      <div
        ref={listRef}
        className="w-full min-w-0 overflow-x-auto overflow-y-hidden overscroll-x-contain"
      >
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

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByItem("right")}
          className="bg-background-normal border-background-elevated-normal-alternative absolute top-1/2 right-3 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border p-2"
        >
          <Icon
            name="RightArrow"
            size={25}
          />
        </button>
      )}
    </div>
  );
}
