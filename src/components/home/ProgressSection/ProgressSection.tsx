import { useSuspenseQuery } from "@tanstack/react-query";

import { CircularProgress } from "@/components/common/CircularProgress";
import { Icon } from "@/components/common/Icon";
import { Spacing } from "@/components/common/Spacing";
import { userQueries } from "@/constants/queryKeys";

export default function ProgressSection() {
  const { data } = useSuspenseQuery(userQueries.myInfo());

  return (
    <div className="flex w-full gap-8">
      <div className="flex w-full flex-col gap-5">
        <div className="flex w-full items-center gap-3">
          <Icon
            name="PipeGreen"
            size={40}
          />
          <h2 className="typography-body-1 font-medium text-black">
            팀 진행 상황
          </h2>
        </div>

        <div className="relative flex h-[256px] w-full items-center justify-start gap-8 overflow-hidden rounded-[40px] bg-green-700 px-10 py-12">
          <CircularProgress
            value={74}
            size="xl"
            color="green"
            variant="on-color"
          />
          <div className="z-10 flex flex-col items-start justify-start gap-4">
            <span className="typography-title-3 text-inverse-normal font-semibold">
              프론트엔드 팀의 진행도는
            </span>
            <Spacing size={16} />
            <span className="typography-body-1 text-inverse-normal">
              <span className="text-inverse-normal text-[74px] font-bold">
                74
              </span>
              %
            </span>
          </div>

          <Icon
            name="GreenCharacter"
            size={225}
            className="absolute right-0 bottom-0"
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-5">
        <div className="flex w-full items-center gap-3">
          <Icon
            name="PipeBlue"
            size={40}
          />
          <h2 className="typography-body-1 font-medium text-black">
            내 진행 상황
          </h2>
        </div>

        <div className="relative flex h-[256px] w-full items-center justify-start gap-8 overflow-hidden rounded-[40px] bg-blue-700 px-10 py-12">
          <CircularProgress
            value={47}
            size="xl"
            color="blue"
            variant="on-color"
          />
          <div className="z-10 flex flex-col items-start justify-start gap-4">
            <span className="typography-title-3 text-inverse-normal font-semibold">
              {data.nickname}님의 진행도는
            </span>
            <Spacing size={16} />
            <span className="typography-body-1 text-inverse-normal">
              <span className="text-inverse-normal text-[74px] font-bold">
                47
              </span>
              %
            </span>
          </div>

          <Icon
            name="BlueCharacter"
            size={225}
            className="absolute right-0 bottom-0"
          />
        </div>
      </div>
    </div>
  );
}
