import { redirect } from "next/navigation";

// 초기 라우팅 분기 로직
export default function Home() {
  redirect("/main");
}
