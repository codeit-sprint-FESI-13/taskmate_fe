"use client";

import { useEffect, useState } from "react";

export default function MSWInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(
    process.env.NEXT_PUBLIC_USE_MSW !== "true",
  );

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MSW !== "true") return;

    // async 함수를 내부에서 정의하고 실행

    const initMSW = async () => {
      try {
        const { worker } = await import("./browser");
        await worker.start({ onUnhandledRequest: "bypass" });
        setReady(true);
      } catch (error) {
        console.error("MSW 초기화 실패:", error);
      }
    };

    initMSW();
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
