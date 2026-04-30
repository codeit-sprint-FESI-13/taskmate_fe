"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { userQueries } from "@/entities/auth/query/user.queryKey";
import { useToast } from "@/shared/hooks/useToast";

import { NotificationApi } from "./api";

const SSE_BASE_URL = (process.env.NEXT_PUBLIC_SSE_BASE_URL ?? "").replace(
  /\/$/,
  "",
);

const SSE_STREAM_URL = SSE_BASE_URL
  ? `${SSE_BASE_URL}/api/notifications/stream`
  : "/api/notifications/stream";

export function useNotificationSSE() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const esRef = useRef<EventSource | null>(null);
  const timerRef = useRef<number | null>(null);

  const { data: me, status } = useQuery({
    ...userQueries.myInfo(),
    retry: false,
  });

  const isLogin = status === "success" && !!me;

  useEffect(() => {
    if (!isLogin) return;

    let unmounted = false;
    let connectAttempts = 0;
    const MAX_CONNECT_ATTEMPTS = 3;

    const clear = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      esRef.current?.close();
      esRef.current = null;
    };

    const connect = async () => {
      if (unmounted) return;
      if (connectAttempts >= MAX_CONNECT_ATTEMPTS) return;
      connectAttempts += 1;

      try {
        const tokenRes = await NotificationApi.issueSseToken();
        const sseToken = tokenRes.data.sseToken;
        const streamUrl = `${SSE_STREAM_URL}?sseToken=${encodeURIComponent(sseToken)}`;

        const es = new EventSource(streamUrl);
        esRef.current = es;

        es.addEventListener("NOTIFICATION", () => {
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
          toast({ title: "새로운 알림이 도착하였습니다." });
        });

        es.onerror = async () => {
          clear();
          if (connectAttempts >= MAX_CONNECT_ATTEMPTS) return;
          try {
            // 401 등 인증 문제 시 BFF 재발급 트리거
            await queryClient.fetchQuery(userQueries.myInfo());
            await connect(); // 복구 성공 -> 재구독
          } catch {
            timerRef.current = window.setTimeout(() => {
              void connect();
            }, 2000); // 재시도
          }
        };
      } catch {
        timerRef.current = window.setTimeout(() => {
          void connect();
        }, 2000);
      }
    };

    void connect();

    return () => {
      unmounted = true;
      clear();
    };
  }, [isLogin, queryClient]);
}
