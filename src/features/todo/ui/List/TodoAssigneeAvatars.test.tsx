import { render, screen } from "@testing-library/react";

import { TodoAssigneeAvatars } from "./TodoAssigneeAvatars";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { src: string; alt: string }) => <img alt={alt} />,
}));

jest.mock("@/shared/assets/images/avatar.png", () => ({ src: "/avatar.png" }));

const makeAssignees = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    userId: i + 1,
    nickname: `담당자${i + 1}`,
  }));

describe("TodoAssigneeAvatars", () => {
  test("담당자가 없으면 아바타 이미지가 렌더링되지 않는다", () => {
    render(<TodoAssigneeAvatars assignees={[]} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("담당자가 2명이면 아바타 이미지가 2개 렌더링된다", () => {
    render(<TodoAssigneeAvatars assignees={makeAssignees(2)} />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  test("담당자가 4명이면 아바타 이미지가 4개 렌더링된다", () => {
    render(<TodoAssigneeAvatars assignees={makeAssignees(4)} />);
    expect(screen.getAllByRole("img")).toHaveLength(4);
  });

  test("담당자가 5명이어도 최대 4개의 아바타만 렌더링된다", () => {
    render(<TodoAssigneeAvatars assignees={makeAssignees(5)} />);
    expect(screen.getAllByRole("img")).toHaveLength(4);
  });
});
