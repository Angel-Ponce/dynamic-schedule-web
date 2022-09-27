import { ScheduleRow } from "./ScheduleRow";

interface Schedule {
  uid: string;
  name: string;
  language: "es" | "en";
  hiddenSaturday: boolean;
  hiddenSunday: boolean;
  hiddenWeek: boolean;
  showGrid: boolean;
  sendEmailNotifications: boolean;
  sendNotifications: boolean;
  fontFamily: string;
  userUid: string;
  rows: ScheduleRow[];
}

export type { Schedule };
