import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { GoalProgressCard } from "./GoalProgressCard";

const meta = {
  title: "widgets/team/GoalProgressCard",
  component: GoalProgressCard,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    teamId: "1",
    goalId: 1,
    title: "Q1 팀 목표 달성",
    progress: 60,
    isFavorite: false,
    color: "green",
  },
} satisfies Meta<typeof GoalProgressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Favorite: Story = {
  args: { isFavorite: true },
};

export const BlueColor: Story = {
  args: { color: "blue", progress: 30 },
};

export const FullProgress: Story = {
  args: { progress: 100 },
};

export const LongTitle: Story = {
  args: {
    title: "매우 긴 목표 제목이 있을 때 말줄임표로 처리되어야 하는 경우입니다",
  },
};

export const WithIcon: Story = {
  args: {
    iconSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/24px-Camponotus_flavomarginatus_ant.jpg",
  },
};
