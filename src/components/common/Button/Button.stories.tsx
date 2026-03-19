import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Button from "./Button";

// 스토리북 메타 정보 설정
// - title: 스토리북 내 컴포넌트 경로
// - component: 실제 컴포넌트
// - parameters.layout: 컴포넌트 배치 설정 (화면 중앙)
// - tags: 자동 문서화 활성화
// - argTypes: 컨트롤 패널에서 변경 가능한 props 정의
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "outline"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    isDisabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 버튼
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "md",
    isDisabled: false,
  },
};

// Secondary 버튼
export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "md",
    isDisabled: false,
  },
};

// Outline 버튼
export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
    size: "md",
    isDisabled: false,
  },
};

// Disabled 버튼
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "primary",
    size: "md",
    isDisabled: true,
  },
};

// Small 버튼
export const Small: Story = {
  args: {
    children: "Small Button",
    variant: "primary",
    size: "sm",
  },
};

// Medium 버튼
// 기본 버튼과 중복 > 컨벤션 회의 때 중복되는 값을 스토리북에 정의할지 논의
export const Medium: Story = {
  args: {
    children: "Medium Button",
    variant: "primary",
    size: "md",
  },
};

// Large 버튼
export const Large: Story = {
  args: {
    children: "Large Button",
    variant: "primary",
    size: "lg",
  },
};
