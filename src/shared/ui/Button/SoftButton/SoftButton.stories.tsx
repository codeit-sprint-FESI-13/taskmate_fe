import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SoftButton from "@/shared/ui/Button/SoftButton";

const meta: Meta<typeof SoftButton> = {
  title: "Components/SoftButton",
  component: SoftButton,
  decorators: [
    (Story) => (
      <div className="w-[200px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["purple", "gray"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SoftButton>;

// 기본버튼 : purple
export const Default: Story = {
  args: {
    children: "보라색버튼",
    variant: "purple",
  },
};

// gray
export const Gray: Story = {
  args: {
    children: "회색버튼",
    variant: "grayActive",
  },
};

// disabled
export const Disabled: Story = {
  args: {
    children: "보라색버튼",
    variant: "purple",
    disabled: true,
  },
};
