import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NavigationBar } from "./index";

const meta: Meta<typeof NavigationBar> = {
  title: "Components/NavigationBar",
  component: NavigationBar,
};

export default meta;

export const Default: StoryObj<typeof NavigationBar> = {};
