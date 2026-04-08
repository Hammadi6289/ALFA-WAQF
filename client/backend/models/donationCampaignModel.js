import mongoose from "mongoose";

// Stores donation campaigns (like "Help Deserving Patients with Medicines", "Permanent Donor for Thalassemia Patient")
const donationCampaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Campaign title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Campaign description is required"],
    },
    image: {
      type: String, // base64 image
      required: [true, "Campaign image is required"],
    },
    type: {
      type: String,
      enum: ["medicines", "thalassemia", "Hemophilia", "Blood Disorders"],
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

const donationCampaignModel = mongoose.model(
  "DonationCampaign",
  donationCampaignSchema
);
export default donationCampaignModel;
