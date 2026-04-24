export function formatNavigationKey(...parts: Array<string | number>): string {
  return parts.map(String).filter(Boolean).join("-");
}

export function formatNavigationKeyFromPathname(pathname: string): string {
  if (pathname === "/taskmate" || pathname === "/taskmate/") {
    return "home";
  }

  if (!pathname.startsWith("/taskmate/")) {
    return "";
  }

  const normalized = pathname
    .replace(/^\/taskmate\//, "")
    .replace(/\/+$/, "")
    .replaceAll("/", "-");

  if (!normalized) return "home";

  if (normalized === "team-create" || normalized === "personal-goal-create") {
    return "";
  }

  return normalized;
}
