import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Member from "./Member";

const meta = {
  title: "widgets/team/Member",
  component: Member,
  tags: ["autodocs"],
  args: {
    avatar: "",
    nickName: "홍길동",
    email: "hong@example.com",
    isMe: false,
  },
} satisfies Meta<typeof Member>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IsMe: Story = {
  args: { isMe: true },
};

export const NoEmail: Story = {
  args: { email: "" },
};

export const LongNickname: Story = {
  args: {
    nickName: "매우긴닉네임이너무나길어서말줄임표처리되는경우",
    isMe: true,
  },
};
