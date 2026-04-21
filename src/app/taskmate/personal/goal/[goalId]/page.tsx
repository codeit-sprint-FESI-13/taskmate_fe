"use client";

import { Heading } from "@/components/goal/Heading";
import Summary from "@/components/goal/Summary";
import { TodoSection } from "@/components/team/TodoSection";
import AsyncBoundary from "@/shared/ui/AsyncBoundary";
import { Spacing } from "@/shared/ui/Spacing";
import Spinner from "@/shared/ui/Spinner";

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

      <Spacing size={64} />

      <Summary />

      <Spacing size={56} />

      <TodoSection />
    </div>
  );
}
