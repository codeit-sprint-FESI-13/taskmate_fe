"use client";

import AsyncBoundary from "@/components/common/AsyncBoundary";
import Spinner from "@/components/common/Spinner";
import { Heading } from "@/components/goal/Heading";

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

      {/* 
      <Spacing size={64} />

      <Summary />

      <Spacing size={56} />

      <TodoSection /> */}
    </div>
  );
}
