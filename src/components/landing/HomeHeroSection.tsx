"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Icon } from "@/components/common/Icon";
import { cn } from "@/utils/utils";

export function HomeHeroSection() {
  const router = useRouter();

  return (
    <section
      className={cn(
        "relative flex w-full flex-col items-center justify-start gap-3 bg-blue-800",
        "h-[368px] pt-[68px]",
        "tablet:h-[620px] tablet:pt-[108px]",
        "desktop:h-[1080px] desktop:pt-[148px]",
      )}
    >
      <h3
        className={cn(
          "z-20 text-center text-[14px] font-semibold tracking-[-0.14px] text-blue-50",
          "mobile:text-[24px]",
        )}
      >
        목표부터 할일까지 함께 관리하는 플랫폼
      </h3>
      <Icon
        name="LogoWhiteText"
        size={209}
        className={cn(
          "z-20 h-[43px] w-[203px]",
          "mobile:h-[64px] mobile:w-[304px]",
          "tablet:h-[80px] tablet:w-[406px]",
          "desktop:h-[140px] desktop:w-[708px]",
        )}
      />
      <button
        type="button"
        className={cn(
          "z-20 mt-1 flex h-8 w-[101px] items-center justify-center gap-1 rounded-full bg-gray-800 px-[14px] py-[7px] text-[13px] leading-[18px] font-semibold tracking-[-0.13px] text-white shadow-[0_0_8px_0_rgba(43,43,43,0.08)]",
          "mobile:h-[32px] mobile:w-[101px] mobile:text-[16px]",
          "tablet:h-[40px] tablet:w-[126px] tablet:text-[18px]",
          "desktop:h-[56px] desktop:w-[151px] desktop:text-[20px]",
        )}
        onClick={() => {
          router.push("/taskmate");
        }}
      >
        시작하기
      </button>

      <div>
        <Image
          src="/images/FirstSectionBackground.png"
          alt="iPad 앱 화면 목업"
          width={750}
          height={346}
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 h-auto w-screen",
          )}
        />
      </div>
    </section>
  );
}
