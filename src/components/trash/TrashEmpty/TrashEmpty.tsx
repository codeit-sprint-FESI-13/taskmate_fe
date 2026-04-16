import React from "react";

import { Icon } from "@/components/common/Icon";

function TrashEmpty() {
  return (
    <div className="bg-inverse-normal tablet:h-[733px] tablet:gap-2 flex h-[502px] w-full flex-col items-center justify-center gap-4 rounded-4xl">
      <Icon
        name={"TrashEmpty"}
        className="tablet:size-36 size-20"
      />
      <div className="flex flex-col items-center">
        <span className="text-body-2 tablet:text-heading-2 font-semibold text-gray-500">
          휴지통이 비어있어요
        </span>
        <span className="text-label-1 tablet:text-body-1 font-medium text-gray-400">
          삭제된 할 일은 여기에서 확인할 수 있어요
        </span>
      </div>
    </div>
  );
}

export default TrashEmpty;
