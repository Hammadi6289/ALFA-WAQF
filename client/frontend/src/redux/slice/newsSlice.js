import { createSlice } from "@reduxjs/toolkit";
import {
  getAllNews,
  getNewsBySlug,
  getLatestNews,
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
    newsItem: null,
    latestNews: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 12,
    },
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
      // GET ALL NEWS
      .addCase(getAllNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload.news || [];
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET NEWS BY SLUG
      .addCase(getNewsBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewsBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.newsItem = action.payload.news;
      })
      .addCase(getNewsBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET LATEST NEWS
      .addCase(getLatestNews.fulfilled, (state, action) => {
        state.latestNews = action.payload.news || [];
      })

      // ADMIN: GET ALL
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

      // ADMIN: ADD
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

      // ADMIN: UPDATE
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

      // ADMIN: DELETE
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
