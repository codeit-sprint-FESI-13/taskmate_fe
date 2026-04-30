import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";

import Summary from "./Summary";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    alt,
    src,
    ...props
  }: {
    alt: string;
    src: string;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      src={typeof src === "object" ? "mock.png" : src}
      {...props}
    />
  ),
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

const mockSummary = {
  teamId: 1,
  teamName: "프론트엔드 1팀",
  isAdmin: true,
  todayProgressPercent: 70,
  todayTodoCount: 10,
  overdueTodoCount: 2,
  doneTodoCount: 8,
};

const makeQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

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

describe("Summary", () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ teamId: "1" } as ReturnType<
      typeof useParams
    >);
    mockUseRouter.mockReturnValue({ push: jest.fn() } as unknown as ReturnType<
      typeof useRouter
    >);
  });

  const renderSummary = (data = mockSummary) => {
    const queryClient = makeQueryClient();
    queryClient.setQueryData(["team", "1", "summary"], data);
    return render(<Summary />, { wrapper: createWrapper(queryClient) });
  };

  test("팀 이름을 렌더링한다", () => {
    renderSummary();

    expect(screen.getByText("프론트엔드 1팀")).toBeInTheDocument();
  });

  test("오늘의 진행률, 할 일 수, 밀린 할 일, 완료한 일을 표시한다", () => {
    renderSummary();

    expect(screen.getByText("70")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  describe("관리자 여부", () => {
    test("isAdmin이 true일 때 설정 버튼이 표시된다", () => {
      renderSummary({ ...mockSummary, isAdmin: true });

      expect(screen.getByAltText("설정")).toBeInTheDocument();
    });

    test("isAdmin이 false일 때 설정 버튼이 표시되지 않는다", () => {
      renderSummary({ ...mockSummary, isAdmin: false });

      expect(screen.queryByAltText("설정")).not.toBeInTheDocument();
    });
  });
});
