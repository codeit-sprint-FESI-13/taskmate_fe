import type { StoryObj } from "@storybook/nextjs-vite";

import { Day } from "./Day";

const meta = {
  title: "Components/TodoItem/Day",
  component: Day,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "radio" },
      options: ["blue", "red"],
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Day> = {
  args: {
    color: "blue",
    children: "D-5",
  },
};

export const Red: StoryObj<typeof Day> = {
  args: {
    color: "red",
    children: "D-5",
  },
};
