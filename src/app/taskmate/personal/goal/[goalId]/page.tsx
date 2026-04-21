"use client";

import AsyncBoundary from "@/shared/ui/AsyncBoundary";
import { Spacing } from "@/shared/ui/Spacing";
import Spinner from "@/shared/ui/Spinner";
import { Heading } from "@/widgets/goal/Heading";
import Summary from "@/widgets/goal/Summary";
import { TodoSection } from "@/widgets/team/TodoSection";

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
