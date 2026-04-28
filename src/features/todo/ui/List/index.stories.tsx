import type { StoryObj } from "@storybook/nextjs-vite";

import { TodoList } from "./index";

const meta = {
  title: "features/todo/List/TodoList",
  component: TodoList.List,
  tags: ["autodocs"],
  args: {
    name: "TODO",
    height: "400px",
    sortOptions: ["마감일 순", "최신순", "오래된순"],
    selectedSort: "마감일 순",
    onSortChange: () => {},
  },
};

export default meta;

export const Empty: StoryObj<typeof TodoList.List> = {
  render: (args) => <TodoList.List {...args}>{null}</TodoList.List>,
};

export const WithItems: StoryObj<typeof TodoList.List> = {
  render: (args) => (
    <TodoList.List {...args}>
      <li className="px-3 py-2 text-sm text-gray-700">할 일 항목 1</li>
      <li className="px-3 py-2 text-sm text-gray-700">할 일 항목 2</li>
      <li className="px-3 py-2 text-sm text-gray-700">할 일 항목 3</li>
    </TodoList.List>
  ),
};

export const WithFooter: StoryObj<typeof TodoList.List> = {
  render: (args) => (
    <TodoList.List
      {...args}
      footer={
        <button className="w-full rounded-lg bg-blue-800 py-2 text-sm font-semibold text-white">
          할 일 추가
        </button>
      }
    >
      <li className="px-3 py-2 text-sm text-gray-700">할 일 항목 1</li>
    </TodoList.List>
  ),
};
