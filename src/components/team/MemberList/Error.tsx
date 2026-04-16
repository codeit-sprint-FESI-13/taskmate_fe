"use client";

import Button from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon";

interface Props {
  error: Error;
  onReset: () => void;
}

export default function MemberListError({ error, onReset }: Props) {
  return (
    <div className="flex w-full flex-col items-start gap-5 rounded-3xl bg-white p-6">
      <div className="flex w-full items-center justify-start gap-3">
        <Icon
          name="People"
          size={40}
        />
        <h2 className="typography-body-1 text-label-neutral font-medium">
          멤버
        </h2>
      </div>

      <div className="flex w-full flex-col items-center gap-2 rounded-2xl bg-gray-50 px-6 py-8">
        <p className="typography-body-2 text-label-strong font-semibold">
          멤버 정보를 불러오지 못했어요
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
    </div>
  );
}
