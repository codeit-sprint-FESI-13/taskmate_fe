"use client";

import Button from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon";
import { Modal } from "@/components/common/Modal";
import { useOverlay } from "@/hooks/useOverlay";

const TODO_DETAIL_MODAL_ID = "todo-detail-modal";

const TodoDetailModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal.Root onClose={onClose}>
      <Modal.Backdrop />
      <div className="relative z-10 flex w-full max-w-[488px] flex-col items-start gap-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex w-fit items-center justify-start gap-[6px]">
          <h2 className="typography-heading-2 font-semibold">
            자바스크립트 기초 챕터1 듣기
          </h2>
          <span className="typography-label-2 rounded-lg bg-gray-100 px-[10px] py-1 font-semibold text-gray-400">
            프론트엔드 1팀
          </span>
        </div>

        <div className="mt-2 grid grid-cols-[100px_1fr] gap-x-4 gap-y-3">
          <div className="flex items-center justify-start gap-[6px]">
            <Icon
              name="Flag"
              size={16}
              className="text-gray-400"
            />
            <span className="typography-label-1 font-medium text-gray-400">
              목표
            </span>
          </div>
          <span className="typography-label-1 text-label-neutral font-medium">
            자바스크립트로 웹서비스 만들기
          </span>

          <div className="flex items-center justify-start gap-[6px]">
            <Icon
              name="Calendar"
              size={16}
              className="text-gray-400"
            />
            <span className="typography-label-1 font-medium text-gray-400">
              시작 날짜
            </span>
          </div>
          <span className="typography-label-1 text-label-neutral font-medium">
            2026. 03. 30
          </span>

          <div className="flex items-center justify-start gap-[6px]">
            <Icon
              name="Calendar"
              size={16}
              className="text-gray-400"
            />
            <span className="typography-label-1 font-medium text-gray-400">
              마감 날짜
            </span>
          </div>
          <span className="typography-label-1 text-label-neutral font-medium">
            2026. 03. 30
          </span>
        </div>

        <div className="flex w-full flex-col items-start gap-[5px]">
          <h3 className="typography-body-2 font-semibold">담당자</h3>
          <div className="flex max-h-[120px] w-full flex-wrap items-start justify-start gap-4 overflow-y-scroll rounded-2xl border border-gray-300 px-4 py-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 items-center gap-1"
              >
                <Icon
                  name="User"
                  size={32}
                  className="text-gray-400"
                />
                <span className="typography-label-1 shrink-0 font-semibold">
                  두잉두딩
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-[5px]">
          <h3 className="typography-body-2 font-semibold">메모</h3>
          <div className="flex max-h-[120px] w-full flex-wrap items-start justify-start gap-4 overflow-y-scroll rounded-2xl border border-gray-300 px-4 py-3">
            <span className="typography-body-2 text-label-normal">
              자바스크립트 기초 챕터1 듣기
            </span>
          </div>
        </div>

        <Button
          size="xl"
          className="mt-2 w-full"
          onClick={onClose}
        >
          닫기
        </Button>
      </div>
    </Modal.Root>
  );
};

export const useTodoDetailModal = () => {
  const overlay = useOverlay();

  const closeTodoDetailModal = () => {
    overlay.close();
  };

  const openTodoDetailModal = () => {
    overlay.open(
      TODO_DETAIL_MODAL_ID,
      <TodoDetailModal onClose={closeTodoDetailModal} />,
    );
  };

  return {
    openTodoDetailModal,
    closeTodoDetailModal,
  };
};
