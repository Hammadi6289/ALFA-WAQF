import API from "../../Api/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ============= CAREER CRUD (Admin Only) =============

// ADD CAREER
export const addCareer = createAsyncThunk(
  "career/addCareer",
  async (formData, thunkApi) => {
    try {
      const res = await API.post("/career/add", formData);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// UPDATE CAREER
export const updateCareer = createAsyncThunk(
  "career/updateCareer",
  async ({ id, formData }, thunkApi) => {
    try {
      const res = await API.put(`/career/update/${id}`, formData);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// DELETE CAREER
export const deleteCareer = createAsyncThunk(
  "career/deleteCareer",
  async (id, thunkApi) => {
    try {
      const res = await API.delete(`/career/delete/${id}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// GET ALL CAREERS (Admin - includes inactive)
export const getAllCareersAdmin = createAsyncThunk(
  "career/getAllCareersAdmin",
  async (_, thunkApi) => {
    try {
      // TODO: need to create a separate admin endpoint that includes inactive jobs
      const res = await API.get("/career/admin/get-all");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ============= JOB APPLICATIONS (Admin Only) =============

// GET ALL APPLICATIONS
export const getAllApplications = createAsyncThunk(
  "career/getAllApplications",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/career/applications");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// UPDATE APPLICATION STATUS
export const updateApplicationStatus = createAsyncThunk(
  "career/updateApplicationStatus",
  async ({ id, status }, thunkApi) => {
    try {
      const res = await API.put(`/career/application-status/${id}`, { status });
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
