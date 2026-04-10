"use client";

import Button from "@/components/common/Button/Button";
import { cn } from "@/utils/utils";

interface Props {
  error: Error;
  onReset: () => void;
}

export default function GoalProgressError({ error, onReset }: Props) {
  return (
    <div
      className={cn(
        "flex h-[154px] w-full items-center justify-start gap-5 rounded-4xl bg-blue-700 px-5 py-6",
        "tablet:p-6",
        "desktop:h-[184px] desktop:gap-8 desktop:px-[30px] desktop:py-[40px]",
        "items-center justify-center",
      )}
    >
      <h1 className="typography-heading-2 font-semibold text-gray-400">
        {error.message}
      </h1>

      <Button onClick={onReset}>다시 요청하기</Button>
    </div>
  );
}
