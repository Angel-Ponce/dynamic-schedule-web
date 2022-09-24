import { ScheduleRow } from "./ScheduleRow";

interface Schedule {
  uid: string;
  name: string;
  hiddenSaturday: boolean;
  hiddenSunday: boolean;
  hiddenWeek: boolean;
  userUid: string;
  rows: ScheduleRow[];
}

export type { Schedule };
