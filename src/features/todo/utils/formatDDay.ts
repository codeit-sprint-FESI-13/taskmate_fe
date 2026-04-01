export function formatDDay(dueDate: string): string {
  const parts = dueDate.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return "D-?";

  const [y, m, d] = parts;
  const due = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.round((due.getTime() - today.getTime()) / 86_400_000);

  if (diffDays < 0) return `D+${-diffDays}`;
  if (diffDays === 0) return "D-day";
  return `D-${diffDays}`;
}
