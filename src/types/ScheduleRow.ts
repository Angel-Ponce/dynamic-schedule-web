import { RowCell } from "./RowCell";

interface ScheduleRow {
  uid: string;
  scheduleUid: string;
  order: number;
  cells: RowCell[];
}

export type { ScheduleRow };
