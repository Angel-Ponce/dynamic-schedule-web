import type { RowCell } from "$types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: RowCell = {
  uid: "",
  bgColor: null,
  order: -1,
  href: null,
  professor: "",
  textColor: null,
  title: "",
  type: "course",
  rowUid: "",
  time: null,
};

const clipboardSlice = createSlice({
  name: "clipboard",
  initialState,
  reducers: {
    setClipboard: (state, action: PayloadAction<RowCell>) => {
      return (state = action.payload);
    },
    resetClipboard: (state) => {
      return (state = initialState);
    },
  },
});

const emptyClipboard = (clipboard: RowCell) => {
  return clipboard.uid.trim().length == 0;
};

const { setClipboard, resetClipboard } = clipboardSlice.actions;

const clipboardReducer = clipboardSlice.reducer;

export { clipboardReducer, setClipboard, resetClipboard, emptyClipboard };
