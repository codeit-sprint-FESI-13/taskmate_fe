"use client";

import { Icon } from "@/components/common/Icon";
import TextButton from "@/components/common/TextButton/TextButton";
import { useTeamId } from "@/features/team/hooks/useTeamId";
import { useTeamLeaveModal } from "@/features/team/hooks/useTeamLeaveModal";

// @TODO: GET memberList API 적용 ( 효진님 작업 이후 반영 => 중복 작업 )
// @TODO: 목표 목록 조회 시 무한 스크롤 처리 (useSuspenseInfiniteQuery)
export const MemberList = () => {
  const teamId = useTeamId();
  const { openLeaveTeamModal } = useTeamLeaveModal(teamId);

  return (
    <div className="flex w-full flex-col items-start gap-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <Icon
            name="People"
            size={40}
          />
          <h2 className="typography-body-1 text-label-neutral font-medium">
            멤버
          </h2>
          <span className="typography-body-1 ml-[-8px] font-medium text-gray-400">
            6명
          </span>
        </div>
        <TextButton onClick={openLeaveTeamModal}>
          <span className="typography-body-2 flex shrink-0 items-center justify-center gap-[5px] font-semibold">
            <Icon
              name="Out"
              size={16}
              className="text-gray-500"
            />
            팀 나가기
          </span>
        </TextButton>
      </div>

      {/* @TODO: MemberList 컴포넌트 전달 받고 UI 완성 가능 */}
      <div className="grid w-full grid-cols-4 gap-4"></div>
    </div>
  );
};
