import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "next/navigation";
import { Suspense } from "react";

import { useGoalActions } from "@/features/goal/hooks/useGoalActions";

import { GoalInfo } from "./GoalInfo";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/features/goal/hooks/useGoalActions", () => ({
  useGoalActions: jest.fn(),
}));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <svg data-testid={`icon-${name}`} />,
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUseGoalActions = useGoalActions as jest.MockedFunction<
  typeof useGoalActions
>;

const mockSummary = {
  goalId: 1,
  goalName: "디자인 시스템 완성",
  dueDate: "2026-12-31",
  dDay: 42,
  progressPercent: 68,
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

describe("GoalInfo", () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({
      goalId: "1",
    } as ReturnType<typeof useParams>);

    mockUseGoalActions.mockReturnValue({
      openEditModal: jest.fn(),
      openDeleteConfirm: jest.fn(),
      isMutationPending: false,
    });
  });

  const renderGoalInfo = () => {
    const queryClient = makeQueryClient();
    queryClient.setQueryData(["goal", "1", "summary"], mockSummary);
    return render(<GoalInfo />, { wrapper: createWrapper(queryClient) });
  };

  test("목표 이름과 마감일을 렌더링한다", () => {
    renderGoalInfo();

    expect(screen.getByText("디자인 시스템 완성")).toBeInTheDocument();
    expect(screen.getByText("2026-12-31 까지")).toBeInTheDocument();
  });

  test("D-Day 배지를 렌더링한다", () => {
    renderGoalInfo();

    expect(screen.getByText("D-42")).toBeInTheDocument();
  });

  describe("목표 옵션 메뉴", () => {
    test("케밥 버튼 클릭 시 옵션 메뉴가 열린다", async () => {
      renderGoalInfo();

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();

      await userEvent.click(screen.getByRole("button", { name: "목표 옵션" }));

      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    test("열린 메뉴에서 케밥 버튼 재클릭 시 메뉴가 닫힌다", async () => {
      renderGoalInfo();

      const kebabButton = screen.getByRole("button", { name: "목표 옵션" });
      await userEvent.click(kebabButton);
      await userEvent.click(kebabButton);

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    test("목표 수정 클릭 시 openEditModal이 호출된다", async () => {
      const openEditModal = jest.fn();
      mockUseGoalActions.mockReturnValue({
        openEditModal,
        openDeleteConfirm: jest.fn(),
        isMutationPending: false,
      });
      renderGoalInfo();

      await userEvent.click(screen.getByRole("button", { name: "목표 옵션" }));
      await userEvent.click(
        screen.getByRole("menuitem", { name: "목표 수정" }),
      );

      expect(openEditModal).toHaveBeenCalledTimes(1);
    });

    test("목표 삭제 클릭 시 openDeleteConfirm이 호출된다", async () => {
      const openDeleteConfirm = jest.fn();
      mockUseGoalActions.mockReturnValue({
        openEditModal: jest.fn(),
        openDeleteConfirm,
        isMutationPending: false,
      });
      renderGoalInfo();

      await userEvent.click(screen.getByRole("button", { name: "목표 옵션" }));
      await userEvent.click(
        screen.getByRole("menuitem", { name: "목표 삭제" }),
      );

      expect(openDeleteConfirm).toHaveBeenCalledTimes(1);
    });

    test("mutation 진행 중일 때 케밥 버튼이 비활성화된다", () => {
      mockUseGoalActions.mockReturnValue({
        openEditModal: jest.fn(),
        openDeleteConfirm: jest.fn(),
        isMutationPending: true,
      });
      renderGoalInfo();

      expect(screen.getByRole("button", { name: "목표 옵션" })).toBeDisabled();
    });
  });
});
