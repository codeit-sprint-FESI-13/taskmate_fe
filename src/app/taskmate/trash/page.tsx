import React from "react";

import AsyncBoundary from "@/components/common/AsyncBoundary";
import Trash from "@/components/trash";

const TrashPage = () => {
  return (
    <div className="tablet:max-w-[560px] mx-auto w-full max-w-[335px]">
      <AsyncBoundary>
        <Trash />
      </AsyncBoundary>
    </div>
  );
};

export default TrashPage;
