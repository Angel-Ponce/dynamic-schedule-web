interface Schedule {
  uid: string;
  name: string;
  hiddenSaturday: boolean;
  hiddenSunday: boolean;
  hiddenWeek: boolean;
  userUid: string;
}

export type { Schedule };
