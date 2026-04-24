import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NavigationBar } from "./index";

const meta: Meta<typeof NavigationBar> = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  title: "Components/NavigationBar",
  component: NavigationBar,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof NavigationBar> = {};
