import { createSlice } from "@reduxjs/toolkit";
import {
  deleteWebMessage,
  getAllWebMessages,
} from "../actions/webMessageActions";

const webMessageSlice = createSlice({
  name: "webMessage",
  initialState: {
    loading: false,
    success: false,
    webMessages: null,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.success = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET ALL WEB MESSAGES || getAllWebMessages
      .addCase(getAllWebMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllWebMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.webMessages = action.payload.webMessages;
      })
      .addCase(getAllWebMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // DELETE WEB MESSAGE || deleteWebMessage
      .addCase(deleteWebMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWebMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteWebMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = webMessageSlice.actions;
export default webMessageSlice.reducer;
