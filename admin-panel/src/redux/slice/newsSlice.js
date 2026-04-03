import { createSlice } from "@reduxjs/toolkit";
import {
  getAllNewsAdmin,
  addNews,
  updateNews,
  deleteNews,
} from "../actions/newsActions";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    loading: false,
    success: false,
    news: [],
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNewsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNewsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload.news || [];
      })
      .addCase(getAllNewsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = newsSlice.actions;
export default newsSlice.reducer;
