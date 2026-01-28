import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

// GET ALL DOCTORS
export const getAllDoctors = createAsyncThunk(
  "doctor/getAllDoctors",
  async (_, thunkApi) => {
    //underscore here mean no arguments passed
    try {
      const res = await API.get("/doctor/get-all");
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occured in getting all doctors";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);

// GET DOCTOR DETAILS
export const getDoctorDetails = createAsyncThunk(
  "doctor/getDoctorDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/doctor/get-details/${id}`);
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occured in getting doctor details";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);
