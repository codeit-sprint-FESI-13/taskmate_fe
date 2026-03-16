"use client";

import { useEffect, useState } from "react";

export default function MSWInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMockingReady, setIsMockingReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      setIsMockingReady(true);
      return;
    }

    async function startMocking() {
      if (typeof window !== "undefined") {
        const { worker } = await import("./browser");
        await worker.start({
          onUnhandledRequest: "bypass",
        });
        setIsMockingReady(true);
      }
    }

    startMocking();
  }, []);

  if (!isMockingReady) return null;
  return <>{children}</>;
}
