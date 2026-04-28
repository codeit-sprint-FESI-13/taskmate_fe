import type { StoryObj } from "@storybook/nextjs-vite";

import { Order } from "./Order";

const meta = {
  title: "features/todo/List/Order",
  component: Order,
  tags: ["autodocs"],
  args: {
    options: ["마감일 순", "최신순", "오래된순"],
    selected: "마감일 순",
    onSelect: () => {},
  },
};

export default meta;

export const Closed: StoryObj<typeof Order> = {};

export const AnotherSelected: StoryObj<typeof Order> = {
  args: { selected: "최신순" },
};
