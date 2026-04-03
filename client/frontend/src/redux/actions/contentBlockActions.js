import API from "../../Api/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

// PUBLIC
export const getActiveBlocks = createAsyncThunk(
  "contentBlock/getActiveBlocks",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/content-blocks/active");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getBlocksByType = createAsyncThunk(
  "contentBlock/getBlocksByType",
  async (type, thunkApi) => {
    try {
      const res = await API.get(`/content-blocks/type/${type}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ADMIN
export const getAllBlocks = createAsyncThunk(
  "contentBlock/getAllBlocks",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/content-blocks/admin/all");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const addBlock = createAsyncThunk(
  "contentBlock/addBlock",
  async (formData, thunkApi) => {
    try {
      const res = await API.post("/content-blocks/admin/add", formData);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateBlock = createAsyncThunk(
  "contentBlock/updateBlock",
  async ({ id, formData }, thunkApi) => {
    try {
      const res = await API.patch(
        `/content-blocks/admin/update/${id}`,
        formData
      );
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteBlock = createAsyncThunk(
  "contentBlock/deleteBlock",
  async (id, thunkApi) => {
    try {
      const res = await API.delete(`/content-blocks/admin/delete/${id}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const reorderBlocks = createAsyncThunk(
  "contentBlock/reorderBlocks",
  async (blocks, thunkApi) => {
    try {
      const res = await API.post("/content-blocks/admin/reorder", { blocks });
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
