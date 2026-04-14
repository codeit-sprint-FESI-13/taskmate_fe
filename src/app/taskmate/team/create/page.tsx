import { Spacing } from "@/components/common/Spacing";
import { CreateForm } from "@/components/team/createForm";

export default function Page() {
  return (
    <div className="mobile:px-10 flex h-screen w-full items-center justify-center px-5">
      <div className="flex flex-col items-start justify-center">
        <h1 className="typography-title-3 pl-2 font-semibold">
          새로운 팀을 생성해주세요
        </h1>

        <Spacing size={32} />

        <div className="mobile:w-[335px] tablet:w-[560px] mobile:p-8 mobile:pt-10 flex max-w-full flex-col rounded-4xl bg-white p-4">
          <CreateForm.Form />

          <Spacing size={16} />
          <CreateForm.Cancel />
        </div>
      </div>
    </div>
  );
}
