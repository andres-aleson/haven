import type { CheckIn } from "./db";

export interface WeekDay {
  label: string;
  date: string;
  checked: boolean;
  isToday: boolean;
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getCheckInDateSet(checkIns: CheckIn[]): Set<string> {
  return new Set(checkIns.map((c) => c.created_at.slice(0, 10)));
}

/** Consecutive days with a check-in, ending today (or yesterday, if today hasn't happened yet). */
export function computeStreak(dateSet: Set<string>): number {
  const cursor = new Date();
  if (!dateSet.has(toDateString(cursor))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  let streak = 0;
  while (dateSet.has(toDateString(cursor))) {
    streak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

/** The last 7 days (oldest first, today last), and whether each had a check-in. */
export function getWeekView(dateSet: Set<string>): WeekDay[] {
  const days: WeekDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = toDateString(d);
    days.push({
      label: WEEKDAY_LABELS[d.getUTCDay()],
      date: dateStr,
      checked: dateSet.has(dateStr),
      isToday: i === 0,
    });
  }
  return days;
}
