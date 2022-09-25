import type { Schedule, RowCell } from "$types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedule: (state, action: PayloadAction<Schedule>) => {
      return (state = action.payload);
    },
    clearSchedule: (state) => {
      state.rows = [];
      return (state = state);
    },
    updateCell: (
      state,
      action: PayloadAction<{ rowUid: string; cell: RowCell }>
    ) => {
      let row = state.rows.find((r) => r.uid == action.payload.rowUid);

      if (row) {
        row.cells = row.cells.map((c) =>
          c.uid == action.payload.cell.uid ? action.payload.cell : c
        );
        state.rows = state.rows.map((r) => (r.uid == row?.uid ? row : r));

        return (state = state);
      }

      return (state = state);
    },
    addRow: (state, action: PayloadAction<{ indexFrom: number }>) => {
      let uid = uuidv4();
      state.rows = state.rows.splice(action.payload.indexFrom + 1, 0, {
        uid,
        order: action.payload.indexFrom + 1,
        scheduleUid: state.uid,
        cells: new Array(8).fill({}).map((_, i) => ({
          uid: uuidv4(),
          title: i == 0 ? null : "",
          href: null,
          type: i == 0 ? "hour" : "course",
          bgColor: null,
          textColor: null,
          order: i,
          professor: i == 0 ? null : "",
          rowUid: uid,
          time: i == 0 ? [null, null] : null,
        })),
      });
      return (state = state);
    },
    deleteRow: (state, action: PayloadAction<{ rowUid: string }>) => {
      state.rows = state.rows.filter((r) => r.uid != action.payload.rowUid);
      return (state = state);
    },
  },
});

const emptySchedule = (schedule: Schedule) => {
  return schedule.uid.trim().length == 0;
};

const { setSchedule, clearSchedule, updateCell, addRow, deleteRow } =
  scheduleSlice.actions;

const scheduleReducer = scheduleSlice.reducer;

export {
  scheduleReducer,
  setSchedule,
  clearSchedule,
  updateCell,
  addRow,
  deleteRow,
  emptySchedule,
};
