import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { useParams } from "next/navigation";

import { useGoalId } from "@/shared/hooks/useGoalId";
import { useOverlay } from "@/shared/hooks/useOverlay";

import { useTodoCreateModal } from "./useTodoCreateModal";

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
    }),
    memberList: (teamId: string) => ({
      queryKey: ["team", teamId, "memberList"],
      queryFn: jest.fn(),
    }),
  },
}));
jest.mock("@/entities/auth/query/user.queryKey", () => ({
  userQueries: {
    all: ["auth"],
    myInfo: () => ({
      queryKey: ["auth", "myInfo"],
      queryFn: jest.fn(),
    }),
  },
}));
jest.mock("@/features/todo/ui/CreateTodoModal/TodoCreateModal", () => ({
  TodoCreateModal: () => null,
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUseGoalId = useGoalId as jest.MockedFunction<typeof useGoalId>;
const mockUseOverlay = useOverlay as jest.MockedFunction<typeof useOverlay>;

const myInfoData = {
  id: 101,
  email: "user@test.com",
  nickname: "테스터",
  profileImageUrl: null,
  createdAt: "2026-01-01T00:00:00.000Z",
};

const teamMemberListData = [
  {
    id: 1,
    userId: 201,
    userEmail: "member@test.com",
    profileImageUrl: null,
    userNickname: "팀원",
    role: "MEMBER" as const,
    joinedAt: "2026-01-01T00:00:00.000Z",
  },
];

const createWrapper = (preloadedData: {
  goalSummary: object;
  myInfo?: object;
  teamSummary?: object;
  teamMemberList?: object;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });

  queryClient.setQueryData(
    ["goal", "10", "summary"],
    preloadedData.goalSummary,
  );
  queryClient.setQueryData(["auth", "myInfo"], preloadedData.myInfo ?? null);
  if (preloadedData.teamSummary) {
    queryClient.setQueryData(
      ["team", "2", "summary"],
      preloadedData.teamSummary,
    );
  }
  if (preloadedData.teamMemberList) {
    queryClient.setQueryData(
      ["team", "2", "memberList"],
      preloadedData.teamMemberList,
    );
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return Wrapper;
};

describe("useTodoCreateModal", () => {
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

    test("todo-create-modal ID로 overlay를 연다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "개인 목표" },
        myInfo: myInfoData,
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      expect(mockOpen).toHaveBeenCalledWith(
        "todo-create-modal",
        expect.anything(),
      );
    });

    test("TodoCreateModal에 goalName을 전달한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "개인 목표" },
        myInfo: myInfoData,
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ goalName: string }>,
      ];
      expect(element.props.goalName).toBe("개인 목표");
    });

    test("teamName을 '개인'으로 전달한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "개인 목표" },
        myInfo: myInfoData,
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ teamName: string }>,
      ];
      expect(element.props.teamName).toBe("개인");
    });

    test("isAssigneeFixed를 true로 전달한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "개인 목표" },
        myInfo: myInfoData,
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ isAssigneeFixed: boolean }>,
      ];
      expect(element.props.isAssigneeFixed).toBe(true);
    });

    test("myInfo가 있으면 initialAssigneeIds에 myInfo.id를 넣는다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "개인 목표" },
        myInfo: myInfoData,
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ initialAssigneeIds: number[] }>,
      ];
      expect(element.props.initialAssigneeIds).toEqual([101]);
    });

    test("myInfo.nickname을 fixedAssigneeNickname으로 전달한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "개인 목표" },
        myInfo: myInfoData,
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ fixedAssigneeNickname: string }>,
      ];
      expect(element.props.fixedAssigneeNickname).toBe("테스터");
    });

    test("myInfo가 없으면 fixedAssigneeNickname을 '나'로 폴백한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "개인 목표" },
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ fixedAssigneeNickname: string }>,
      ];
      expect(element.props.fixedAssigneeNickname).toBe("나");
    });
  });

  describe("팀 목표 (teamId 있음)", () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({
        teamId: "2",
      } as ReturnType<typeof useParams>);
    });

    test("isAssigneeFixed를 false로 전달한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "팀 목표" },
        teamSummary: { teamName: "프론트엔드 팀" },
        teamMemberList: teamMemberListData,
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ isAssigneeFixed: boolean }>,
      ];
      expect(element.props.isAssigneeFixed).toBe(false);
    });

    test("팀 이름을 teamName으로 전달한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "팀 목표" },
        teamSummary: { teamName: "프론트엔드 팀" },
        teamMemberList: teamMemberListData,
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ teamName: string }>,
      ];
      expect(element.props.teamName).toBe("프론트엔드 팀");
    });

    test("initialAssigneeIds를 빈 배열로 전달한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "팀 목표" },
        teamSummary: { teamName: "프론트엔드 팀" },
        teamMemberList: teamMemberListData,
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ initialAssigneeIds: number[] }>,
      ];
      expect(element.props.initialAssigneeIds).toEqual([]);
    });

    test("팀 멤버 리스트를 memberList로 전달한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "팀 목표" },
        teamSummary: { teamName: "프론트엔드 팀" },
        teamMemberList: teamMemberListData,
      });

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
      });

      const [, element] = mockOpen.mock.calls[0] as [
        string,
        React.ReactElement<{ memberList: typeof teamMemberListData }>,
      ];
      expect(element.props.memberList).toEqual(teamMemberListData);
    });
  });

  describe("closeTodoCreateModal", () => {
    test("overlay.close를 호출한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "개인 목표" },
        myInfo: myInfoData,
      });
      mockUseParams.mockReturnValue({} as ReturnType<typeof useParams>);

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.closeTodoCreateModal();
      });

      expect(mockClose).toHaveBeenCalled();
    });
  });

  describe("모달의 onClose prop", () => {
    test("onClose 호출 시 overlay.close를 실행한다", () => {
      const wrapper = createWrapper({
        goalSummary: { goalName: "개인 목표" },
        myInfo: myInfoData,
      });
      mockUseParams.mockReturnValue({} as ReturnType<typeof useParams>);

      const { result } = renderHook(() => useTodoCreateModal(), { wrapper });

      act(() => {
        result.current.openTodoCreateModal();
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
