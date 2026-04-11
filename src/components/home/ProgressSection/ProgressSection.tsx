"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { CircularProgress } from "@/components/common/CircularProgress";
import { Icon } from "@/components/common/Icon";
import Slider from "@/components/home/Slider";
import { userQueries } from "@/constants/queryKeys";
import { progressApi } from "@/features/home/api";
import { ProgressItem } from "@/features/home/types";

export default function ProgressSection() {
  const { data } = useSuspenseQuery(userQueries.myInfo());
  // (팀/개인) progress usestate로 저장
  const [teamProgress, setTeamProgress] = useState<ProgressItem[]>([]);
  const [myProgressPercent, setMyProgressPercent] = useState(0);

  // (팀/개인) progress 데이터 요청
  useEffect(() => {
    (async () => {
      const res = await progressApi.read();
      setTeamProgress(res.data.teamProgress);
      setMyProgressPercent(res.data.myProgressPercent);
    })();
  }, []);

  return (
    <div className="tablet:flex-row flex w-full flex-col gap-8">
      {/* 팀 진행상황 */}
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        {/* 타이틀 */}
        <div className="flex w-full items-center gap-3">
          <Icon
            name="PipeGreen"
            size={24}
            className="tablet:hidden"
          />
          <Icon
            name="PipeGreen"
            size={40}
            className="mobile:hidden tablet:block"
          />
          <h2 className="typography-label-1 tablet:typography-body-2 desktop:typography-body-1 font-medium text-black">
            팀 진행 상황
          </h2>
        </div>
        {/* 카드 슬라이드 */}
        <div className="w-full">
          <Slider>
            {teamProgress.map(({ teamId, teamName, todayProgressPercent }) => (
              <div
                key={teamId}
                className="desktop:h-64 relative flex h-35 w-full items-center justify-start gap-4 overflow-hidden rounded-3xl bg-green-700 px-4 py-12"
              >
                <CircularProgress
                  value={todayProgressPercent}
                  size="md"
                  color="green"
                  variant="on-color"
                  className="mobile:block desktop:hidden"
                />
                <CircularProgress
                  value={todayProgressPercent}
                  size="xl"
                  color="green"
                  variant="on-color"
                  className="mobile:hidden desktop:block"
                />
                <div className="tablet:gap-1 z-10 flex flex-col">
                  <div className="typography-body-2 desktop:typography-title-3 text-inverse-normal flex items-center font-semibold">
                    <span className="inline-block max-w-51 truncate">
                      {teamName}
                    </span>
                    의 진행도는
                  </div>
                  <div className="typography-title-3 desktop:typography-title-2 text-inverse-normal">
                    <span className="text-inverse-normal desktop:text-[80px] text-5xl font-bold">
                      {todayProgressPercent}
                    </span>
                    %
                  </div>
                </div>

                <Icon
                  name="GreenCharacter"
                  size={225}
                  className="desktop:block mobile:hidden absolute right-0 bottom-0"
                />
                <Icon
                  name="GreenCharacter"
                  size={100}
                  className="desktop:hidden mobile:block absolute right-0 bottom-0"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* 내 진행 상황 */}
      <div className="flex flex-1 flex-col gap-5">
        {/* 타이틀 */}
        <div className="flex w-full items-center gap-3">
          <Icon
            name="PipeBlue"
            size={24}
            className="tablet:hidden"
          />
          <Icon
            name="PipeBlue"
            size={40}
            className="mobile:hidden tablet:block"
          />
          <h2 className="typography-label-1 tablet:typography-body-2 desktop:typography-body-1 font-medium text-black">
            내 진행 상황
          </h2>
        </div>

<<<<<<< HEAD
        <div className="relative flex h-64 w-full items-center justify-start gap-8 overflow-hidden rounded-[40px] bg-blue-700 px-10 py-12">
=======
        {/* 카드 */}
        <div className="desktop:h-64 desktop:gap-8 desktop:px-10 relative flex h-35 w-full items-center justify-start gap-4 overflow-hidden rounded-3xl bg-blue-700 px-4 py-12">
          {/* progress (반응형) */}
>>>>>>> fc9f52a (feat(#188) 메인 페이지 [팀 진행 상황 / 내 진행 상황])
          <CircularProgress
            value={myProgressPercent}
            size="md"
            color="blue"
            variant="on-color"
            className="mobile:block desktop:hidden"
          />
          <CircularProgress
            value={myProgressPercent}
            size="xl"
            color="blue"
            variant="on-color"
            className="mobile:hidden desktop:block"
          />

          {/* 텍스트 */}
          <div className="tablet:gap-1 z-10 flex flex-col">
            <div className="typography-body-2 desktop:typography-title-3 text-inverse-normal flex items-center font-semibold">
              <span className="inline-block max-w-51 truncate">
                {data.nickname}
              </span>
              님의 진행도는
            </div>

            <div className="typography-title-3 desktop:typography-title-2 text-inverse-normal">
              <span className="text-inverse-normal desktop:text-[80px] text-5xl font-bold">
                {myProgressPercent}
              </span>
              %
            </div>
          </div>

          {/* 캐릭터 */}
          <Icon
            name="BlueCharacter"
            size={225}
            className="desktop:block mobile:hidden absolute right-0 bottom-0"
          />
          <Icon
            name="BlueCharacter"
            size={100}
            className="desktop:hidden mobile:block absolute right-0 bottom-0"
          />
        </div>
      </div>
    </div>
  );
}
