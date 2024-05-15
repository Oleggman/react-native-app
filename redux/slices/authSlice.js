import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  login: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.login = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.login = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuthState = (state) => state.auth.isAuthenticated;
export const selectLogin = (state) => state.auth.login;

export default authSlice.reducer;
