"use client";

import { useRouter } from "next/navigation";

import TextButton from "@/components/common/TextButton/TextButton";

export default function Cancel() {
  const router = useRouter();

  return (
    <TextButton
      size="lg"
      className="self-center"
      onClick={() => router.back()}
    >
      <span className="typography-body-2 text-gray-400">취소하기</span>
    </TextButton>
  );
}
