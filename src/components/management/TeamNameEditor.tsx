"use client";
// React
import { useState } from "react";

import Button from "@/components/common/Button/Button";
// 내부
import Input from "@/components/common/Input/Input";

const TeamNameEditor = () => {
  const [value, setValue] = useState("");

  return (
    <section className="bg-background-normal flex h-[186px] w-full flex-col gap-2 rounded-[32px] px-6 pt-6 pb-5">
      <h2 className="typography-body-2">팀명</h2>
      <form className="flex flex-col gap-3">
        <Input
          placeholder="팀명"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button
          type="submit"
          className="ml-auto w-fit rounded-xl"
        >
          저장하기
        </Button>
      </form>
    </section>
  );
};

export default TeamNameEditor;
