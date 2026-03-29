import { CircularProgress } from "@/components/common/CircularProgress";
import { Icon } from "@/components/common/Icon";

// @TODO: 목표 정보 가져오기 (목표 이름 / 목표 기간 / 남은 날짜 / 진행률 )
// @TODO: 사용자 정보(이름) 가져오기
export const Summary = () => {
  return (
    <div className="flex w-full items-center gap-8">
      <div className="relative flex w-[55%] items-start gap-5 rounded-4xl bg-white px-8 py-[52px]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-200">
          <Icon
            name="GoalFlag"
            size={30}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-3 pr-10">
          <span className="typography-title-2 block w-full min-w-0 truncate font-semibold">
            자바스크립트로 웹서비스 만들기
          </span>
          <div className="flex items-center justify-start gap-3">
            <span className="typography-body-1 text-label-alternative">
              2026. 04. 01 까지
            </span>
            <span className="typography-body-1 text-label-alternative rounded-lg bg-gray-100 px-[10px] py-1">
              D-10
            </span>
          </div>
        </div>

        {/* @TODO: 메뉴 버튼 > 삭제 기능  */}
        <button
          type="button"
          className="shrink-0"
        >
          <Icon
            name="Kebab"
            size={24}
            className="absolute top-[52px] right-8 text-gray-300"
          />
        </button>
      </div>

      <div className="flex h-[180px] w-[40%] items-start justify-start gap-8 rounded-4xl bg-blue-800 py-[30px] pl-[40px]">
        <CircularProgress
          value={72}
          size="lg"
          color="blue"
          variant="on-color"
        />
        <div className="flex flex-col justify-start gap-[2px] pt-2">
          <span className="typography-title-3 w-full font-semibold text-ellipsis whitespace-nowrap text-white">
            두잉두잉님의 진행도는
          </span>
          <span className="text-[56px] leading-[74px] font-medium tracking-[-1.68px] text-white">
            72<span className="typography-title-3 pl-1 font-semibold">%</span>
          </span>
        </div>
      </div>
    </div>
  );
};
