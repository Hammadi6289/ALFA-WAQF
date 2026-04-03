import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema(
  {
    blockType: {
      type: String,
      required: true,
      enum: [
        "why-choose",
        "facility",
        "our-work",
        "key-facts",
        "testimonial",
        "hero",
        "cta",
        "feature",
        "video",
        "team",
        "gallery",
        "partner",
        "service",
        "about",
        "contact-info",
      ],
    },
    title: {
      type: String,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    // Main image for the block
    image: {
      type: String, // base64
    },
    // Multiple images (for galleries, teams, etc.)
    images: [String],
    // Button configuration
    buttonText: {
      type: String,
      default: "Learn More",
    },
    buttonLink: {
      type: String,
      default: "/doctors",
    },
    buttonType: {
      type: String,
      enum: ["primary", "secondary", "tertiary"],
      default: "primary",
    },
    // For blocks with multiple items (why-choose items, facilities, etc.)
    items: [
      {
        title: { type: String, required: true },
        description: { type: String },
        image: { type: String }, // base64
        icon: { type: String }, // FontAwesome icon class
        link: { type: String },
        buttonText: { type: String },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
      },
    ],
    // Layout and styling
    settings: {
      layout: {
        type: String,
        enum: ["grid", "list", "carousel"],
        default: "grid",
      },
      columns: { type: Number, default: 3, min: 1, max: 4 },
      backgroundColor: { type: String, default: "#ffffff" },
      textColor: { type: String, default: "#2a0f45" },
      showTitle: { type: Boolean, default: true },
      showSubtitle: { type: Boolean, default: true },
    },
    // Order and visibility
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create index for faster queries
contentBlockSchema.index({ blockType: 1, order: 1, isActive: 1 });

const contentBlockModel = mongoose.model("ContentBlock", contentBlockSchema);
export default contentBlockModel;
