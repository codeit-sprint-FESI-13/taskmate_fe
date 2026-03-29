import { Icon } from "@/components/common/Icon";
import Input from "@/components/common/Input";
import { Toggle } from "@/components/common/Toggle";

export const TodoList = () => {
  return (
    <div className="flex w-full flex-col gap-[32px]">
      <div className="flex w-full items-center justify-between">
        <Input
          placeholder="할 일을 이름으로 검색해보세요."
          className="w-[360px]"
          rightIcon={
            <div>
              <Icon
                name="Search"
                size={24}
                className="text-gray-300"
              />
            </div>
          }
        />

        <div className="flex items-center justify-center gap-[10px]">
          <span className="typography-body-1 font-semibold text-blue-800">
            내 할일만 보기
          </span>

          <Toggle />
        </div>
      </div>

      <div className="grid min-h-[480px] w-full grid-cols-2 grid-rows-[1fr_1fr] gap-[32px]">
        <section className="row-span-2 flex min-h-0 flex-col rounded-4xl bg-white p-8">
          {/* @TODO: 할 일 목록 */}
        </section>
        <section className="bg-background-normal-alternative min-h-0 rounded-4xl p-6">
          {/* @TODO: 우측 상단 패널 */}
        </section>
        <section className="bg-background-normal-alternative min-h-0 rounded-4xl p-6">
          {/* @TODO: 우측 하단 패널 */}
        </section>
      </div>
    </div>
  );
};
