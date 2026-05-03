"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { userQueries } from "@/entities/auth/query/user.queryKey";
import { dashboardQueryOptions } from "@/entities/dashboard";
import { CircularProgress } from "@/shared/ui/CircularProgress";
import { Icon } from "@/shared/ui/Icon";
import Slider from "@/widgets/home/Slider/Slider";

export default function ProgressSection() {
  const { data: me } = useSuspenseQuery(userQueries.myInfo());
  const { data: progress } = useSuspenseQuery(dashboardQueryOptions.progress());

  return (
    <div className="tablet:flex-row flex w-full flex-col gap-8">
      {/* 팀 진행상황 */}
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="flex w-full items-center gap-3">
          <Icon
            name="PipeGreen"
            size={24}
            className="tablet:hidden"
          />
          <Icon
            name="PipeGreen"
            size={40}
            className="tablet:block hidden"
          />
          <h2 className="typography-label-1 tablet:typography-body-2 desktop:typography-body-1 font-medium text-black">
            팀 진행 상황
          </h2>
        </div>
        <div className="w-full">
          <Slider>
            {progress.teamProgress.map(
              ({ teamId, teamName, todayProgressPercent }) => (
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
                    className="desktop:block hidden"
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
                    className="desktop:block absolute right-0 bottom-0 hidden"
                  />
                  <Icon
                    name="GreenCharacter"
                    size={100}
                    className="desktop:hidden absolute right-0 bottom-0 block"
                  />
                </div>
              ),
            )}
          </Slider>
        </div>
      </div>

      {/* 내 진행 상황 */}
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex w-full items-center gap-3">
          <Icon
            name="PipeBlue"
            size={24}
            className="tablet:hidden"
          />
          <Icon
            name="PipeBlue"
            size={40}
            className="tablet:block hidden"
          />
          <h2 className="typography-label-1 tablet:typography-body-2 desktop:typography-body-1 font-medium text-black">
            내 진행 상황
          </h2>
        </div>

        <div className="desktop:h-64 desktop:gap-8 desktop:px-10 relative flex h-35 w-full items-center justify-start gap-4 overflow-hidden rounded-3xl bg-blue-700 px-4 py-12">
          <CircularProgress
            value={progress.myProgressPercent}
            size="md"
            color="blue"
            variant="on-color"
            className="desktop:hidden block"
          />
          <CircularProgress
            value={progress.myProgressPercent}
            size="xl"
            color="blue"
            variant="on-color"
            className="desktop:block hidden"
          />
          <div className="tablet:gap-1 z-10 flex flex-col">
            <div className="typography-body-2 desktop:typography-title-3 text-inverse-normal flex items-center font-semibold">
              <span className="inline-block max-w-51 truncate">
                {me.nickname}
              </span>
              님의 진행도는
            </div>
            <div className="typography-title-3 desktop:typography-title-2 text-inverse-normal">
              <span className="text-inverse-normal desktop:text-[80px] text-5xl font-bold">
                {progress.myProgressPercent}
              </span>
              %
            </div>
          </div>
          <Icon
            name="BlueCharacter"
            size={225}
            className="desktop:block absolute right-0 bottom-0 hidden"
          />
          <Icon
            name="BlueCharacter"
            size={100}
            className="desktop:hidden absolute right-0 bottom-0 block"
          />
        </div>
      </div>
    </div>
  );
}
