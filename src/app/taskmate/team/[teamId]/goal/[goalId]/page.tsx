"use client";

import AsyncBoundary from "@/shared/ui/AsyncBoundary";
import { Spacing } from "@/shared/ui/Spacing";
import Spinner from "@/shared/ui/Spinner";
import { Heading, Summary } from "@/widgets/goal";
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

      <Spacing
        size={8}
        useClassSize
        className="mobile:h-14 tablet:h-16 h-8"
      />

      <Summary />

      <Spacing
        size={8}
        useClassSize
        className="mobile:h-10 tablet:h-14 h-8"
      />

      <TodoSection />
    </div>
  );
}
