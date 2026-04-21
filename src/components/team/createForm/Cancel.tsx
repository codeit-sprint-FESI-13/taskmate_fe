"use client";

import { useRouter } from "next/navigation";

import TextButton from "@/shared/ui/Button/TextButton/TextButton";

export default function Cancel() {
  const router = useRouter();

  return (
    <TextButton
      size="lg"
      className="self-center"
      onClick={() => router.back()}
    >
      취소하기
    </TextButton>
  );
}
