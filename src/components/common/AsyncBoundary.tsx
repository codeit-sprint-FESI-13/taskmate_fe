"use client";

import { Component, ReactNode, Suspense } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // state를 업데이트하여 다음 렌더링에 fallback UI가 표시되도록 합니다.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    // commit phase - 로깅 등 side effect 처리
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error, errorInfo.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

interface AsyncBoundaryProps {
  children: ReactNode;
  /** 데이터 로딩 중 보여줄 UI (기본값: "Loading...") */
  loadingFallback?: ReactNode;
  /** 에러 발생 시 보여줄 UI */
  errorFallback?: ReactNode;
}

/**
 * ErrorBoundary + Suspense를 하나로 묶음
 *
 * 렌더링 흐름:
 * 1. 로딩 중  → loadingFallback 표시
 * 2. 에러 발생 → errorFallback 표시
 * 3. 정상     → children 표시
 *
 * 사용 예시:
 * <AsyncBoundary
 *   loadingFallback={<GoalSkeletonPage />}
 *   errorFallback={<GoalErrorPage />}
 * >
 *   <GoalList />
 * </AsyncBoundary>
 *
 * // 2. 에러는 페이지 레벨, 로딩은 컴포넌트 레벨로 분리할 때 (중첩)
 * <AsyncBoundary errorFallback={<GoalErrorPage />}>
 *   <AsyncBoundary loadingFallback={<GoalSkeleton />}>
 *     <GoalList />
 *   </AsyncBoundary>
 * </AsyncBoundary>
 *
 * // 3. 에러/로딩 위치가 다를 때 (ErrorBoundary 분리 사용)
 * <ErrorBoundary fallback={<GoalErrorPage />}>
 *   <Header />
 *   <AsyncBoundary loadingFallback={<GoalSkeleton />}>
 *     <GoalList />
 *   </AsyncBoundary>
 * </ErrorBoundary>
 */

export default function AsyncBoundary({
  children,
  loadingFallback = <div>Loading...</div>,
  errorFallback,
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
