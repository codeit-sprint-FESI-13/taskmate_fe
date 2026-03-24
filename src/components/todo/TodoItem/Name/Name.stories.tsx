import type { StoryObj } from "@storybook/nextjs-vite";

import { Name } from "./Name";

const meta = {
  title: "Components/TodoItem/Name",
  component: Name,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Name> = {
  args: {
    children: "Name 컴포넌트 테스트",
  },
};
