import { apiClient } from "@/lib/api/client";

import {
  NotificationListSuccessResponse,
  NotificationReadAllSuccessResponse,
  NotificationReadSuccessResponse,
} from "./types";

type GetParams = {
  cursorId?: number;
  cursorCreatedAt?: string;
  size?: number;
};

export const NotificationApi = {
  // 내 알림 목록 조회 (커서)
  get: (params?: GetParams) =>
    apiClient.get<NotificationListSuccessResponse>("/api/notifications", {
      params,
    }),

  // SSE 구독
  subscribe: (onNotify: () => void) => {
    const es = new EventSource("/api/notifications/stream", {
      withCredentials: true,
    });

    es.addEventListener("NOTIFICATION", () => {
      onNotify(); // 그냥 get 다시 호출
    });

    return () => es.close();
  },

  // 알림 단건 읽음 처리
  read: (id: number) =>
    apiClient.patch<NotificationReadSuccessResponse>(
      `/api/notifications/${id}/read`,
    ),

  // 알림 전체 읽음 처리
  readAll: () =>
    apiClient.patch<NotificationReadAllSuccessResponse>(
      "/api/notifications/read-all",
    ),
};
