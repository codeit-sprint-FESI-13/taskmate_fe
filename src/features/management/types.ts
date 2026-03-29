export interface ResponseInviteSuccess {
  success: true;
  code: string; // "SUCCESS"
  message: string; // "팀 초대 생성에 성공했습니다."
  data: null; // 명세에 data가 null로 되어 있음
  timestamp: string;
}
