import { createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  loadToken,
  login,
  register,
} from "../actions/authActions";
import { getLoginUserDetails } from "../actions/authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    user: null,
    token: null,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.success = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //REGISTER || register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //GET LOGGED USER DETAILS || getLoginUserDetails
      .addCase(getLoginUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLoginUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        // state.appointments = action.payload.appointments;
      })
      .addCase(getLoginUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(logout, (state) => {
        state.user = null;
        state.token = null;
        state.success = false;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
