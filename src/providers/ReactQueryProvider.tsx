"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"; // isServer 추가
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

let browserQueryClient: QueryClient | undefined;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1분 동안 데이터를 fresh로 간주 → 불필요한 리페치 방지
        retry: 1, // 실패 시 1번만 재시도 (기본값 3은 너무 많음)
        throwOnError: true, // 에러를 ErrorBoundary로 던짐
      },
      mutations: {
        throwOnError: true, // mutation 에러도 ErrorBoundary로 던짐
      },
    },
  });
}

function getQueryClient() {
  if (isServer) {
    // 서버: 요청마다 새 인스턴스 생성 (요청 간 데이터 누수 방지)
    return makeQueryClient();
  }
  // 브라우저: 싱글톤 유지 (캐시 재사용)
  // useState 대신 이 패턴을 쓰는 이유
  // React가 Suspense 중 초기 렌더를 버리면 useState는 클라이언트가 사라지기 때문
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function ReactQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />{" "}
      {/* 개발 환경에서만 표시됨 */}
    </QueryClientProvider>
  );
}
