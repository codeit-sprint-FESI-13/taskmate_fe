"use client";

import Button from "@/shared/ui/Button/Button/Button";
import { Icon } from "@/shared/ui/Icon";

import { Wrapper } from "./Wrapper";

interface TodoSectionErrorProps {
  error: Error;
  onReset: () => void;
}

export const Error = ({ error, onReset }: TodoSectionErrorProps) => {
  return (
    <Wrapper>
      <div
        className="flex max-w-md flex-col items-center justify-center gap-6"
        role="alert"
      >
        <Icon
          name="AlertError"
          size={48}
          aria-hidden
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="typography-heading-2 font-semibold text-gray-500">
            할 일 목록을 불러오지 못했어요
          </p>
          <p className="text-body-1 font-medium wrap-break-word text-gray-400">
            {error.message}
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={onReset}
        >
          <span className="typography-label-1 font-semibold text-white">
            다시 요청하기
          </span>
        </Button>
      </div>
    </Wrapper>
  );
};
