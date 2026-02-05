import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAppointments,
  getAppointmentDetails,
  updateAppointmentStatus,
} from "../actions/appointmentActions";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    loading: false,
    success: false,
    appointments: null,
    appointment: null,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.success = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET ALL APPOINTMENTS || getAllAppointments
      .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointments = action.payload.appointments;
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //GET APPOINTMENT DETAILS || getAppointmentDetails
      .addCase(getAppointmentDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointmentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointment = action.payload.appointmentDetails;
      })
      .addCase(getAppointmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //UPDATE APPOINTMENT STATUS || updateAppointmentStatus
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        // state.appointment = action.payload.appointmentDetails;
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = appointmentSlice.actions;
export default appointmentSlice.reducer;
