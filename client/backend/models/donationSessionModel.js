import mongoose from "mongoose";

const donationSessionSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationCampaign",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    donorTitle: {
      type: String,
      default: "",
    },
    donorName: {
      type: String,
      required: true,
    },
    donorEmail: {
      type: String,
      required: true,
    },
    donorPhone: {
      type: String,
      required: true,
    },
    donorAddress: {
      type: String,
      default: "",
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "expired"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  },
  { timestamps: true }
);

const donationSessionModel = mongoose.model(
  "DonationSession",
  donationSessionSchema
);
export default donationSessionModel;
