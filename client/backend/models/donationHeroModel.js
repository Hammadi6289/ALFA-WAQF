import mongoose from "mongoose";

const donationHeroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Hero title is required"],
    },
    subtitle: {
      type: String,
    },
    image: {
      type: String, // base64 image
      required: [true, "Hero image is required"],
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationCampaign",
      required: true,
    },
    buttonText: {
      type: String,
      default: "Donate Now",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const donationHeroModel = mongoose.model("DonationHero", donationHeroSchema);
export default donationHeroModel;
