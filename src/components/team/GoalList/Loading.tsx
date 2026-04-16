"use client";

import { Icon } from "@/components/common/Icon";
import Spinner from "@/components/common/Spinner";

export default function GoalListLoading() {
  return (
    <div className="flex w-full flex-col items-start gap-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <Icon
            name="FlagGreen"
            size={40}
          />
          <h2 className="typography-body-1 text-label-neutral font-medium">
            목표
          </h2>
        </div>
      </div>

      <div className="flex h-[300px] w-full items-center justify-center">
        <Spinner size={40} />
      </div>
    </div>
  );
}
