"use client";

import Spinner from "@/components/common/Spinner";

export default function SummaryLoading() {
  return (
    <div className="flex h-[332px] w-full items-center justify-center rounded-[28px] bg-white">
      <Spinner size={40} />
    </div>
  );
}
