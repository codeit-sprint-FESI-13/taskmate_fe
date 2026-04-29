import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TodoDeleteModal } from "./TodoDeleteModal";

const meta = {
  title: "features/todo/TodoDeleteModal",
  component: TodoDeleteModal,
  tags: ["autodocs"],
  args: {
    onClose: () => {},
    onConfirm: () => {},
  },
} satisfies Meta<typeof TodoDeleteModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
