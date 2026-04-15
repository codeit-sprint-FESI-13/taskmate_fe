"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { userQueries } from "@/constants/queryKeys/user.queryKey";

export function useNotificationSSE() {
  const queryClient = useQueryClient();
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

    const clear = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      esRef.current?.close();
      esRef.current = null;
    };

    const connect = () => {
      if (unmounted) return;

      const es = new EventSource("/api/notifications/stream", {
        withCredentials: true,
      });
      esRef.current = es;

      es.addEventListener("NOTIFICATION", () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      });

      es.onerror = async () => {
        clear();
        try {
          // 401 등 인증 문제 시 BFF 재발급 트리거
          await queryClient.fetchQuery(userQueries.myInfo());
          connect(); // 복구 성공 -> 재구독
        } catch {
          timerRef.current = window.setTimeout(connect, 2000); // 재시도
        } finally {
          clear();
        }
      };
    };

    connect();

    return () => {
      unmounted = true;
      clear();
    };
  }, [isLogin, queryClient]);
}
