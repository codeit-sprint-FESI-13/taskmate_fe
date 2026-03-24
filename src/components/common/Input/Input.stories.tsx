import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ClearIcon from "../Icons/ClearIcon";
import EyeOnIcon from "../Icons/EyeOnIcon";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "disabled", "error"],
    },
    shape: {
      control: { type: "radio" },
      options: ["default", "search"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 기본 인풋
export const Default: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
    variant: "default",
  },
};

// 에러 인풋
export const Error: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
    errorMessage: "에러 메시지",
  },
};

// Disabled 인풋
export const Disabled: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
    variant: "disabled",
  },
};

// Supporting Text
export const WithSupportingText: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
    supportingText: "도움말 텍스트",
  },
};

// Clear 버튼
export const WithClearButton: Story = {
  args: {
    value: "입력된 텍스트",
    rightIcon: (
      <button type="button">
        <ClearIcon className="text-gray-300" />
      </button>
    ),
  },
};

// Password 인풋
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    rightIcon: (
      <button type="button">
        <EyeOnIcon className="text-gray-300" />
      </button>
    ),
  },
};

// Search 인풋
// 아이콘 추가시 변경하겠습니다.
export const Search: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
    shape: "search",
    rightIcon: (
      <div>
        <EyeOnIcon className="text-gray-300" />
      </div>
    ),
  },
};
