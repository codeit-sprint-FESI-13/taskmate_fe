"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import ConfirmModal from "@/components/management/ConfirmModal";
import ErrorModal from "@/components/management/ErrorModal";
import ProfileCard from "@/components/management/ProfileCard";
import { userQueries } from "@/constants/queryKeys/user.queryKey";
import { memberListApi } from "@/features/management/api";
import { memberApi } from "@/features/management/api";
import { memberRoleApi } from "@/features/management/api";
import { MemberData } from "@/features/management/types";
import { MemberRole } from "@/features/management/types";
import Dropdown from "@/hooks/useDropdown/Dropdown";
import { formatMemberList } from "@/utils/formatMemberList";

// @TODO: onInviteClick 함수를 Page에서 받아오는 방식 제거 ( Page가 갖는 책임 아님 )
interface MemberListProps {
  onInviteClick: () => void;
}

const MemberList = ({ onInviteClick }: MemberListProps) => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const router = useRouter();

  // @TODO: useTeamId 에서 처리
  const params = useParams<{ teamId: string }>();
  const teamId = Number(params.teamId);

  const [confirmMessage, setConfirmMessage] = useState("");
  const [roleChangeModalOpen, setRoleChangeModalOpen] = useState(false);
  const [memberDeleteModalOpen, setMemberDeleteModalOpen] = useState(false);
  // @TODO: pending? 이라는 변수명 이 적절한지 판단
  const [pending, setPending] = useState<{
    memberId: number;
    role?: MemberRole;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  // @TODO: myUserId를 가져오는 Hooks 로 분리
  const { data: me } = useQuery({
    ...userQueries.myInfo(),
    throwOnError: false,
    retry: false,
  });

  const myUserId = me?.id;

  // 드롭다운 선택시
  const openRoleChangeModal = (memberId: number, value: "어드민" | "팀원") => {
    const role: MemberRole = value === "어드민" ? "ADMIN" : "MEMBER";
    setPending({ memberId, role }); //
    setConfirmMessage("팀원의 권한을 변경 하시겠습니까?");
    setRoleChangeModalOpen(true);
  };

  // 모달 확인 버튼에서 Api 호출
  const handleUpdateRole = async () => {
    if (!pending || !pending.role) return;

    // @TODO: useMutation 으로 리팩토링
    try {
      await memberRoleApi.update(teamId, pending.memberId, pending.role);

      // 권한 변경시 배지 업데이트
      const { memberId, role } = pending;
      setMembers((prev) =>
        prev.map((member) =>
          member.id === memberId ? { ...member, role } : member,
        ),
      );

      // 나의 권한을 admin > member로 변경시 메인페이지로 이동
      const response = await memberListApi.read(teamId);
      const memberUserId =
        response?.data?.find((member) => member.id == pending.memberId)
          ?.userId ?? pending.memberId;

      if (myUserId === memberUserId && pending.role !== "ADMIN") {
        router.push("/taskmate");
      }
    } catch {
      setErrorMessage("유효하지 않은 권한 설정 입니다.");
      setErrorModalOpen(true);
    } finally {
      setRoleChangeModalOpen(false);
    }
  };

  /* @TODO: useOverlay 공통 hooks 로 적용 */
  const openMemberDeleteModal = (memberId: number) => {
    setPending({ memberId });
    setConfirmMessage("팀원의 권한을 삭제 하시겠습니까?");
    setMemberDeleteModalOpen(true);
  };

  const handleDeleteMember = async () => {
    if (!pending) return;

    // @TODO: useMutation 으로 리팩토링
    try {
      await memberApi.delete(teamId, pending.memberId);
      setMembers((prev) =>
        prev.filter((member) => member.id !== pending.memberId),
      );
    } catch {
      setErrorMessage("관리자는 본인을 팀에서 삭제할 수 없습니다.");
      setErrorModalOpen(true);
    } finally {
      setMemberDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    // @TODO: useSuspenseQuery 및 AsyncBoundary 사용
    const loadMemberList = async () => {
      const res = await memberListApi.read(teamId);
      setMembers(Array.isArray(res.data) ? res.data : []);
    };

    if (Number.isFinite(teamId)) loadMemberList();
  }, [teamId]);

  useEffect(() => {
    // @TODO: useTeamId 에서 처리
    if (!Number.isFinite(teamId)) return;

    // @TODO: useSuspenseQuery 및 AsyncBoundary 사용
    const loadMemberList = async (): Promise<void> => {
      try {
        const res = await memberListApi.read(teamId);
        const list = Array.isArray(res.data) ? res.data : [];

        setMembers(
          typeof myUserId === "number"
            ? formatMemberList(list, myUserId)
            : list,
        );
      } catch (error) {
        // @TODO: console 제거
        console.error("member list error", error);
      }
    };

    loadMemberList();
  }, [teamId, myUserId]);

  return (
    <section className="bg-inverse-normal relative h-183.25 overflow-hidden rounded-4xl">
      <div className="h-183.25 overflow-scroll px-5 py-8">
        <div className="flex flex-col gap-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex justify-between px-4 py-3"
            >
              <ProfileCard
                avatar={member.profileImageUrl ?? ""}
                hasCrownIcon={member.role === "ADMIN"}
                name={member.userNickname}
                tag={member.id === myUserId ? "나" : undefined} // isMe 판정 여기서
                email={member.userEmail}
              />
              <div className="flex items-center gap-2">
                <div className="flex items-center self-center">
                  <Dropdown
                    options={["어드민", "팀원"]}
                    // 개선 가능
                    selected={member.role === "ADMIN" ? "어드민" : "팀원"}
                    onSelect={(value) => openRoleChangeModal(member.id, value)} // member.id 를 준다.
                  />
                </div>
                <Button
                  onClick={() => openMemberDeleteModal(member.id)}
                  variant="secondary"
                  size="sm"
                  className="rounded-lg text-gray-500 ring-gray-200 hover:ring-gray-300"
                >
                  팀원 삭제
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-22.5 rounded-b-4xl bg-linear-to-t from-white via-white/90 to-transparent" />
      <Button
        className="absolute right-5 bottom-5.75 z-20"
        type="button"
        onClick={onInviteClick}
      >
        팀원 추가하기
      </Button>

      {/* 권한 변경 확인 모달 */}
      {/* @TODO: useOverlay 공통 hooks 로 적용 */}
      <ConfirmModal
        message={confirmMessage || "팀원의 권한을 변경 하시겠습니까?"}
        isOpen={roleChangeModalOpen}
        onClose={() => setRoleChangeModalOpen(false)}
        onConfirm={handleUpdateRole}
      />

      {/* 팀원 삭제 모달 */}
      {/* @TODO: useOverlay 공통 hooks 로 적용 */}
      <ConfirmModal
        message={confirmMessage || "팀원의 권한을 삭제 하시겠습니까?"}
        isOpen={memberDeleteModalOpen}
        onClose={() => setMemberDeleteModalOpen(false)}
        onConfirm={handleDeleteMember}
      />

      {/* 에러 모달 */}
      {/* @TODO: useOverlay 공통 hooks 로 적용 */}
      <ErrorModal
        message={errorMessage}
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
      />
    </section>
  );
};

export default MemberList;
