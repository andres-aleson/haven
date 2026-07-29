export interface WeekDay {
  label: string;
  date: string;
  checked: boolean;
  isToday: boolean;
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * YYYY-MM-DD for a Date using its local calendar day — deliberately not
 * toISOString(), which is UTC and can land on the wrong day near midnight.
 */
export function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayLocalDateString(): string {
  return toLocalDateString(new Date());
}

export function getCheckInDateSet(localDates: string[]): Set<string> {
  return new Set(localDates);
}

/** Consecutive local days with a check-in, ending today (or yesterday, if today hasn't happened yet). */
export function computeStreak(dateSet: Set<string>): number {
  const cursor = new Date();
  if (!dateSet.has(toLocalDateString(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (dateSet.has(toLocalDateString(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** The last 7 local days (oldest first, today last), and whether each had a check-in. */
export function getWeekView(dateSet: Set<string>): WeekDay[] {
  const days: WeekDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = toLocalDateString(d);
    days.push({
      label: WEEKDAY_LABELS[d.getDay()],
      date: dateStr,
      checked: dateSet.has(dateStr),
      isToday: i === 0,
    });
  }
  return days;
}
