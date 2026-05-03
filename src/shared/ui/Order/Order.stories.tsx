import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Order } from "./Order";

const meta = {
  title: "shared/ui/Order",
  component: Order,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex w-64 items-center justify-between">
        <span className="typography-body-1 font-bold">목록 제목</span>
        <Story />
      </div>
    ),
  ],
  args: {
    options: ["마감일 순", "최신순", "오래된순"],
    selected: "마감일 순",
    onSelect: () => {},
  },
} satisfies Meta<typeof Order>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const AnotherSelected: Story = {
  args: { selected: "최신순" },
};
