import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CreateButton } from "./CreateButton";

const meta = {
  title: "features/todo/List/CreateButton",
  component: CreateButton,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [["goalId", "1"]],
      },
    },
  },
} satisfies Meta<typeof CreateButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
