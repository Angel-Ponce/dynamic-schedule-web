import type { Schedule } from "$types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Schedule[] = [];

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    setSchedules: (state, action: PayloadAction<Schedule[]>) => {
      return (state = action.payload);
    },
    resetSchedules: (state) => {
      return (state = initialState);
    },
  },
});

const emptySchedules = (schedules: Schedule[]) => {
  return schedules.length == 0;
};

const { setSchedules, resetSchedules } = schedulesSlice.actions;

const schedulesReducer = schedulesSlice.reducer;

export { schedulesReducer, resetSchedules, setSchedules, emptySchedules };
