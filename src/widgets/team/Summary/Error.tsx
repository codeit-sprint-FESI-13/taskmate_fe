"use client";

import Button from "@/shared/ui/Button/Button/Button";

interface Props {
  error: Error;
  onReset: () => void;
}

export default function SummaryError({ error, onReset }: Props) {
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-[28px] bg-white px-6 py-20">
      <p className="typography-body-2 text-label-strong font-semibold">
        팀 요약 정보를 불러오지 못했어요
      </p>
      <p className="typography-label-2 text-center text-gray-400">
        {error.message || "잠시 후 다시 시도해주세요."}
      </p>
      <Button
        variant="secondary"
        size="md"
        className="mt-3"
        onClick={onReset}
      >
        다시 시도
      </Button>
    </div>
  );
}
