"use client";

import Spinner from "@/shared/ui/Spinner";

import { Wrapper } from "./Wrapper";

export const Loading = () => {
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center gap-3">
        <Spinner
          size={48}
          aria-label="할 일 목록 로딩 중"
        />
        <p className="text-label-1 text-label-normal text-center font-medium">
          할 일 목록을 불러오고 있어요
        </p>
      </div>
    </Wrapper>
  );
};
