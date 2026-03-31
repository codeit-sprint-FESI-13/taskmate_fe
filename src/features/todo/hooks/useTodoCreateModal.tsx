"use client";

import { useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input";
import { Modal } from "@/components/common/Modal";
import { Spacing } from "@/components/common/Spacing";
import {
  type AssigneeMember,
  AssigneeSelect,
} from "@/components/todo/AssigneeSelect";
import { useOverlay } from "@/hooks/useOverlay";

const TODO_CREATE_MODAL_ID = "todo-create-modal";

const MOCK_TEAM_MEMBERS: AssigneeMember[] = [
  {
    id: "1",
    name: "두잉두딩",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=doing",
  },
  {
    id: "2",
    name: "김프론",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=kim",
  },
  {
    id: "3",
    name: "이백엔드",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=lee",
  },
  {
    id: "4",
    name: "박풀스택",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=park",
  },
  {
    id: "5",
    name: "이백엔드",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=lee",
  },
  {
    id: "6",
    name: "박풀스택",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=park",
  },
];

// @TODO: 데이터 연결 필요
const TodoCreateModal = ({ onClose }: { onClose: () => void }) => {
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Backdrop />
      <form className="relative z-10 flex w-full max-w-[488px] flex-col items-start rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex w-fit items-center justify-start gap-[6px]">
          <h2 className="typography-heading-2 font-semibold">
            자바스크립트 기초 챕터1 듣기
          </h2>
          <span className="typography-label-2 rounded-lg bg-gray-100 px-[10px] py-1 font-semibold text-gray-400">
            프론트엔드 1팀
          </span>
        </div>

        <Spacing size={32} />

        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              목표
            </label>
            <div className="w-full">
              <Input
                variant="disabled"
                type="text"
                name="goal"
                className="w-full"
                value="자바스크립트로 웹서비스 만들기"
                disabled
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              제목 <span className="typography-body-2 text-red-normal">*</span>
            </label>
            <div className="w-full">
              <Input
                type="text"
                name="title"
                className="w-full"
                placeholder="할 일 제목을 입력해주세요"
                required
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              시작 날짜{" "}
              <span className="typography-body-2 text-red-normal">*</span>
            </label>
            <div className="w-full">
              <Input
                type="date"
                name="startDate"
                className="w-full"
                placeholder="시작 날짜를 선택해주세요"
                required
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              마감 날짜{" "}
              <span className="typography-body-2 text-red-normal">*</span>
            </label>
            <div className="w-full">
              <Input
                type="date"
                name="endDate"
                className="w-full"
                placeholder="마감 날짜를 선택해주세요"
                required
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              담당자
            </label>
            <div className="w-full">
              <AssigneeSelect
                members={MOCK_TEAM_MEMBERS}
                value={assigneeIds}
                onChange={setAssigneeIds}
                placeholder="담당자를 선택해주세요"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <label className="typography-body-2 text-label-neutral font-semibold">
              메모
            </label>
            <div className="w-full">
              <textarea
                name="description"
                className="h-[120px] w-full resize-none rounded-xl border border-gray-300 p-3"
                placeholder="80자 이내로 입력해주세요"
                maxLength={80}
              />
            </div>
          </div>
        </div>

        <Spacing size={40} />

        <div className="flex w-full items-center justify-between gap-2">
          <button
            type="button"
            className="shadow-[0 0 14px 0 rgba(138, 138, 138, 0.08)] h-[64px] w-full cursor-pointer rounded-full border border-gray-300 px-4 py-3"
            onClick={onClose}
          >
            <span className="typography-body-2 font-semibold text-gray-400">
              취소
            </span>
          </button>
          <Button
            color="gray"
            size="xxl"
            className="w-full"
          >
            목표 생성
          </Button>
        </div>
      </form>
    </Modal.Root>
  );
};

export const useTodoCreateModal = () => {
  const overlay = useOverlay();

  const closeTodoCreateModal = () => {
    overlay.close();
  };

  const openTodoCreateModal = () => {
    overlay.open(
      TODO_CREATE_MODAL_ID,
      <TodoCreateModal onClose={closeTodoCreateModal} />,
    );
  };

  return {
    openTodoCreateModal,
    closeTodoCreateModal,
  };
};
