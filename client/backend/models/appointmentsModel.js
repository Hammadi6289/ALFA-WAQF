import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // like a foreign key
      ref: "user",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "doctor",
    },
    patientName: {
      type: String,
      required: false,
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
