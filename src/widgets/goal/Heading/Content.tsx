"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { userQueries } from "@/entities/auth/query/user.queryKey";

export default function HeadingContent() {
  const {
    data: { nickname },
  } = useSuspenseQuery(userQueries.myInfo());

  return (
    <div className="mobile:gap-[6px] flex flex-col items-start gap-[3px] px-2">
      <h1 className="typography-heading-2 mobile:typography-title-3 tablet:typography-title-2 font-semibold text-gray-400">
        {nickname}님!
      </h1>

      <span className="typography-heading-2 mobile:typography-title-3 tablet:typography-title-2 text-label-neutral font-semibold">
        목표와 할 일을 확인해보세요!
      </span>
    </div>
  );
}
