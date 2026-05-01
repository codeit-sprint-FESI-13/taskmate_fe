import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AssigneeSelect } from "./index";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img
      src={src}
      alt={alt}
    />
  ),
}));

jest.mock("@/shared/ui/Icon", () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}));

jest.mock("@/shared/assets/images/avatar.png", () => ({
  src: "/avatar-fallback.png",
}));

const members = [
  {
    id: 1,
    userId: 101,
    userEmail: "alice@test.com",
    profileImageUrl: "https://example.com/alice.jpg",
    userNickname: "Alice",
    role: "MEMBER" as const,
    joinedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: 2,
    userId: 102,
    userEmail: "bob@test.com",
    profileImageUrl: null,
    userNickname: "Bob",
    role: "ADMIN" as const,
    joinedAt: "2026-01-01T00:00:00Z",
  },
];

describe("AssigneeSelect", () => {
  describe("초기 상태", () => {
    test("선택된 멤버가 없으면 기본 플레이스홀더를 표시한다", () => {
      render(
        <AssigneeSelect
          members={members}
          value={[]}
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByText("담당자를 선택해주세요")).toBeInTheDocument();
    });

    test("placeholder prop으로 커스텀 플레이스홀더를 표시한다", () => {
      render(
        <AssigneeSelect
          members={members}
          value={[]}
          onChange={jest.fn()}
          placeholder="멤버를 선택하세요"
        />,
      );

      expect(screen.getByText("멤버를 선택하세요")).toBeInTheDocument();
    });

    test("초기에 드롭다운이 닫혀 있다", () => {
      render(
        <AssigneeSelect
          members={members}
          value={[]}
          onChange={jest.fn()}
        />,
      );

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("드롭다운 열기", () => {
    test("트리거 클릭 시 멤버 목록이 열린다", async () => {
      render(
        <AssigneeSelect
          members={members}
          value={[]}
          onChange={jest.fn()}
        />,
      );

      await userEvent.click(screen.getByText("담당자를 선택해주세요"));

      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    test("열린 드롭다운에 모든 멤버 이름이 표시된다", async () => {
      render(
        <AssigneeSelect
          members={members}
          value={[]}
          onChange={jest.fn()}
        />,
      );

      await userEvent.click(screen.getByText("담당자를 선택해주세요"));

      const list = screen.getByRole("list");
      expect(within(list).getByText("Alice")).toBeInTheDocument();
      expect(within(list).getByText("Bob")).toBeInTheDocument();
    });
  });

  describe("멤버 선택", () => {
    test("미선택 멤버 클릭 시 해당 ID가 추가되어 onChange가 호출된다", async () => {
      const onChange = jest.fn();
      render(
        <AssigneeSelect
          members={members}
          value={[]}
          onChange={onChange}
        />,
      );

      await userEvent.click(screen.getByText("담당자를 선택해주세요"));
      await userEvent.click(
        screen.getByRole("button", { name: /Alice 프로필/ }),
      );

      expect(onChange).toHaveBeenCalledWith([101]);
    });

    test("이미 선택된 멤버 클릭 시 해당 ID가 제거되어 onChange가 호출된다", async () => {
      const onChange = jest.fn();
      render(
        <AssigneeSelect
          members={members}
          value={[101]}
          onChange={onChange}
        />,
      );

      await userEvent.click(screen.getByTestId("icon-DownFilledArrow"));
      await userEvent.click(
        screen.getByRole("button", { name: /Alice 프로필/ }),
      );

      expect(onChange).toHaveBeenCalledWith([]);
    });

    test("기존 선택이 있을 때 다른 멤버 클릭 시 기존 선택에 추가된다", async () => {
      const onChange = jest.fn();
      render(
        <AssigneeSelect
          members={members}
          value={[101]}
          onChange={onChange}
        />,
      );

      await userEvent.click(screen.getByTestId("icon-DownFilledArrow"));
      await userEvent.click(screen.getByRole("button", { name: /Bob 프로필/ }));

      expect(onChange).toHaveBeenCalledWith([101, 102]);
    });
  });

  describe("선택된 멤버 칩", () => {
    test("선택된 멤버의 닉네임이 표시된다", () => {
      render(
        <AssigneeSelect
          members={members}
          value={[101]}
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    test("X 버튼 클릭 시 해당 멤버가 제거되어 onChange가 호출된다", async () => {
      const onChange = jest.fn();
      render(
        <AssigneeSelect
          members={members}
          value={[101]}
          onChange={onChange}
        />,
      );

      const xButton = within(
        screen.getByText("Alice").parentElement!,
      ).getByRole("button");
      await userEvent.click(xButton);

      expect(onChange).toHaveBeenCalledWith([]);
    });

    test("X 버튼 클릭 시 드롭다운이 열리지 않는다", async () => {
      render(
        <AssigneeSelect
          members={members}
          value={[101]}
          onChange={jest.fn()}
        />,
      );

      const xButton = within(
        screen.getByText("Alice").parentElement!,
      ).getByRole("button");
      await userEvent.click(xButton);

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("프로필 이미지", () => {
    test("profileImageUrl이 있으면 해당 URL을 이미지 src로 사용한다", () => {
      render(
        <AssigneeSelect
          members={members}
          value={[101]}
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByAltText("Alice 프로필")).toHaveAttribute(
        "src",
        "https://example.com/alice.jpg",
      );
    });

    test("profileImageUrl이 null이면 기본 아바타를 사용한다", () => {
      render(
        <AssigneeSelect
          members={members}
          value={[102]}
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByAltText("Bob 프로필")).toHaveAttribute(
        "src",
        "/avatar-fallback.png",
      );
    });

    test("profileImageUrl이 공백 문자열이면 기본 아바타를 사용한다", () => {
      const membersWithWhitespace = [
        {
          ...members[0],
          userId: 103,
          userNickname: "Carol",
          profileImageUrl: "   ",
        },
      ];

      render(
        <AssigneeSelect
          members={membersWithWhitespace}
          value={[103]}
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByAltText("Carol 프로필")).toHaveAttribute(
        "src",
        "/avatar-fallback.png",
      );
    });
  });
});
