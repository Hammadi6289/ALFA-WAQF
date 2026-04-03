import API from "../../Api/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

// GET ALL NEWS (Admin)
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

// ADD NEWS
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

// UPDATE NEWS
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

// DELETE NEWS
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
