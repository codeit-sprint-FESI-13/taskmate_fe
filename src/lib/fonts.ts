// src/lib/fonts.ts
import localFont from "next/font/local";

export const pretendard = localFont({
  // 상대 경로로 src 폴더 내의 폰트 파일을 지목합니다.
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});
