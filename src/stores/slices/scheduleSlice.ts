import type { Schedule } from "$types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Schedule = {
  uid: "",
  name: "",
  fontFamily: "default",
  showGrid: false,
  hiddenSaturday: false,
  hiddenSunday: false,
  hiddenWeek: false,
  rows: [],
  userUid: "",
  language: "es",
  sendEmailNotifications: false,
  sendNotifications: false,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedule: (state, action: PayloadAction<Schedule>) => {
      return (state = action.payload);
    },
    resetSchedule: (state) => {
      return (state = initialState);
    },
  },
});

const emptySchedule = (schedule: Schedule) => {
  return schedule.uid.trim().length == 0;
};

const { setSchedule, resetSchedule } = scheduleSlice.actions;

const scheduleReducer = scheduleSlice.reducer;

export { scheduleReducer, resetSchedule, setSchedule, emptySchedule };
