import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { Todo } from "@/entities/todo";

import { Item } from "./Item";

const baseTodo: Todo = {
  id: 1,
  goalId: 1,
  title: "컴포넌트 리팩토링 작업",
  startDate: "2026-04-01",
  dueDate: "2026-05-01",
  status: "TODO",
  memo: "",
  assigneeSummary: "홍길동",
  assignees: [{ userId: 101, nickname: "홍길동" }],
};

const meta = {
  title: "features/todo/List/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [["goalId", "1"]],
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <ul className="w-full rounded-2xl bg-white">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TodoStatus: Story = {
  args: { todo: { ...baseTodo, status: "TODO" } },
};

export const DoingStatus: Story = {
  args: { todo: { ...baseTodo, status: "DOING" } },
};

export const DoneStatus: Story = {
  args: { todo: { ...baseTodo, status: "DONE" } },
};

export const NoAssignees: Story = {
  args: {
    todo: {
      ...baseTodo,
      assignees: [],
      assigneeSummary: "",
    },
  },
};

export const MultipleAssignees: Story = {
  name: "담당자 5명 (아바타 4개까지 표시)",
  args: {
    todo: {
      ...baseTodo,
      assignees: [
        { userId: 101, nickname: "홍길동" },
        { userId: 102, nickname: "김철수" },
        { userId: 103, nickname: "이영희" },
        { userId: 104, nickname: "박민수" },
        { userId: 105, nickname: "최지수" },
      ],
      assigneeSummary: "홍길동 외 4명",
    },
  },
};

export const LongTitle: Story = {
  name: "긴 제목 (말줄임 처리)",
  args: {
    todo: {
      ...baseTodo,
      title:
        "매우 긴 할 일 제목이 들어왔을 때 텍스트가 올바르게 잘리는지 확인하는 스토리입니다",
    },
  },
};
