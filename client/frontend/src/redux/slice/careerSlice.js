import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCareers,
  getCareerDetails,
  submitApplication,
} from "../actions/careerActions";

const careerSlice = createSlice({
  name: "career",
  initialState: {
    loading: false,
    success: false,
    careers: [],
    career: null,
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
      // GET ALL CAREERS
      .addCase(getAllCareers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCareers.fulfilled, (state, action) => {
        state.loading = false;
        state.careers = action.payload.careers || [];
      })
      .addCase(getAllCareers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET CAREER DETAILS
      .addCase(getCareerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCareerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.career = action.payload.career;
      })
      .addCase(getCareerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SUBMIT APPLICATION
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = careerSlice.actions;
export default careerSlice.reducer;
