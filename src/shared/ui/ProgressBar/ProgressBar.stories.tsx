import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgressBar } from "./index";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/Common/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "lg"],
    },
    color: {
      control: "inline-radio",
      options: ["blue", "green"],
    },
    variant: {
      control: "select",
      options: ["on-white", "on-color"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// 히어로형 (Hero 카드 배경 위에서 사용)
export const OnColor: Story = {
  args: {
    value: 80,
    size: "lg",
    color: "green",
    variant: "on-color",
    showThumb: true,
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl rounded-[28px] bg-[var(--color-green-800)] p-10">
        <Story />
      </div>
    ),
  ],
};

// 기본형 (Secondary 카드 등에 사용)
export const OnWhite: Story = {
  args: {
    value: 60,
    size: "sm",
    color: "green",
    variant: "on-white",
  },
  decorators: [
    (Story) => (
      <div className="max-w-md rounded-lg border border-zinc-100 bg-white p-6">
        <Story />
      </div>
    ),
  ],
};
