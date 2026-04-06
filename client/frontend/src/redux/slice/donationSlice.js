import { createSlice } from "@reduxjs/toolkit";
import {
  getActiveCampaigns,
  getActiveHeroSlides,
  getCampaignByType,
} from "../actions/donationActions";

const donationSlice = createSlice({
  name: "donation",
  initialState: {
    loading: false,
    campaigns: [],
    heroSlides: [],
    selectedCampaign: null,
    error: null,
  },
  reducers: {
    resetDonation: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ACTIVE CAMPAIGNS
      .addCase(getActiveCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActiveCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload.campaigns || [];
      })
      .addCase(getActiveCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ACTIVE HERO SLIDES
      .addCase(getActiveHeroSlides.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActiveHeroSlides.fulfilled, (state, action) => {
        state.loading = false;
        state.heroSlides = action.payload.slides || [];
      })
      .addCase(getActiveHeroSlides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET CAMPAIGN BY TYPE
      .addCase(getCampaignByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCampaignByType.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCampaign = action.payload.campaign;
      })
      .addCase(getCampaignByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDonation } = donationSlice.actions;
export default donationSlice.reducer;
