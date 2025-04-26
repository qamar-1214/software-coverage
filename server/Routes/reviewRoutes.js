import express from "express";
import {
  createReview,
  getReviewById,
  getMyReviews,
  updateReview,
} from "../Controllers/review/reviewController.js";
import authToken from "../middlewares/authToken.js";

const reviewRouter = express.Router();

reviewRouter.get("/my-reviews", authToken, getMyReviews);
reviewRouter.get("/fetch-review/:id", authToken, getReviewById);
reviewRouter.post("/add-reviews", authToken, createReview);
reviewRouter.put("/update-reviews/:id", authToken, updateReview);

export default reviewRouter;
