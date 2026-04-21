import { apiClient } from "@/shared/utils/api/client";

import {
  DueSoonSuccessResponse,
  InfiniteQueryParams,
  RecentSuccessResponse,
} from "../../../../widgets/home/types";

export const recentApi = {
  read: (params: InfiniteQueryParams = {}) =>
    apiClient.get<RecentSuccessResponse>("/api/todos/recent", {
      params,
    }),
};

export const dueSoonApi = {
  read: (params: InfiniteQueryParams = {}) =>
    apiClient.get<DueSoonSuccessResponse>("/api/todos/due-soon", {
      params,
    }),
};
