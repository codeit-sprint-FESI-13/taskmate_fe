import { apiClient } from "@/shared/lib/api/client";

import {
  NotificationListSuccessResponse,
  NotificationReadAllSuccessResponse,
  NotificationReadSuccessResponse,
  NotificationSSETokenSuccessResponse,
} from "./types";

type GetParams = {
  cursorId?: number;
  cursorCreatedAt?: string;
  size?: number;
};

const SSE_BASE_URL = (process.env.NEXT_PUBLIC_SSE_BASE_URL ?? "").replace(
  /\/$/,
  "",
);

const SSE_STREAM_URL = SSE_BASE_URL
  ? `${SSE_BASE_URL}/api/notifications/stream`
  : "/api/notifications/stream";

export const NotificationApi = {
  // 내 알림 목록 조회 (커서)
  get: (params?: GetParams) =>
    apiClient.get<NotificationListSuccessResponse>("/api/notifications", {
      params,
    }),

  // SSE 토큰 발급
  issueSseToken: () =>
    apiClient.post<NotificationSSETokenSuccessResponse>(
      "/api/notifications/sse-token",
    ),

  // SSE 구독
  subscribe: async (onNotify: () => void) => {
    const tokenRes = await NotificationApi.issueSseToken();
    const sseToken = tokenRes.data.sseToken;
    const streamUrl = `${SSE_STREAM_URL}?sseToken=${encodeURIComponent(sseToken)}`;

    const es = new EventSource(streamUrl);

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
