import { infiniteQueryOptions } from "@tanstack/react-query";

import {
  getPersonalTrashList,
  getTeamTrashList,
} from "@/features/trash/api/trash.api";

import { STALE_TIME } from "../staleTime";

const SIZE = 20;

export const trashQueries = {
  all: ["trash"] as const,

  personalTrashList: () =>
    infiniteQueryOptions({
      queryKey: [...trashQueries.all, "personal"],
      initialPageParam: 0,
      queryFn: ({ pageParam }: { pageParam: number }) =>
        getPersonalTrashList({ page: pageParam, size: SIZE }),
      getNextPageParam: (lastPage, _, lastPageParam) =>
        lastPage.page < lastPage.totalPages - 1 ? lastPageParam + 1 : undefined,
      staleTime: STALE_TIME.MEDIUM,
    }),

  teamTrashList: (teamId: number) =>
    infiniteQueryOptions({
      queryKey: [...trashQueries.all, "team", teamId],
      initialPageParam: 0,
      queryFn: ({ pageParam }: { pageParam: number }) =>
        getTeamTrashList(teamId, { page: pageParam, size: SIZE }),
      getNextPageParam: (lastPage, _, lastPageParam) =>
        lastPage.page < lastPage.totalPages - 1 ? lastPageParam + 1 : undefined,
      staleTime: STALE_TIME.MEDIUM,
    }),
};
