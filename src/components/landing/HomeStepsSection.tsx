import { cn } from "@/utils/utils";

import {
  ClipboardIllustration,
  GoalTargetIllustration,
  KanbanIllustration,
} from "./illustrations/StepIllustrations";
import { StepCard } from "./StepCard";

const steps = [
  {
    step: 1,
    title: "목표 설정하기",
    illustration: <GoalTargetIllustration />,
    description: (
      <>
        달성하고 싶은 목표를 만들고
        <br />
        이름을 정하세요
      </>
    ),
  },
  {
    step: 2,
    title: "할 일 추가하기",
    illustration: <ClipboardIllustration />,
    description: (
      <>
        스페이스 별 목표에 맞는
        <br />할 일을 추가하세요
      </>
    ),
  },
  {
    step: 3,
    title: "진행상황 관리하기",
    illustration: <KanbanIllustration />,
    description: (
      <>
        팀원들과 함께 목표를 관리하고
        <br />
        진행상황을 확인하세요
      </>
    ),
  },
] as const;

export function HomeStepsSection() {
  return (
    <section className="bg-background-normal-alternative-2 flex w-full flex-col items-center justify-start gap-12 px-10 py-12">
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <span
          className={cn(
            "text-[16px] font-bold tracking-[-0.48px] text-green-900",
            "tablet:text-[20px]",
            "desktop:text-[30px]",
          )}
        >
          목표 설정부터 기록까지
        </span>

        <h1
          className={cn(
            "text-label-neutral text-xl font-bold tracking-[-0.6px]",
            "tablet:text-[28px]",
            "desktop:text-[48px]",
          )}
        >
          쉽고 빠르게 할 일을 시작해요
        </h1>
      </div>

      <div
        className={cn(
          "flex w-full flex-col items-center justify-start gap-4",
          "tablet:flex-row",
        )}
      >
        {steps.map(({ step, title, illustration, description }) => (
          <StepCard
            key={step}
            step={step}
            title={title}
            illustration={illustration}
            description={description}
          />
        ))}
      </div>
    </section>
  );
}
