import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TodoCreateModal } from "./TodoCreateModal";

const meta = {
  title: "features/todo/TodoCreateModal",
  component: TodoCreateModal,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [["goalId", "1"]],
      },
    },
  },
  args: {
    onClose: () => {},
    goalName: "디자인 시스템 완성",
    teamName: "개인",
    memberList: [],
    isAssigneeFixed: true,
    fixedAssigneeNickname: "나",
    initialAssigneeIds: [],
  },
} satisfies Meta<typeof TodoCreateModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PersonalGoal: Story = {
  name: "개인 목표 (담당자 고정)",
  args: {
    isAssigneeFixed: true,
    fixedAssigneeNickname: "나",
    teamName: "개인",
  },
};

export const TeamGoal: Story = {
  name: "팀 목표 (담당자 선택)",
  args: {
    isAssigneeFixed: false,
    teamName: "프론트엔드 팀",
    memberList: [
      {
        id: 1,
        userId: 101,
        userEmail: "alice@test.com",
        profileImageUrl: null,
        userNickname: "Alice",
        role: "MEMBER",
        joinedAt: "2026-01-01T00:00:00Z",
      },
      {
        id: 2,
        userId: 102,
        userEmail: "bob@test.com",
        profileImageUrl: null,
        userNickname: "Bob",
        role: "ADMIN",
        joinedAt: "2026-01-01T00:00:00Z",
      },
    ],
    initialAssigneeIds: [],
  },
};
