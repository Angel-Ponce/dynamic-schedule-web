import { configureStore } from "@reduxjs/toolkit";

const defaultStore = configureStore();

type RootState = ReturnType<typeof defaultStore.getState>;
type AppDispatch = typeof defaultStore.dispatch;

export { type RootState, type AppDispatch };
