import React from "react";

import AsyncBoundary from "@/components/common/AsyncBoundary";
import MyProfileForm from "@/components/my/MyProfileForm";

const Mypage = () => {
  return (
    <div className="tablet:max-w-[560px] mx-auto w-full max-w-[335px]">
      <AsyncBoundary>
        <MyProfileForm />
      </AsyncBoundary>
    </div>
  );
};

export default Mypage;
