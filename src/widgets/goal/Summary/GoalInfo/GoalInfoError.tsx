"use client";

import Button from "@/shared/ui/Button/Button/Button";
import { cn } from "@/shared/utils/styles/cn";

interface Props {
  error: Error;
  onReset: () => void;
}

export default function GoalInfoError({ error, onReset }: Props) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-start gap-3 rounded-4xl bg-white p-5",
        "flex-col items-center justify-center gap-4",
      )}
    >
      <h1 className="typography-heading-2 font-semibold text-black">
        {error.message}
      </h1>

      <Button onClick={onReset}>다시 요청하기</Button>
    </div>
  );
}
