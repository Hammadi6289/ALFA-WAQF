import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

// GET ALL USERS
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkApi) => {
    //underscore here mean no arguments passed
    try {
      const res = await API.get("/user/get-all");
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occured in getting all users";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);

// GET USER DETAILS
export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/user/get-user/${id}`);
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occured in getting user details";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);
