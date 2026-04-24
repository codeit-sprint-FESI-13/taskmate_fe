export type TeamInvitationStatus = "PENDING" | string;

export type TeamInvitationDetail = {
  invitationId: number;
  teamId: number;
  teamName: string;
  invitedByUserId: number;
  invitedByNickname: string;
  status: TeamInvitationStatus;
  expiresAt: string;
  expired: boolean;
};
