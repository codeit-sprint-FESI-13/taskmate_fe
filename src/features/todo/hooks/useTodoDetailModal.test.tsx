import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { useParams } from "next/navigation";

import type { Todo } from "@/entities/todo";
import { useGoalId } from "@/shared/hooks/useGoalId";
import { useOverlay } from "@/shared/hooks/useOverlay";

import { useTodoDetailModal } from "./useTodoDetailModal";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));
jest.mock("@/shared/hooks/useGoalId");
jest.mock("@/shared/hooks/useOverlay");
jest.mock("@/entities/goal", () => ({
  goalQueryOptions: {
    getSummary: (goalId: string) => ({
      queryKey: ["goal", goalId, "summary"],
      queryFn: jest.fn(),
    }),
  },
}));
jest.mock("@/entities/team", () => ({
  teamQueryOptions: {
    summary: (teamId: string) => ({
      queryKey: ["team", teamId, "summary"],
      queryFn: jest.fn(),
      enabled: Boolean(teamId),
    }),
  },
}));
jest.mock("@/features/todo/ui/TodoDetailModal/TodoDetailModal", () => ({
  TodoDetailModal: () => null,
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUseGoalId = useGoalId as jest.MockedFunction<typeof useGoalId>;
const mockUseOverlay = useOverlay as jest.MockedFunction<typeof useOverlay>;

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 1,
  goalId: 10,
  title: "테스트 할 일",
  startDate: "2026-05-01",
  dueDate: "2026-05-31",
  status: "TODO",
  memo: "메모",
  assigneeSummary: "",
  assignees: [],
  ...overrides,
});

const createWrapper = (goalSummaryData: object, teamSummaryData?: object) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });

  queryClient.setQueryData(["goal", "10", "summary"], goalSummaryData);
  if (teamSummaryData) {
    queryClient.setQueryData(["team", "2", "summary"], teamSummaryData);
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return Wrapper;
};

describe("useTodoDetailModal", () => {
  let mockOpen: jest.Mock;
  let mockClose: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockOpen = jest.fn();
    mockClose = jest.fn();

    mockUseGoalId.mockReturnValue("10");
    mockUseOverlay.mockReturnValue({ open: mockOpen, close: mockClose });
  });

  describe("개인 목표 (teamId 없음)", () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({} as ReturnType<typeof useParams>);
    });

    test("openTodoDetailModal 호출 시 todo-detail-modal ID로 overlay를 연다", () => {
      const wrapper = createWrapper({ goalName: "디자인 시스템" });
      const todo = makeTodo();

      const { result } = renderHook(() => useTodoDetailModal({ todo }), {
        wrapper,
      });

      act(() => {
        result.current.openTodoDetailModal();
      });

      expect(mockOpen).toHaveBeenCalledWith(
        "todo-detail-modal",
        expect.anything(),
      );
    });

    test("TodoDetailModal에 goalName을 전달한다", () => {
      const wrapper = createWrapper({ goalName: "디자인 시스템" });
      const todo = makeTodo();

      const { result } = renderHook(() => useTodoDetailModal({ todo }), {
        wrapper,
      });

      act(() => {
        result.current.openTodoDetailModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ goalName: string; teamName: string; todo: Todo }>,
      ];

      expect(element.props.goalName).toBe("디자인 시스템");
    });

    test("팀 정보 없으면 teamName을 '개인'으로 전달한다", () => {
      const wrapper = createWrapper({ goalName: "디자인 시스템" });
      const todo = makeTodo();

      const { result } = renderHook(() => useTodoDetailModal({ todo }), {
        wrapper,
      });

      act(() => {
        result.current.openTodoDetailModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ teamName: string }>,
      ];

      expect(element.props.teamName).toBe("개인");
    });

    test("TodoDetailModal에 todo를 전달한다", () => {
      const wrapper = createWrapper({ goalName: "디자인 시스템" });
      const todo = makeTodo({ title: "중요한 할 일" });

      const { result } = renderHook(() => useTodoDetailModal({ todo }), {
        wrapper,
      });

      act(() => {
        result.current.openTodoDetailModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ todo: Todo }>,
      ];

      expect(element.props.todo).toEqual(todo);
    });
  });

  describe("팀 목표 (teamId 있음)", () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({
        teamId: "2",
      } as ReturnType<typeof useParams>);
    });

    test("팀 정보가 있으면 teamName을 팀 이름으로 전달한다", () => {
      const wrapper = createWrapper(
        { goalName: "팀 목표" },
        { teamName: "프론트엔드 팀" },
      );
      const todo = makeTodo();

      const { result } = renderHook(() => useTodoDetailModal({ todo }), {
        wrapper,
      });

      act(() => {
        result.current.openTodoDetailModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ teamName: string }>,
      ];

      expect(element.props.teamName).toBe("프론트엔드 팀");
    });
  });

  describe("closeTodoDetailModal", () => {
    test("overlay.close를 호출한다", () => {
      const wrapper = createWrapper({ goalName: "디자인 시스템" });
      mockUseParams.mockReturnValue({} as ReturnType<typeof useParams>);
      const todo = makeTodo();

      const { result } = renderHook(() => useTodoDetailModal({ todo }), {
        wrapper,
      });

      act(() => {
        result.current.closeTodoDetailModal();
      });

      expect(mockClose).toHaveBeenCalled();
    });
  });

  describe("onClose prop", () => {
    test("모달의 onClose 호출 시 overlay.close를 실행한다", () => {
      const wrapper = createWrapper({ goalName: "디자인 시스템" });
      mockUseParams.mockReturnValue({} as ReturnType<typeof useParams>);
      const todo = makeTodo();

      const { result } = renderHook(() => useTodoDetailModal({ todo }), {
        wrapper,
      });

      act(() => {
        result.current.openTodoDetailModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ onClose: () => void }>,
      ];

      act(() => {
        element.props.onClose();
      });

      expect(mockClose).toHaveBeenCalled();
    });
  });
});
