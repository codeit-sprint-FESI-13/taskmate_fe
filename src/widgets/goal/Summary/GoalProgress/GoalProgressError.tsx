"use client";

import Button from "@/shared/ui/Button/Button/Button";
import { cn } from "@/shared/utils/styles/cn";

interface Props {
  error: Error;
  onReset: () => void;
}

export default function GoalProgressError({ error, onReset }: Props) {
  return (
    <div
      className={cn(
        "flex h-[154px] w-full items-center justify-start rounded-4xl bg-blue-700 px-5 py-6",
        "tablet:p-6",
        "desktop:h-[184px] desktop:px-[30px] desktop:py-[40px]",
        "flex-col items-center justify-center gap-4",
      )}
    >
      <h1 className="typography-heading-2 font-semibold text-white">
        {error.message}
      </h1>

      <Button onClick={onReset}>다시 요청하기</Button>
    </div>
  );
}
