import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // token: localStorage.getItem("token") || null,
    token: null,
    auth: null,
    expiredAt: null,
    refreshToken: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      // localStorage.setItem("token", action.payload);
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setExpired: (state, action) => {
      state.expiredAt = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.auth = null;
      state.expiredAt = null;
      state.refreshToken = null;
    },
  },
});

export const { setToken, setAuth, setExpired, setRefreshToken, logout } =
  authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectAuth = (state) => state.auth.auth;
export const selectExpired = (state) => state.auth.expiredAt;
export const selectRefreshToken = (state) => state.auth.refreshToken;

export default authSlice.reducer;
