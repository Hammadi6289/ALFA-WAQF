import { createSlice } from "@reduxjs/toolkit";
import {
  addNewDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorDetails,
  updateDoctor,
  updateStatus,
} from "../actions/doctorActions";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    loading: false,
    success: false,
    doctors: null,
    doctor: null,
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
      //GET ALL DOCTORS || getAllDoctors
      .addCase(getAllDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctors = action.payload.doctors;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //GET DOCTOR DETAILS || getDoctorDetails
      .addCase(getDoctorDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload.doctor;
      })
      .addCase(getDoctorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //ADD DOCTOR || addNewDoctor
      .addCase(addNewDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload.doctor;
      })
      .addCase(addNewDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //UPDATE DOCTOR || addNewDoctor
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload.doctor;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //DELETE DOCTOR || deleteDoctor
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //UPDATE DOCTOR STATUS || updateStatus
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = doctorSlice.actions;
export default doctorSlice.reducer;
