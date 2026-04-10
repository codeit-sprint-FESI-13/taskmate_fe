"use client";

import AsyncBoundary from "@/components/common/AsyncBoundary";
import { Spacing } from "@/components/common/Spacing";
import Spinner from "@/components/common/Spinner";
import { Heading } from "@/components/goal/Heading";
import { Summary } from "@/components/goal/Summary";

export default function Page() {
  return (
    <div className="flex w-full flex-col justify-start px-6 py-8">
      <AsyncBoundary
        loadingFallback={<Spinner size={60} />}
        errorFallback={(error, onReset) => (
          <Heading.Error
            error={error}
            onReset={onReset}
          />
        )}
      >
        <Heading />
      </AsyncBoundary>

      <Spacing
        size={8}
        useClassSize
        className="mobile:h-14 tablet:h-16 h-8"
      />

      <Summary />

      {/* 
      <Spacing size={56} />

      <TodoSection /> */}
    </div>
  );
}
