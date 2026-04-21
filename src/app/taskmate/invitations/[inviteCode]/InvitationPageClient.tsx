"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { teamInvitationApi } from "@/entities/team/api/req/invitation.api";
import type { TeamInvitationDetail } from "@/entities/team/types/invitation.types";
import {
  invitationQueries,
  invitationQueryKey,
} from "@/features/team/query/invitation.queryKey";
import Button from "@/shared/ui/Button/Button/Button";
import { Spacing } from "@/shared/ui/Spacing";

function errorMessage(err: unknown, fallback: string) {
  if (err && typeof err === "object" && "message" in err) {
    const m = (err as { message?: unknown }).message;
    if (typeof m === "string" && m.trim()) return m;
  }
  return fallback;
}

export function InvitationPageClient() {
  const params = useParams<{ inviteCode: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const inviteCode = params.inviteCode ?? "";

  const { data } = useSuspenseQuery(invitationQueries(inviteCode));

  const acceptMutation = useMutation({
    mutationFn: () => teamInvitationApi.accept(inviteCode),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["teams", "all"] });
      const detail = queryClient.getQueryData<TeamInvitationDetail>(
        invitationQueryKey(inviteCode),
      );
      const teamId = detail?.teamId;
      if (teamId != null) {
        router.push(`/taskmate/team/${teamId}`);
        return;
      }
      router.push("/taskmate");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => teamInvitationApi.reject(inviteCode),
    onSuccess: () => {
      router.push("/taskmate");
    },
  });

  const busy = acceptMutation.isPending || rejectMutation.isPending;
  const canRespond =
    data && data.status === "PENDING" && !data.expired && !busy;

  if (!inviteCode) {
    return (
      <p className="typography-body-1 text-gray-400">초대 코드가 없습니다.</p>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-col rounded-4xl bg-white p-8 shadow-[0_0_14px_0_rgba(138,138,138,0.08)]">
      <h1 className="typography-title-2 text-label-neutral font-semibold">
        팀 초대
      </h1>
      <Spacing size={24} />

      <div>
        <h2 className="typography-label-1 text-gray-400">팀</h2>
        <span className="typography-body-1 text-label-neutral font-semibold">
          {data.teamName}
        </span>
      </div>

      <Spacing size={32} />

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          size="xl"
          className="w-full sm:flex-1"
          isDisabled={!canRespond}
          onClick={() => rejectMutation.mutate()}
        >
          거부
        </Button>
        <Button
          type="button"
          variant="primary"
          size="xl"
          className="w-full sm:flex-1"
          isDisabled={!canRespond}
          onClick={() => acceptMutation.mutate()}
        >
          수락
        </Button>
      </div>

      {(acceptMutation.isError || rejectMutation.isError) && (
        <>
          <Spacing size={16} />
          <p className="typography-body-2 text-red-normal">
            {errorMessage(
              acceptMutation.error ?? rejectMutation.error,
              "요청에 실패했습니다.",
            )}
          </p>
        </>
      )}
    </div>
  );
}
