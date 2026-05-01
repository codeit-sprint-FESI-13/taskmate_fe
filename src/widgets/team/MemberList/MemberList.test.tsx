import { useSuspenseQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useTeamId, useTeamLeaveModal } from "@/features/team";

import MemberListComponent from "./MemberList";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useSuspenseQuery: jest.fn(),
}));

jest.mock("@/features/team", () => ({
  useTeamId: jest.fn(),
  useTeamLeaveModal: jest.fn(),
  formatMemberList: jest.fn(<T,>(members: T[]) => members),
}));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

jest.mock("@/shared/ui/Button/TextButton/TextButton", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
    leftIcon,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    leftIcon?: React.ReactNode;
  }) => (
    <button onClick={onClick}>
      {leftIcon}
      {children}
    </button>
  ),
}));

jest.mock("./Member", () => ({
  __esModule: true,
  default: ({ nickName }: { nickName: string }) => (
    <div data-testid="member-item">{nickName}</div>
  ),
}));

const mockOpenLeaveTeamModal = jest.fn();

const mockMembers = [
  {
    id: 1,
    userId: 100,
    userNickname: "홍길동",
    userEmail: "hong@example.com",
    profileImageUrl: null,
    role: "MEMBER",
  },
  {
    id: 2,
    userId: 200,
    userNickname: "김철수",
    userEmail: "kim@example.com",
    profileImageUrl: null,
    role: "ADMIN",
  },
];

const mockUseTeamId = useTeamId as jest.MockedFunction<typeof useTeamId>;
const mockUseTeamLeaveModal = useTeamLeaveModal as jest.MockedFunction<
  typeof useTeamLeaveModal
>;
const mockUseSuspenseQuery = useSuspenseQuery as jest.Mock;

describe("MemberList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTeamId.mockReturnValue("1");
    mockUseTeamLeaveModal.mockReturnValue({
      openLeaveTeamModal: mockOpenLeaveTeamModal,
      closeLeaveTeamModal: jest.fn(),
    });
  });

  describe("기본 렌더링", () => {
    beforeEach(() => {
      mockUseSuspenseQuery
        .mockReturnValueOnce({ data: mockMembers })
        .mockReturnValueOnce({ data: { id: 300 } });
    });

    test("멤버 목록이 렌더링된다", () => {
      render(<MemberListComponent />);
      expect(screen.getAllByTestId("member-item")).toHaveLength(2);
    });

    test("멤버 수가 표시된다", () => {
      render(<MemberListComponent />);
      expect(screen.getByText("2명")).toBeInTheDocument();
    });
  });

  describe("관리자 권한", () => {
    beforeEach(() => {
      mockUseSuspenseQuery
        .mockReturnValueOnce({ data: mockMembers })
        .mockReturnValueOnce({ data: { id: 200 } });
    });

    test("현재 사용자가 관리자이면 팀 나가기 버튼이 표시된다", () => {
      render(<MemberListComponent />);
      expect(
        screen.getByRole("button", { name: /팀 나가기/ }),
      ).toBeInTheDocument();
    });

    test("팀 나가기 버튼 클릭 시 openLeaveTeamModal이 호출된다", async () => {
      render(<MemberListComponent />);
      await userEvent.click(screen.getByRole("button", { name: /팀 나가기/ }));
      expect(mockOpenLeaveTeamModal).toHaveBeenCalledTimes(1);
    });
  });

  describe("일반 멤버 권한", () => {
    test("현재 사용자가 일반 멤버이면 팀 나가기 버튼이 표시되지 않는다", () => {
      mockUseSuspenseQuery
        .mockReturnValueOnce({ data: mockMembers })
        .mockReturnValueOnce({ data: { id: 100 } });

      render(<MemberListComponent />);
      expect(
        screen.queryByRole("button", { name: /팀 나가기/ }),
      ).not.toBeInTheDocument();
    });
  });
});
