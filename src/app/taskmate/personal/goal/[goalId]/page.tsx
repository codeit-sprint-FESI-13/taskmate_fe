import { Spacing } from "@/components/common/Spacing";
import Summary from "@/components/goal/Summary";
import { TodoSection } from "@/components/team/TodoSection";

export default function Page() {
  return (
    <>
      {/* @TODO: 사용자 정보(닉네임) 데이터와 연결하기 ( 재인님 설정 )*/}
      <div className="flex flex-col items-start gap-[6px] px-2">
        <h1 className="typography-title-2 text-gray-400">두잉두잉님</h1>
        <span className="typography-title-2 text-label-neutral">
          목표와 할 일을 확인해보세요!
        </span>
      </div>

      <Spacing size={64} />

      <Summary />

      <Spacing size={56} />

      <TodoSection />
    </>
  );
}
