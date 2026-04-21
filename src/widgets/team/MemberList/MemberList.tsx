"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTeamId } from "@/features/team/hooks/useTeamId";
import { useTeamLeaveModal } from "@/features/team/hooks/useTeamLeaveModal";
import { teamQueries } from "@/features/team/query/team.queryKey";
import { formatMemberList } from "@/features/team/utils/formatMemberList";
import { userQueries } from "@/features/user/user.queryKey";
import TextButton from "@/shared/ui/Button/TextButton/TextButton";
import { Icon } from "@/shared/ui/Icon";

import Member from "./Member";

export default function MemberListComponent() {
  const teamId = useTeamId();
  const { openLeaveTeamModal } = useTeamLeaveModal(teamId);

  const { data: members } = useSuspenseQuery(teamQueries.memberList(teamId));
  const { data: me } = useSuspenseQuery(userQueries.myInfo());

  const formattedMembers = formatMemberList(members, me.id);
  const isMeAdmin = members.some(
    (member) => member.userId === me.id && member.role === "ADMIN",
  );

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
            {members.length}명
          </span>
        </div>

        {isMeAdmin && (
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
        )}
      </div>

      <div className="tablet:grid-cols-2 tablet:gap-4 desktop:grid-cols-4 desktop:gap-6 grid w-full grid-cols-1 gap-3 *:min-w-0">
        {formattedMembers.map((member) => (
          <Member
            key={member.userId}
            avatar={member.profileImageUrl ?? ""}
            nickName={member.userNickname}
            email={member.userEmail}
            isAdmin={member.role === "ADMIN"}
            isMe={member.userId === me.id}
          />
        ))}
      </div>
    </div>
  );
}
