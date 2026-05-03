"use client";

import { useTodoCreateModal } from "@/features/todo";
import Button from "@/shared/ui/Button/Button/Button";
import { Icon } from "@/shared/ui/Icon";

import { Wrapper } from "./Wrapper";

export const Empty = () => {
  const { openTodoCreateModal } = useTodoCreateModal();

  return (
    <Wrapper>
      <div className="flex max-w-sm flex-col items-center justify-center gap-6">
        <Icon
          name="Empty"
          size={120}
          className="shrink-0"
          aria-hidden
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="typography-heading-2 font-semibold text-gray-500">
            생성된 할 일이 없어요
          </p>
          <p className="typography-body-1 font-medium text-gray-400">
            새로운 할 일을 만들고 관리해보세요
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={openTodoCreateModal}
          leftIcon={
            <Icon
              name="Plus"
              size={24}
              className="text-white"
            />
          }
        >
          <span className="typography-label-1 font-semibold text-white">
            할 일 추가
          </span>
        </Button>
      </div>
    </Wrapper>
  );
};
