"use client";

import Spinner from "@/components/common/Spinner";

export default function MemberListLoading() {
  return (
    <div className="flex h-[220px] w-full items-center justify-center">
      <Spinner size={40} />
    </div>
  );
}
