"use client";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input";

export default function Form() {
  return (
    <form className="flex flex-col items-start justify-start gap-8">
      <label className="typography-heading-2 font-semibold">팀 이름</label>

      <Input
        className="mobile:w-[303px] tablet:w-[496px]"
        placeholder="팀 이름을 입력해주세요"
      />

      <Button
        size="xl"
        type="submit"
        className="w-full"
      >
        생성하기
      </Button>
    </form>
  );
}
