import { useEffect, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

const BREAKPOINTS = {
  mobile: 375,
  tablet: 744,
  desktop: 1280,
} as const;

function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS.tablet) return "desktop";
  if (width >= BREAKPOINTS.mobile) return "tablet";
  return "mobile";
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === "undefined") return "desktop";
    return getBreakpoint(window.innerWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    // ResizeObserver 대신 viewport 변경을 window.resize로 감지합니다.
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}
