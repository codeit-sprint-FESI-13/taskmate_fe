import React from "react";

import MyProfileForm from "@/components/my/MyProfileForm";
import AsyncBoundary from "@/shared/ui/AsyncBoundary";

const Mypage = () => {
  return (
    <div className="tablet:max-w-[560px] tablet:pl-6 mx-auto w-full max-w-[335px]">
      <AsyncBoundary>
        <MyProfileForm />
      </AsyncBoundary>
    </div>
  );
};

export default Mypage;
