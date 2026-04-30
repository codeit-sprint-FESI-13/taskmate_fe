import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

import { useToggleGoalFavoriteMutation } from "@/features/goal/mutation/useToggleGoalFavoriteMutation";

import { GoalProgressCard } from "./GoalProgressCard";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => (
    <img
      alt={alt}
      data-testid="goal-icon"
    />
  ),
}));

jest.mock("@/features/goal/mutation/useToggleGoalFavoriteMutation", () => ({
  useToggleGoalFavoriteMutation: jest.fn(),
}));

jest.mock("@/shared/ui/ProgressBar", () => ({
  ProgressBar: () => <div data-testid="progress-bar" />,
}));

jest.mock("@/widgets/common/StarToggleButton", () => ({
  StarToggleButton: ({ onToggle }: { onToggle: () => void }) => (
    <button
      data-testid="star-toggle"
      onClick={onToggle}
    >
      즐겨찾기
    </button>
  ),
}));

const mockPush = jest.fn();
const mockMutate = jest.fn();

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseToggleGoalFavoriteMutation =
  useToggleGoalFavoriteMutation as jest.MockedFunction<
    typeof useToggleGoalFavoriteMutation
  >;

const defaultProps = {
  teamId: "1",
  goalId: 42,
  title: "테스트 목표",
  progress: 75,
  isFavorite: false,
};

describe("GoalProgressCard", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as unknown as ReturnType<typeof useRouter>);
    mockUseToggleGoalFavoriteMutation.mockReturnValue({
      mutate: mockMutate,
    } as unknown as ReturnType<typeof useToggleGoalFavoriteMutation>);
    mockPush.mockClear();
    mockMutate.mockClear();
  });

  describe("기본 렌더링", () => {
    test("제목이 표시된다", () => {
      render(<GoalProgressCard {...defaultProps} />);
      expect(screen.getByText("테스트 목표")).toBeInTheDocument();
    });

    test("진행률 바가 렌더링된다", () => {
      render(<GoalProgressCard {...defaultProps} />);
      expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
    });

    test("진행률 퍼센트가 표시된다", () => {
      render(
        <GoalProgressCard
          {...defaultProps}
          progress={75}
        />,
      );
      expect(screen.getByText("75%")).toBeInTheDocument();
    });
  });

  describe("카드 클릭", () => {
    test("클릭 시 팀 목표 상세 페이지로 이동한다", async () => {
      render(<GoalProgressCard {...defaultProps} />);
      await userEvent.click(screen.getByText("테스트 목표"));
      expect(mockPush).toHaveBeenCalledWith("/taskmate/team/1/goal/42");
    });
  });

  describe("iconSrc가 없을 때", () => {
    test("즐겨찾기 버튼이 렌더링된다", () => {
      render(<GoalProgressCard {...defaultProps} />);
      expect(screen.getByTestId("star-toggle")).toBeInTheDocument();
    });

    test("즐겨찾기 버튼 클릭 시 toggleFavorite이 goalId로 호출된다", async () => {
      render(<GoalProgressCard {...defaultProps} />);
      await userEvent.click(screen.getByTestId("star-toggle"));
      expect(mockMutate).toHaveBeenCalledWith(42);
      expect(mockMutate).toHaveBeenCalledTimes(1);
    });
  });

  describe("iconSrc가 있을 때", () => {
    test("이미지가 렌더링된다", () => {
      render(
        <GoalProgressCard
          {...defaultProps}
          iconSrc="/icon.png"
        />,
      );
      expect(screen.getByTestId("goal-icon")).toBeInTheDocument();
    });

    test("즐겨찾기 버튼이 렌더링되지 않는다", () => {
      render(
        <GoalProgressCard
          {...defaultProps}
          iconSrc="/icon.png"
        />,
      );
      expect(screen.queryByTestId("star-toggle")).not.toBeInTheDocument();
    });
  });
});
