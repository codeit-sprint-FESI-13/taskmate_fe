import { infiniteQueryOptions } from "@tanstack/react-query";

import { STALE_TIME } from "@/shared/constants/query/staleTime";

import { GetParams, NotificationApi } from "../api/notification.api";

export const notificationQueryOptions = {
  notificationsInfinite: () =>
    infiniteQueryOptions({
      queryKey: ["notifications"],
      queryFn: async ({ pageParam }: { pageParam: GetParams }) => {
        const response = await NotificationApi.get(pageParam);
        return response.data;
      },
      initialPageParam: { size: 20 } as GetParams,
      getNextPageParam: (lastPage): GetParams | undefined =>
        lastPage.hasNext
          ? {
              size: 20,
              cursorId: lastPage.nextCursorId,
              cursorCreatedAt: lastPage.nextCursorCreatedAt,
            }
          : undefined,
      staleTime: STALE_TIME.DEFAULT,
    }),
};
