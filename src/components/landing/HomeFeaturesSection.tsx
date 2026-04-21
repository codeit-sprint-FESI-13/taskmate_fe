"use client";

import Image from "next/image";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Icon } from "@/shared/ui/Icon";
import { Spacing } from "@/shared/ui/Spacing";
import { cn } from "@/shared/utils/styles/cn";

import { FeatureBullet } from "./FeatureBullet";

export function HomeFeaturesSection() {
  const breakpoint = useBreakpoint();

  return (
    <section
      className={cn(
        "relative w-full bg-blue-800 px-10 pt-10 pb-[30px]",
        "desktop:px-16 desktop:pt-14 desktop:pb-12",
      )}
    >
      <div className="desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-12 mx-auto flex w-full max-w-[1280px] flex-col">
        <div className="desktop:max-w-[560px] flex w-full flex-col">
          <span
            className={cn(
              "self-start text-[16px] font-semibold text-blue-300",
              "tablet:text-[20px]",
              "desktop:text-[30px]",
            )}
          >
            더 똑똑한 할 일 관리
          </span>

          <Spacing size={16} />

          <div className="flex w-full flex-col items-start gap-1">
            <h1
              className={cn(
                "text-inverse-normal text-xl font-bold tracking-[-0.6px]",
                "tablet:text-[28px]",
                "desktop:text-[48px]",
              )}
            >
              테스크메이트 200%
            </h1>
            <h1
              className={cn(
                "text-inverse-normal text-xl font-bold tracking-[-0.6px]",
                "tablet:text-[28px]",
                "desktop:text-[48px]",
              )}
            >
              활용하기
            </h1>
          </div>

          <Spacing size={40} />

          <div className="flex w-full flex-col items-start gap-3">
            <FeatureBullet
              icon={
                <Icon
                  name="FlagBlue"
                  size={breakpoint === "mobile" ? 24 : 40}
                />
              }
            >
              목표 기반 진행도 시각화
            </FeatureBullet>
            <FeatureBullet
              icon={
                <StatusChartIcon size={breakpoint === "mobile" ? 24 : 40} />
              }
            >
              상태별 작업 관리
            </FeatureBullet>
            <FeatureBullet
              icon={
                <Icon
                  name="People"
                  size={breakpoint === "mobile" ? 24 : 40}
                />
              }
            >
              팀 기반 협업 주도
            </FeatureBullet>
          </div>
        </div>

        <Spacing
          size={8}
          className="desktop:hidden"
        />

        <div className="desktop:max-w-[640px] desktop:flex-1 w-full">
          <Image
            src="/images/TodoListMockup.png"
            alt="Todo List Mockup"
            width={1469}
            height={1056}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

function StatusChartIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        width={24}
        height={24}
        rx={8}
        fill="#DBD9FF"
      />
      <path
        d="M17.0921 12.5563C17.6444 12.5563 18.0998 13.0065 18.017 13.5526C17.8714 14.5131 17.5163 15.4342 16.972 16.2487C16.2417 17.3417 15.2038 18.1935 13.9893 18.6966C12.7749 19.1996 11.4386 19.3312 10.1494 19.0748C8.86013 18.8183 7.6759 18.1853 6.74642 17.2559C5.81694 16.3264 5.18395 15.1421 4.92751 13.8529C4.67107 12.5637 4.80268 11.2274 5.30571 10.0129C5.80874 8.79851 6.6606 7.76052 7.75355 7.03024C8.56805 6.486 9.48919 6.13087 10.4497 5.98524C10.9958 5.90246 11.446 6.35787 11.446 6.91016V11.5563C11.446 12.1086 11.8937 12.5563 12.446 12.5563H17.0921Z"
        fill="#6C63FF"
      />
      <path
        d="M7.45353 16.5487C7.063 16.9393 6.42263 16.943 6.09506 16.4983C5.51884 15.7161 5.11862 14.8137 4.92751 13.8529C4.67107 12.5637 4.80268 11.2274 5.30571 10.0129C5.80874 8.79851 6.6606 7.76052 7.75355 7.03024C8.56805 6.486 9.48919 6.13087 10.4497 5.98524C10.9958 5.90246 11.446 6.35787 11.446 6.91016V12.1421C11.446 12.4073 11.3406 12.6617 11.1531 12.8492L7.45353 16.5487Z"
        fill="#918AFF"
      />
      <path
        d="M12.5534 5.80078C12.5534 5.2485 13.0036 4.79309 13.5496 4.87587C14.0796 4.95623 14.5992 5.1006 15.0968 5.30669C15.9031 5.64069 16.6358 6.13024 17.2529 6.7474C17.8701 7.36455 18.3596 8.09721 18.6936 8.90356C18.8997 9.4011 19.0441 9.92067 19.1244 10.4507C19.2072 10.9967 18.7518 11.4469 18.1995 11.4469L13.5534 11.4469C13.0011 11.4469 12.5534 10.9992 12.5534 10.4469V5.80078Z"
        fill="#5A4FFF"
      />
    </svg>
  );
}
