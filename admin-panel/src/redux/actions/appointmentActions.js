import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

// GET ALL APPOINTMENTS
export const getAllAppointments = createAsyncThunk(
  "appointment/getAllAppointments",
  async (_, thunkApi) => {
    //underscore here mean no arguments passed
    try {
      const res = await API.get("/appointment/get-all");
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occured in getting all appointments";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);

// // GET APPOINTMENT DETAILS
export const getAppointmentDetails = createAsyncThunk(
  "appointment/getAppointmentDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/appointment/get-details/${id}`);
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occured in getting appointment details";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);

// UPDATE appointment status
export const updateAppointmentStatus = createAsyncThunk(
  "appointment/updateAppointmentStatus",
  async ({ id, appointmentStatus }, thunkApi) => {
    try {
      const res = await API.patch(`/appointment/update-status/${id}`, {
        appointmentStatus,
      });
      return res?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error occured in updating appointment status";

      // Reject with error message
      return thunkApi.rejectWithValue(message);
    }
  }
);
