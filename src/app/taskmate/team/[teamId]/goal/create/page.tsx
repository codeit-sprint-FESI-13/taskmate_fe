import { TeamCreateForm } from "@/components/goal/CreateForm/TeamCreateForm";
import { Spacing } from "@/shared/ui/Spacing";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-start justify-center">
        <h1 className="typography-title-3 pl-2 font-semibold">
          새로운 목표를 생성해주세요
        </h1>

        <Spacing size={32} />

        <div className="mobile:w-[335px] tablet:w-[560px] mobile:p-4 flex flex-col rounded-4xl bg-white p-8 pt-10">
          <TeamCreateForm />
        </div>
      </div>
    </div>
  );
}
