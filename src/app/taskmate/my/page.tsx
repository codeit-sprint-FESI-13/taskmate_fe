export const dynamic = "force-dynamic";
import React from "react";

import AsyncBoundary from "@/components/common/AsyncBoundary";
import MyProfileForm from "@/components/my/MyProfileForm";

const Mypage = () => {
  return (
    <AsyncBoundary>
      <MyProfileForm />
    </AsyncBoundary>
  );
};

export default Mypage;
