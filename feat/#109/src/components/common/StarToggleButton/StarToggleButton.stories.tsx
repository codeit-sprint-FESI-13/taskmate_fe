import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StarToggleButton } from "./index";

const meta: Meta<typeof StarToggleButton> = {
  title: "Components/Common/StarToggleButton",
  component: StarToggleButton,
  tags: ["autodocs"],
  argTypes: {
    initialState: {
      control: "boolean",
      description: "초기 활성화 상태를 결정합니다.",
    },
    size: {
      control: { type: "number" },
      description: "아이콘의 크기(px)를 조절합니다.",
    },
    onToggle: {
      action: "toggled",
      description: "상태가 변경될 때 실행되는 콜백 함수입니다.",
    },
  },
  // 버튼이 잘 보이도록 배경 패딩 추가
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StarToggleButton>;

/**
 * 기본 상태 (비어있는 별)
 */
export const Default: Story = {
  args: {
    initialState: false,
    size: 32,
  },
};

/**
 * 활성화 상태 (채워진 별)
 */
export const Filled: Story = {
  args: {
    initialState: true,
    size: 32,
  },
};

/**
 * 크기 조절 예시 (작은 사이즈)
 */
export const Small: Story = {
  args: {
    initialState: false,
    size: 20,
  },
};

/**
 * 큰 사이즈 피드백 확인용
 */
export const Large: Story = {
  args: {
    initialState: true,
    size: 64,
  },
};
