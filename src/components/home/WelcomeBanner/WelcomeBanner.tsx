"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

import { userQueries } from "@/constants/queryKeys";

const WelcomeBanner = () => {
  const { data } = useSuspenseQuery(userQueries.myInfo());
  return (
    <div className="text-heading-2 tablet:text-title-3 desktop:text-title-2 font-semibold">
      <p className="text-gray-400">안녕하세요!</p>
      <p className="text-label-normalfeat: 홈 화면 웰컴 배너 컴포넌트 구현">
        {data?.nickname}님, 오늘의 목표는 무엇인가요?
      </p>
    </div>
  );
};

export default WelcomeBanner;
