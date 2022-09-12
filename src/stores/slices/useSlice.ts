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
    },
  },
});

const { setUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export { userReducer, setUser };
