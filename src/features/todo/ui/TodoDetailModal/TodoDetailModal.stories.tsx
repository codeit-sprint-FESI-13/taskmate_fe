import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { Todo } from "@/entities/todo";

import { TodoDetailModal } from "./TodoDetailModal";

const baseTodo: Todo = {
  id: 1,
  goalId: 10,
  title: "컴포넌트 리팩토링 작업",
  startDate: "2026-05-01",
  dueDate: "2026-05-31",
  status: "TODO",
  memo: "Next.js App Router 기준으로 코드 정리 필요",
  assigneeSummary: "홍길동",
  assignees: [{ userId: 101, nickname: "홍길동" }],
};

const meta = {
  title: "features/todo/TodoDetailModal",
  component: TodoDetailModal,
  tags: ["autodocs"],
  args: {
    onClose: () => {},
    todo: baseTodo,
    goalName: "디자인 시스템 완성",
    teamName: "개인",
  },
} satisfies Meta<typeof TodoDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TeamGoal: Story = {
  name: "팀 목표",
  args: {
    teamName: "프론트엔드 팀",
    todo: {
      ...baseTodo,
      assignees: [
        { userId: 101, nickname: "홍길동" },
        { userId: 102, nickname: "김철수" },
      ],
    },
  },
};

export const NoAssignees: Story = {
  name: "담당자 없음",
  args: {
    todo: {
      ...baseTodo,
      assignees: [],
      assigneeSummary: "",
    },
  },
};

export const NoMemo: Story = {
  name: "메모 없음",
  args: {
    todo: {
      ...baseTodo,
      memo: "",
    },
  },
};
