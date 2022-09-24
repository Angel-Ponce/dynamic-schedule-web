import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "$slices/userSlice";
import { clipboardReducer } from "$slices/clipboard";

const defaultStore = configureStore({
  reducer: {
    user: userReducer,
    clipboard: clipboardReducer,
  },
});

type RootState = ReturnType<typeof defaultStore.getState>;
type AppDispatch = typeof defaultStore.dispatch;

export { type RootState, type AppDispatch, defaultStore };
