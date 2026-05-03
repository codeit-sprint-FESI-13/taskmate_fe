import type { StoryObj } from "@storybook/nextjs-vite";

import type { Todo } from "@/entities/todo";

import { TodoStatusSelect } from "./TodoStatusSelect";

const meta = {
  title: "features/todo/List/TodoStatusSelect",
  component: TodoStatusSelect,
  tags: ["autodocs"],
};

export default meta;

const baseTodo: Todo = {
  id: 1,
  goalId: 100,
  title: "테스트 할 일",
  startDate: "2026-04-01",
  dueDate: "2026-12-31",
  status: "TODO",
  memo: "",
  assigneeSummary: "",
  assignees: [],
};

export const TodoStatus: StoryObj<typeof TodoStatusSelect> = {
  args: { todo: { ...baseTodo, status: "TODO" } },
};

export const DoingStatus: StoryObj<typeof TodoStatusSelect> = {
  args: { todo: { ...baseTodo, status: "DOING" } },
};

export const DoneStatus: StoryObj<typeof TodoStatusSelect> = {
  args: { todo: { ...baseTodo, status: "DONE" } },
};
