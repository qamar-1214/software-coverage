import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  softwareId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Software",
    required: true,
  },
  software: {
    name: { type: String, required: true },
    imageUrl: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  },
  ratings: {
    easeOfUse: {
      type: Number,
      required: true,
      min: [1, "Ease of use rating must be at least 1"],
    },
    valueForMoney: {
      type: Number,
      required: true,
      min: [1, "Value for money rating must be at least 1"],
    },
    features: {
      type: Number,
      required: true,
      min: [1, "Features rating must be at least 1"],
    },
    customerSupport: {
      type: Number,
      required: true,
      min: [1, "Customer support rating must be at least 1"],
    },
  },
  positiveReview: {
    type: String,
    required: true,
    minlength: [100, "Positive review must be at least 100 characters"],
    maxlength: [2500, "Positive review cannot exceed 2500 characters"],
  },
  negativeReview: {
    type: String,
    required: true,
    minlength: [100, "Negative review must be at least 100 characters"],
    maxlength: [2500, "Negative review cannot exceed 2500 characters"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Add this field
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
