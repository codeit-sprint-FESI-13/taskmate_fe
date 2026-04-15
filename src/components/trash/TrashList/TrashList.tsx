import React from "react";

import TrashItem from "../TrashItem";

function TrashList() {
  return (
    <div className="bg-inverse-normal tablet:rounded-4xl tablet:h-[733px] tablet:pr-5 h-[646px] w-full rounded-3xl pt-4 pr-2 pl-5">
      <TrashItem />
    </div>
  );
}

export default TrashList;
