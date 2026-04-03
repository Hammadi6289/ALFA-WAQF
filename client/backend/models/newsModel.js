import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "News title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Full content is required"],
    },
    image: {
      type: String, // base64
      required: [true, "Featured image is required"],
    },
    category: {
      type: String,
      enum: ["announcement", "event", "achievement", "general"],
      default: "general",
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Create index for search
newsSchema.index({ title: "text", content: "text" });

const newsModel = mongoose.model("News", newsSchema);
export default newsModel;
