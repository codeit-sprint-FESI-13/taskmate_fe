import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ConfirmModal from "./ConfirmModal";

const meta: Meta<typeof ConfirmModal> = {
  title: "Components/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    title: "타이틀",
    confirmLabel: "확인",
    cancelLabel: "취소",
    description: "상세설명",
    info: "인포",
    onConfirm: () => {},
    onClose: () => {},
  },
};

export const Logout: Story = {
  args: {
    title: "로그아웃 하시겠어요?",
    confirmLabel: "로그아웃",
    cancelLabel: "취소",
    onConfirm: () => {},
    onClose: () => {},
  },
};
