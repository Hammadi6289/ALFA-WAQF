import { createSlice } from "@reduxjs/toolkit";
//import {} from "../actions/userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    success: false,
    users: null,
    user: null,
    error: null,
    appointments: null,
  },
  reducers: {
    reset: (state) => {
      state.success = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       //LOGIN
  //       .addCase(login.pending, (state) => {
  //         state.loading = true;
  //       })
  //       .addCase(login.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.success = true;
  //         state.user = action.payload.user;
  //         state.token = action.payload.token;
  //       })
  //       .addCase(login.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.payload;
  //       });
  //   },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
