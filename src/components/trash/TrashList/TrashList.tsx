import React from "react";

import SoftButton from "@/components/common/SoftButton";

import TrashItem from "../TrashItem";

function TrashList() {
  return (
    <div>
      <div className="bg-inverse-normal tablet:rounded-4xl tablet:h-[733px] tablet:pr-5 h-[646px] w-full rounded-3xl pt-4 pr-2 pl-5">
        <TrashItem />
      </div>
      <div className="tablet:mt-6 mt-5 flex w-full justify-between">
        <SoftButton
          variant={"purple"}
          className="tablet:w-[108px] flex w-[90px] items-center justify-center whitespace-nowrap"
        >
          전체 선택
        </SoftButton>
        <div className="flex gap-2">
          <SoftButton
            variant={"gray"}
            className="tablet:w-[90px] w-20 whitespace-nowrap"
          >
            복구
          </SoftButton>
          <SoftButton
            variant={"gray"}
            className="tablet:w-[90px] w-20 whitespace-nowrap"
          >
            삭제
          </SoftButton>
        </div>
      </div>
    </div>
  );
}

export default TrashList;
