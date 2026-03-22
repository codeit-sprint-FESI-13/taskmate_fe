import {
  DefaultError,
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";

/**
 * 무한 스크롤 커스텀 훅
 * useSuspenseInfiniteQuery + IntersectionObserver 조합
 *
 * @param options - infiniteQueryOptions로 정의한 쿼리 옵션
 * @returns ref - 리스트 맨 아래 div에 연결, data - 쿼리 데이터, isFetchingNextPage - 다음 페이지 로딩 여부
 *
 * @remarks
 * data 구조:
 * {
 *   pages: [
 *     { goals: [...] },  // 1페이지
 *     { goals: [...] },  // 2페이지
 *   ]
 * }
 * 전체 목록 사용 시 data.pages.flatMap((page) => page.items) 형태로 접근
 *
 * @example
 * const { ref, data, isFetchingNextPage } = useInfiniteScroll(
 *   goalQueries.teamGoalListInfinite(teamId)
 * );
 *
 * return (
 *   <div>
 *     {data.pages.flatMap((page) => page.goals).map((goal) => (
 *       <div key={goal.id}>{goal.title}</div>
 *     ))}
 *     <div ref={ref} />
 *     {isFetchingNextPage && <p>불러오는 중...</p>}
 *   </div>
 * );
 */

export function useInfiniteScroll<
  TQueryFnData,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(
  options: UseSuspenseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >,
) {
  const { hasNextPage, isFetchingNextPage, fetchNextPage, data } =
    useSuspenseInfiniteQuery(options);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        });
      },
      { threshold: 1.0 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref, data, isFetchingNextPage };
}
