import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // like a foreign key
      require: true,
      ref: "user",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "doctor",
    },
    slotDate: {
      type: String,
      require: true,
    },
    slotTime: {
      type: String,
      require: true,
    },
    amount: {
      type: String,
      require: true,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "pending",
      lowercase: true,
      enum: ["pending", "completed", "cancelled"],
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointment", appointmentSchema);
export default appointmentModel;
