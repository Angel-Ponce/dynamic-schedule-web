import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "$slices/userSlice";

const defaultStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

type RootState = ReturnType<typeof defaultStore.getState>;
type AppDispatch = typeof defaultStore.dispatch;

export { type RootState, type AppDispatch, defaultStore };
