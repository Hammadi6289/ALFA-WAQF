import API from "../../Api/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ============= ADMIN ROUTES =============

// GET ALL BLOCKS (admin - includes inactive)
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

// ADD BLOCK
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

// UPDATE BLOCK
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

// DELETE BLOCK
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

// REORDER BLOCKS
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
