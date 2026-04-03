import API from "../../Api/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

// PUBLIC
export const getAllNews = createAsyncThunk(
  "news/getAllNews",
  async ({ page = 1, limit = 12 }, thunkApi) => {
    try {
      const res = await API.get(`/news?page=${page}&limit=${limit}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getNewsBySlug = createAsyncThunk(
  "news/getNewsBySlug",
  async (slug, thunkApi) => {
    try {
      const res = await API.get(`/news/${slug}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getLatestNews = createAsyncThunk(
  "news/getLatestNews",
  async (limit = 5, thunkApi) => {
    try {
      const res = await API.get(`/news/latest?limit=${limit}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ADMIN
export const getAllNewsAdmin = createAsyncThunk(
  "news/getAllNewsAdmin",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/news/admin/all");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const addNews = createAsyncThunk(
  "news/addNews",
  async (formData, thunkApi) => {
    try {
      const res = await API.post("/news/admin/add", formData);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateNews = createAsyncThunk(
  "news/updateNews",
  async ({ id, formData }, thunkApi) => {
    try {
      const res = await API.patch(`/news/admin/update/${id}`, formData);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (id, thunkApi) => {
    try {
      const res = await API.delete(`/news/admin/delete/${id}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
