import { infiniteQueryOptions } from "@tanstack/react-query";

import { goalQueryOptions } from "@/entities/goal";
import { todoApi } from "@/entities/todo";
import { STALE_TIME } from "@/shared/constants/query/staleTime";

type InfiniteScrollCursorParams = {
  size?: number;
  cursorId?: number;
  cursorCreatedAt?: string;
  cursorDueDate?: string;
};

export const homeQueryOptions = {
  favoriteGoalsInfinite: () => goalQueryOptions.getFavoriteGoalListInfinite(),

  recentInfiniteOptions: () =>
    infiniteQueryOptions({
      queryKey: ["recent"],
      queryFn: async ({
        pageParam,
      }: {
        pageParam: InfiniteScrollCursorParams;
      }) => {
        const response = await todoApi.getRecent(pageParam);
        return response.data;
      },
      initialPageParam: { size: 20 } as InfiniteScrollCursorParams,
      getNextPageParam: (lastPage): InfiniteScrollCursorParams | undefined =>
        lastPage.hasNext
          ? {
              size: 20,
              cursorId: lastPage.nextCursorId ?? undefined,
              cursorCreatedAt: lastPage.nextCursorCreatedAt ?? undefined,
            }
          : undefined,
      staleTime: STALE_TIME.DEFAULT,
    }),

  dueSoonInfiniteOptions: () =>
    infiniteQueryOptions({
      queryKey: ["dueSoon"],
      queryFn: async ({
        pageParam,
      }: {
        pageParam: InfiniteScrollCursorParams;
      }) => {
        const response = await todoApi.getDueSoon(pageParam);
        return response.data;
      },
      initialPageParam: { size: 20 } as InfiniteScrollCursorParams,
      getNextPageParam: (lastPage): InfiniteScrollCursorParams | undefined =>
        lastPage.hasNext
          ? {
              size: 20,
              cursorId: lastPage.nextCursorId ?? undefined,
              cursorDueDate: lastPage.nextCursorDueDate ?? undefined,
            }
          : undefined,
      staleTime: STALE_TIME.DEFAULT,
    }),
};
