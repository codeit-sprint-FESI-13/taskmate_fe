export interface TeamDetailData {
  id: number;
  name: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamNameResponseSuccess {
  success: true;
  code: string; // "SUCCESS"
  message: string; // "팀 상세 정보 조회에 성공했습니다."
  data: TeamDetailData;
  timestamp: string;
}

export interface InviteResponseSuccess {
  success: true;
  code: string; // "SUCCESS"
  message: string; // "팀 초대 생성에 성공했습니다."
  data: null; // 명세에 data가 null로 되어 있음
  timestamp: string;
}
