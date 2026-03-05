import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

// GET ALL WEB MESSAGES
export const getAllWebMessages = createAsyncThunk(
  "appointment/getAllWebMessages",
  async (_, thunkApi) => {
    //underscore here mean no arguments passed
    try {
      const res = await API.get("/webmessage/get-all");
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occured in getting all web messages";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);

// DELETE WEB MESSAGE
export const deleteWebMessage = createAsyncThunk(
  "webMessage/deleteWebMessage",
  async (id, thunkApi) => {
    try {
      const res = await API.delete(`/webmessage/delete/${id}`);
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occurred in deleting web message";
      return thunkApi.rejectWithValue(message);
    }
  }
);
