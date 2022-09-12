import type { UserAccount } from "$types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserAccount = {
  name: "User",
  email: "",
  photoURL: "",
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserAccount>) => {
      state = action.payload;
      window.localStorage.setItem("user", JSON.stringify(state));
    },
    resetUser: (state) => {
      state = initialState;
      window.localStorage.setItem("user", "undefined");
    },
  },
});

const { setUser, resetUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export { userReducer, setUser, resetUser };
