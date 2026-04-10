"use client";

import Button from "@/components/common/Button/Button";
import { cn } from "@/utils/utils";

interface Props {
  error: Error;
  onReset: () => void;
}

export default function GoalInfoError({ error, onReset }: Props) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-start gap-3 rounded-4xl bg-white p-5",
        "tablet:gap-6",
        "desktop:flex-row desktop:items-center desktop:gap-5 desktop:px-8",
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
