import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    aboutUs: {
      type: String,
      required: [true, "About Us is required"],
    },
    theRole: {
      type: String,
      required: [true, "The Role description is required"],
    },
    whatYoullDo: {
      type: String,
      required: [true, "What you'll do is required"],
    },
    whatYoullBring: {
      type: String,
      required: [true, "What you'll bring is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const careerModel = mongoose.model("Career", careerSchema);
export default careerModel;
