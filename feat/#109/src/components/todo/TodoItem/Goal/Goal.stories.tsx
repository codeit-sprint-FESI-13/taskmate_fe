import type { StoryObj } from "@storybook/nextjs-vite";

import { Goal } from "./Goal";

const meta = {
  title: "Components/TodoItem/Goal",
  component: Goal,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Goal> = {
  args: {
    children: "Goal 컴포넌트 테스트",
  },
};
