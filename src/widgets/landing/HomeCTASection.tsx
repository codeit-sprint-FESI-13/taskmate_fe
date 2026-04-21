"use client";

import { useRouter } from "next/navigation";
import { useId } from "react";

import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import Button from "@/shared/ui/Button/Button/Button";
import { cn } from "@/shared/utils/styles/cn";

import { LandingCTADecorations } from "./LandingCTADecorations";

export function HomeCTASection() {
  const rawId = useId();
  const clipPathId = `landing-cta-${rawId.replace(/:/g, "")}`;

  const breakpoint = useBreakpoint();
  const router = useRouter();

  return (
    <section
      className={cn(
        "bg-background-normal w-full px-5 py-6",
        "tablet:px-12 tablet:py-8",
        "desktop:px-16 desktop:py-10",
      )}
    >
      <div
        className={cn(
          "relative flex h-[220px] flex-col items-center justify-center gap-6 rounded-3xl bg-blue-100",
          "tablet:h-[280px]",
          "desktop:h-[560px]",
        )}
      >
        <div className="flex flex-col items-center justify-start gap-1">
          <span
            className={cn(
              "text-[14px] leading-[24px] font-semibold tracking-[-0.42px] text-blue-800",
              "tablet:text-[16px]",
              "desktop:text-[30px] desktop:leading-[36px]",
            )}
          >
            개인 할일부터 팀 목표까지
          </span>
          <span
            className={cn(
              "text-label-neutral text-[18px] leading-[24px] font-bold tracking-[-0.54px]",
              "tablet:text-[22px] tablet:leading-[32px]",
              "desktop:text-[48px] desktop:leading-[64px]",
            )}
          >
            테스크메이트로 만들고 관리해보세요
          </span>
        </div>
        <Button
          variant="primary"
          size={
            breakpoint === "desktop"
              ? "xxl"
              : breakpoint === "tablet"
                ? "lg"
                : "md"
          }
          className="w-[100px] whitespace-nowrap"
          onClick={() => {
            router.push("/taskmate");
          }}
        >
          시작하기
        </Button>

        <LandingCTADecorations clipPathId={clipPathId} />
      </div>
    </section>
  );
}
