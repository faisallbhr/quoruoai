import { createSlice } from "@reduxjs/toolkit";

interface User {
  isLoggedIn: boolean;
}

const initialState: User = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: { isLoggedIn: boolean }) => {
      state.isLoggedIn = true;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
