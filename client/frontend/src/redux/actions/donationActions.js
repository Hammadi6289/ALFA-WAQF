import API from "../../Api/API";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ============= PUBLIC ROUTES =============

// GET all active campaigns
export const getActiveCampaigns = createAsyncThunk(
  "donation/getActiveCampaigns",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/donations/campaigns/active");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// GET active hero slides
export const getActiveHeroSlides = createAsyncThunk(
  "donation/getActiveHeroSlides",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/donations/hero-slides/active");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// GET campaign by type
export const getCampaignByType = createAsyncThunk(
  "donation/getCampaignByType",
  async (type, thunkApi) => {
    try {
      const res = await API.get(`/donations/campaigns/type/${type}`);
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
