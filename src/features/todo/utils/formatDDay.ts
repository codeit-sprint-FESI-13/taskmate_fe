const MS_PER_DAY = 86_400_000;

export function formatDDay(dueDate: string): string {
  const parts = dueDate.split("-").map(Number);
  const isInvalidFormat = parts.length !== 3 || parts.some(Number.isNaN);
  if (isInvalidFormat) return "D-?";

  const [year, month, day] = parts;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(year, month - 1, day);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.round((due.getTime() - today.getTime()) / MS_PER_DAY);

  if (diffDays < 0) return `D+${Math.abs(diffDays)}`;
  if (diffDays === 0) return "D-day";
  return `D-${diffDays}`;
}
