import Review from "../../Models/review/review.model.js";
import Software from "../../Models/softwareModel.js";

export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.userId })
      .populate("softwareId", "name imageUrl")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Error in getMyReviews:", error.stack);
    res.status(500).json({ error: "Server error" });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "softwareId",
      "name imageUrl"
    );
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    console.error("Error in getReviewById:", error.stack);
    res.status(500).json({ error: "Server error" });
  }
};

export const createReview = async (req, res) => {
  try {
    const { softwareId, ratings, positiveReview, negativeReview } = req.body;

    // Validate softwareId
    const software = await Software.findById(softwareId);
    if (!software) {
      return res.status(400).json({ error: "Invalid software ID" });
    }

    // Validate ratings
    const requiredRatings = [
      "easeOfUse",
      "valueForMoney",
      "features",
      "customerSupport",
    ];
    for (const rating of requiredRatings) {
      if (!ratings[rating] || ratings[rating] < 1) {
        return res.status(400).json({
          error: `${rating} rating is required and must be at least 1`,
        });
      }
    }

    // Create review
    const review = new Review({
      softwareId,
      userId: req.userId, // Add userId from authToken
      software: {
        name: software.name,
        imageUrl: software.imageUrl,
      },
      ratings,
      positiveReview,
      negativeReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error in createReview:", error.stack);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: errors.join("; ") });
    }
    res.status(500).json({ error: "Server error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { ratings, positiveReview, negativeReview } = req.body;

    // Validate ratings
    const requiredRatings = [
      "easeOfUse",
      "valueForMoney",
      "features",
      "customerSupport",
    ];
    for (const rating of requiredRatings) {
      if (!ratings[rating] || ratings[rating] < 1) {
        return res.status(400).json({
          error: `${rating} rating is required and must be at least 1`,
        });
      }
    }

    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // Ensure userId matches
      { ratings, positiveReview, negativeReview, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate("softwareId", "name imageUrl");

    if (!review) {
      return res.status(404).json({
        error: "Review not found or you are not authorized to edit this review",
      });
    }
    res.json(review);
  } catch (error) {
    console.error("Error in updateReview:", error.stack);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: errors.join("; ") });
    }
    res.status(500).json({ error: "Server error" });
  }
};
