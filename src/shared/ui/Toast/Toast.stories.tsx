import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    toast: {
      id: "1",
      title: "Default Toast",
      description: "This is a default toast",
      variant: "default",
      duration: 3000,
    },
  },
};

export const Success: Story = {
  args: {
    toast: {
      id: "2",
      title: "Success Toast",
      description: "This is a success toast",
      variant: "success",
      duration: 3000,
    },
  },
};

export const Error: Story = {
  args: {
    toast: {
      id: "3",
      title: "Error Toast",
      description: "This is an error toast",
      variant: "error",
      duration: 3000,
    },
  },
};
