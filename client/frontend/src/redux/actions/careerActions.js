import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

// GET ALL CAREERS (Public)
export const getAllCareers = createAsyncThunk(
  "career/getAllCareers",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/career/get-all");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// GET CAREER DETAILS (Public)
export const getCareerDetails = createAsyncThunk(
  "career/getCareerDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/career/get-details/${id}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// SUBMIT APPLICATION (Public)
export const submitApplication = createAsyncThunk(
  "career/submitApplication",
  async (formData, thunkApi) => {
    try {
      const res = await API.post("/career/apply", formData);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
