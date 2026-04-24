"use client";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Component, ReactNode, Suspense } from "react";

import Spinner from "../Spinner";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode | ((error: Error, onReset: () => void) => ReactNode);
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 에러 로깅 (Sentry 등)
    this.props.onError?.(error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError && error) {
      return typeof fallback === "function"
        ? fallback(error, this.handleReset)
        : fallback;
    }

    return children;
  }
}

interface AsyncBoundaryProps {
  children: ReactNode;
  /** 데이터 로딩 중 보여줄 UI (기본값: "Loading...") */
  loadingFallback?: ReactNode;
  /** 에러 발생 시 보여줄 UI — `error` 인자로 원인을 받을 수 있습니다. */
  errorFallback?:
    | ReactNode
    | ((error: Error, onReset: () => void) => ReactNode);
}

/**
 * ErrorBoundary + Suspense를 하나로 묶음
 *
 * 렌더링 흐름:
 * 1. 로딩 중  → loadingFallback 표시
 * 2. 에러 발생 → errorFallback 표시
 * 3. 정상     → children 표시
 *
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

export default function BaseAsyncBoundary({
  children,
  loadingFallback = <Spinner size={40} />,
  errorFallback = <div>Error</div>,
}: AsyncBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset: resetQueryErrors }) => (
        <ErrorBoundary
          fallback={
            typeof errorFallback === "function"
              ? (error: Error, boundaryReset: () => void) =>
                  errorFallback(error, () => {
                    resetQueryErrors();
                    boundaryReset();
                  })
              : errorFallback
          }
        >
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
