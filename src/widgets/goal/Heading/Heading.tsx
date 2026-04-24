"use client";

import AsyncBoundary from "@/shared/ui/AsyncBoundary";
import Spinner from "@/shared/ui/Spinner";

import HeadingContent from "./Content";
import HeadingError from "./Error";

export default function Heading() {
  return (
    <AsyncBoundary
      loadingFallback={<Spinner size={60} />}
      errorFallback={(error, onReset) => (
        <HeadingError
          error={error}
          onReset={onReset}
        />
      )}
    >
      <HeadingContent />
    </AsyncBoundary>
  );
}
