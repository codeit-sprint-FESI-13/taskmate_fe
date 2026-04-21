import React from "react";

import AsyncBoundary from "@/shared/ui/AsyncBoundary";
import Trash from "@/widgets/trash";

const TrashPage = () => {
  return (
    <div className="tablet:max-w-[560px] tablet:pl-6 mx-auto w-full max-w-[335px]">
      <AsyncBoundary>
        <Trash />
      </AsyncBoundary>
    </div>
  );
};

export default TrashPage;
