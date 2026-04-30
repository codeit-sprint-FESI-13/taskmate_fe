import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "next/navigation";

import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

import GoalList from "./GoalList";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@/shared/hooks/useInfiniteScroll", () => ({
  useInfiniteScroll: jest.fn(),
}));

jest.mock("@/widgets/team/MainSecondaryProgressCard", () => ({
  MainSecondaryProgressCard: ({ title }: { title: string }) => (
    <div data-testid="goal-card">{title}</div>
  ),
}));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUseInfiniteScroll = useInfiniteScroll as jest.Mock;

const mockData = {
  pages: [
    {
      items: [
        { goalId: 1, name: "목표 A", progressPercent: 50, isFavorite: false },
        { goalId: 2, name: "목표 B", progressPercent: 80, isFavorite: true },
      ],
      nextCursor: null,
      size: 2,
    },
  ],
  pageParams: [null],
};

describe("GoalList", () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ teamId: "1" } as ReturnType<
      typeof useParams
    >);
    mockUseInfiniteScroll.mockReturnValue({
      ref: { current: null },
      data: mockData,
      isFetchingNextPage: false,
    });
  });

  test("목표 목록을 렌더링한다", () => {
    render(<GoalList />);

    expect(screen.getByText("목표 A")).toBeInTheDocument();
    expect(screen.getByText("목표 B")).toBeInTheDocument();
    expect(screen.getAllByTestId("goal-card")).toHaveLength(2);
  });

  test("총 목표 수를 표시한다", () => {
    render(<GoalList />);

    expect(screen.getByText("2개")).toBeInTheDocument();
  });

  describe("정렬", () => {
    test("기본 정렬이 최신순으로 표시된다", () => {
      render(<GoalList />);

      expect(screen.getByText("최신순")).toBeInTheDocument();
    });

    test("정렬 버튼 클릭 시 정렬 옵션 목록이 열린다", async () => {
      render(<GoalList />);

      await userEvent.click(screen.getByText("최신순"));

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    test("오래된순 선택 시 정렬이 변경되고 쿼리를 다시 요청한다", async () => {
      render(<GoalList />);

      await userEvent.click(screen.getByText("최신순"));
      await userEvent.click(screen.getByText("오래된순"));

      expect(mockUseInfiniteScroll).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["team", "1", "goals", "infinite", "OLDEST"],
        }),
      );
    });
  });
});
