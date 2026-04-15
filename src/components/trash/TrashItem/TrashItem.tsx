import React from "react";

import { Icon } from "@/components/common/Icon";

import TrashBadge from "./TrashBadge";

const data = {
  content: [
    {
      itemType: "GOAL",
      id: 42,
      deletedAt: "2026-04-15T02:17:29.290Z",
      goalName: "이번 주 운동",
      todoTitle: "러닝 30분",
    },
  ],
  page: 0,
  size: 7,
  totalElements: 24,
  totalPages: 4,
};

function TrashItem() {
  return (
    <div className="bg-background-normal flex items-center gap-4 rounded-2xl px-2.5 py-2">
      <div className="flex">
        <Icon
          name={"InactiveFilledCheckBox"}
          className="tablet:size-6 size-5 cursor-pointer"
        />
        <Icon
          name={"ActiveFilledCheckBox"}
          className="tablet:size-6 size-5 cursor-pointer"
        />
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="flex min-w-0 items-center">
          <TrashBadge type={"goal"} />
          <TrashBadge type={"todo"} />
          <span className="text-label-1 truncate font-semibold text-slate-800">
            강의 내용을 Notion이나 문서에 요약 정리 강의
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon
            name="Paper"
            className="size-3 text-gray-300"
          />
          <span className="text-label-2 font-medium text-gray-500">
            디자인 시스템
          </span>
        </div>
      </div>
    </div>
  );
}

export default TrashItem;
