import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";

import { userQueries } from "@/entities/auth/query/user.queryKey";

import HeadingContent from "./Content";

const createWrapper = (queryClient: QueryClient) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>loading</div>}>{children}</Suspense>
      </QueryClientProvider>
    );
  }

  return Wrapper;
};

const makeQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe("HeadingContent", () => {
  test("닉네임을 포함한 인사말을 렌더링한다", () => {
    const queryClient = makeQueryClient();
    queryClient.setQueryData(userQueries.myInfo().queryKey, {
      id: 1,
      email: "test@test.com",
      nickname: "테스터",
      profileImageUrl: null,
      provider: "LOCAL",
      createdAt: "2026-01-01T00:00:00Z",
    });

    render(<HeadingContent />, { wrapper: createWrapper(queryClient) });

    expect(screen.getByText("테스터님!")).toBeInTheDocument();
    expect(
      screen.getByText("목표와 할 일을 확인해보세요!"),
    ).toBeInTheDocument();
  });

  test("닉네임이 h1 태그로 렌더링된다", () => {
    const queryClient = makeQueryClient();
    queryClient.setQueryData(userQueries.myInfo().queryKey, {
      id: 2,
      email: "user@test.com",
      nickname: "홍길동",
      profileImageUrl: null,
      provider: "LOCAL",
      createdAt: "2026-01-01T00:00:00Z",
    });

    render(<HeadingContent />, { wrapper: createWrapper(queryClient) });

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "홍길동님!",
    );
  });
});
