import type { StoryObj } from "@storybook/nextjs-vite";

import { TodoAssigneeAvatars } from "./TodoAssigneeAvatars";

const meta = {
  title: "features/todo/List/TodoAssigneeAvatars",
  component: TodoAssigneeAvatars,
  tags: ["autodocs"],
};

export default meta;

const makeAssignees = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    userId: i + 1,
    nickname: `담당자${i + 1}`,
  }));

export const NoAssignees: StoryObj<typeof TodoAssigneeAvatars> = {
  args: { assignees: [] },
};

export const TwoAssignees: StoryObj<typeof TodoAssigneeAvatars> = {
  args: { assignees: makeAssignees(2) },
};

export const FourAssignees: StoryObj<typeof TodoAssigneeAvatars> = {
  args: { assignees: makeAssignees(4) },
};

export const OverMax: StoryObj<typeof TodoAssigneeAvatars> = {
  name: "6명 (최대 4개만 표시)",
  args: { assignees: makeAssignees(6) },
};
