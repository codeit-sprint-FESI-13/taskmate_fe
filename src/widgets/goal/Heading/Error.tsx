"use client";

import Button from "@/shared/ui/Button/Button/Button";

interface Props {
  error: Error;
  onReset: () => void;
}

export default function Error({ error, onReset }: Props) {
  return (
    <div className="flex flex-col items-start gap-[3px] px-2">
      <h1 className="typography-heading-2 font-semibold text-gray-400">
        {error.message}
      </h1>

      <Button onClick={onReset}>다시 요청하기</Button>
    </div>
  );
}
