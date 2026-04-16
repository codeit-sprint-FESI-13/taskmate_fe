import Image from "next/image";

import { cn } from "@/utils/utils";

export function HomeTeamSpacesSection() {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center gap-8 bg-blue-800 py-[56px]",
        "tablet:flex-row tablet:justify-between tablet:px-12",
      )}
    >
      <Image
        src="/images/MessageGroup.png"
        alt="Message Group"
        width={688}
        height={475}
        className={cn("w-[159px]", "tablet:w-[266px]", "desktop:w-[738px]")}
      />
      <div className="flex flex-col items-center justify-start gap-3">
        <span
          className={cn(
            "text-[14px] leading-[24px] font-semibold tracking-[-0.42px] text-blue-400",
            "tablet:text-[18px] tablet:text-right tablet:self-end",
            "desktop:text-[30px]",
          )}
        >
          다양한 팀 스페이스
        </span>

        <span
          className={cn(
            "text-inverse-normal text-center text-[18px] leading-[24px] font-semibold tracking-[-0.54px]",
            "tablet:text-[24px] tablet:text-right tablet:leading-[32px]",
            "desktop:text-[48px] desktop:leading-[64px]",
          )}
        >
          여러 팀에 속해있다면
          <br /> 팀별로 페이지를 관리할 수 있어요
        </span>
      </div>
    </section>
  );
}
