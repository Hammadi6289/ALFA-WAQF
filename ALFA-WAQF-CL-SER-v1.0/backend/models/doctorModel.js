import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    about: {
      type: String,
      required: [true, "About doctor field is required"],
    },
    degree: {
      type: String,
      required: [true, "degree is required"],
    },
    speciality: {
      type: String,
      required: [true, "speciality is required"],
    },
    experience: {
      type: Number,
      required: [true, "experience is required"],
    },
    fees: {
      type: Number,
      required: [true, "Doctor Fee is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctor", doctorSchema);
export default doctorModel;
