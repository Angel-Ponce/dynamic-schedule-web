import type { UserAccount } from "$types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserAccount | null = {
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
      localStorage.setItem("user", JSON.stringify(action.payload));
      return (state = action.payload);
    },
    resetUser: (state) => {
      localStorage.setItem("user", "undefined");
      return (state = initialState);
    },
  },
});

const emptyUser = (user: UserAccount) => {
  return user.uid.trim().length == 0;
};

const { setUser, resetUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export { userReducer, setUser, resetUser, emptyUser };
