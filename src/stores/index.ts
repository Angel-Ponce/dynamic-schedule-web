import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "$slices/userSlice";
import { clipboardReducer } from "$slices/clipboardSlice";
import { scheduleReducer } from "$slices/scheduleSlice";

const defaultStore = configureStore({
  reducer: {
    user: userReducer,
    clipboard: clipboardReducer,
    schedule: scheduleReducer,
  },
});

type RootState = ReturnType<typeof defaultStore.getState>;
type AppDispatch = typeof defaultStore.dispatch;

export { type RootState, type AppDispatch, defaultStore };
