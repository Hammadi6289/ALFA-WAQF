import API from "../../Api/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ============= CAMPAIGNS =============

// GET all campaigns (admin)
export const getAllCampaigns = createAsyncThunk(
  "donation/getAllCampaigns",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/donations/admin/campaigns");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ADD campaign
export const addCampaign = createAsyncThunk(
  "donation/addCampaign",
  async (formData, thunkApi) => {
    try {
      const res = await API.post("/donations/admin/campaigns/add", formData);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// UPDATE campaign
export const updateCampaign = createAsyncThunk(
  "donation/updateCampaign",
  async ({ id, formData }, thunkApi) => {
    try {
      const res = await API.patch(
        `/donations/admin/campaigns/update/${id}`,
        formData
      );
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// DELETE campaign
export const deleteCampaign = createAsyncThunk(
  "donation/deleteCampaign",
  async (id, thunkApi) => {
    try {
      const res = await API.delete(`/donations/admin/campaigns/delete/${id}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ============= HERO SLIDES =============

// GET all hero slides (admin)
export const getAllHeroSlides = createAsyncThunk(
  "donation/getAllHeroSlides",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/donations/admin/hero-slides");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// ADD hero slide
export const addHeroSlide = createAsyncThunk(
  "donation/addHeroSlide",
  async (formData, thunkApi) => {
    try {
      const res = await API.post("/donations/admin/hero-slides/add", formData);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// UPDATE hero slide
export const updateHeroSlide = createAsyncThunk(
  "donation/updateHeroSlide",
  async ({ id, formData }, thunkApi) => {
    try {
      const res = await API.patch(
        `/donations/admin/hero-slides/update/${id}`,
        formData
      );
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// DELETE hero slide
export const deleteHeroSlide = createAsyncThunk(
  "donation/deleteHeroSlide",
  async (id, thunkApi) => {
    try {
      const res = await API.delete(`/donations/admin/hero-slides/delete/${id}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
