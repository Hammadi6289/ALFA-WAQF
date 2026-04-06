import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  getAllHeroSlides,
  addHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "../actions/donationActions";

const donationSlice = createSlice({
  name: "donation",
  initialState: {
    loading: false,
    success: false,
    campaigns: [],
    heroSlides: [],
    error: null,
  },
  reducers: {
    resetDonation: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL CAMPAIGNS
      .addCase(getAllCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload.campaigns || [];
      })
      .addCase(getAllCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD CAMPAIGN
      .addCase(addCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE CAMPAIGN
      .addCase(updateCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE CAMPAIGN
      .addCase(deleteCampaign.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL HERO SLIDES
      .addCase(getAllHeroSlides.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllHeroSlides.fulfilled, (state, action) => {
        state.loading = false;
        state.heroSlides = action.payload.slides || [];
      })
      .addCase(getAllHeroSlides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD HERO SLIDE
      .addCase(addHeroSlide.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHeroSlide.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addHeroSlide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE HERO SLIDE
      .addCase(updateHeroSlide.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHeroSlide.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateHeroSlide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE HERO SLIDE
      .addCase(deleteHeroSlide.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHeroSlide.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteHeroSlide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDonation } = donationSlice.actions;
export default donationSlice.reducer;
