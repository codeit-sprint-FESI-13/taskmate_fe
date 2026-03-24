import type { StoryObj } from "@storybook/nextjs-vite";

import { Team } from "./Team";

const meta = {
  title: "Components/TodoItem/Team",
  component: Team,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Team> = {
  args: {
    children: "Team 1",
  },
};
