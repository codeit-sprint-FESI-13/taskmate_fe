import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TodoItem } from "./index";

const meta = {
  title: "Components/TodoItem",
  component: TodoItem.Wrapper,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#f3f4f6",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TodoItem.Wrapper>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    children: (
      <>
        <TodoItem.Row>
          <TodoItem.Name>Name 컴포넌트 테스트</TodoItem.Name>
          <TodoItem.Day color="blue">D-5</TodoItem.Day>
        </TodoItem.Row>
        <TodoItem.Row>
          <TodoItem.Team>Team 1</TodoItem.Team>
          <TodoItem.Goal>Goal 컴포넌트 테스트</TodoItem.Goal>
        </TodoItem.Row>
      </>
    ),
  },
};
