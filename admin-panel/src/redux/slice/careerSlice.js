import { createSlice } from "@reduxjs/toolkit";
import {
  addCareer,
  updateCareer,
  deleteCareer,
  getAllCareersAdmin,
  getAllApplications,
  updateApplicationStatus,
} from "../actions/careerActions";

const careerSlice = createSlice({
  name: "career",
  initialState: {
    loading: false,
    success: false,
    careers: [],
    applications: [],
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL CAREERS (Admin)
      .addCase(getAllCareersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCareersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.careers = action.payload.careers || [];
      })
      .addCase(getAllCareersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD CAREER
      .addCase(addCareer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCareer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addCareer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE CAREER
      .addCase(updateCareer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCareer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCareer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE CAREER
      .addCase(deleteCareer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCareer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteCareer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL APPLICATIONS
      .addCase(getAllApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.applications || [];
      })
      .addCase(getAllApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE APPLICATION STATUS
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = careerSlice.actions;
export default careerSlice.reducer;
