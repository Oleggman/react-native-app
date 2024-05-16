import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  login: "",
  id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.login = action.payload.login;
      state.id = action.payload.id;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.login = "";
      state.id = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuthState = (state) => state.auth.isAuthenticated;
export const selectLogin = (state) => state.auth.login;

export default authSlice.reducer;
