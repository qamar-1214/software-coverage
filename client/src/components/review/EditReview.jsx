import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Info, Star } from "lucide-react";
import {
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
} from "../../store/api/review/reviewApi";
import { toast } from "react-toastify";
import Sidebar from "../sidebars/Sidebar";

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reviews");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const { data: review, error, isLoading } = useGetReviewByIdQuery(id);
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [ratings, setRatings] = useState({
    easeOfUse: 0,
    valueForMoney: 0,
    features: 0,
    customerSupport: 0,
  });
  const [hoveredRatings, setHoveredRatings] = useState({
    easeOfUse: 0,
    valueForMoney: 0,
    features: 0,
    customerSupport: 0,
  });
  const [reviewText, setReviewText] = useState({
    positive: "",
    negative: "",
  });

  const MIN_CHARS = 100;
  const MAX_CHARS = 2500;

  // Listen for sidebar collapse changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsSidebarCollapsed(
        localStorage.getItem("sidebarCollapsed") === "true"
      );
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(() => {
      setIsSidebarCollapsed(
        localStorage.getItem("sidebarCollapsed") === "true"
      );
    }, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (
      review &&
      review.ratings &&
      review.positiveReview &&
      review.negativeReview
    ) {
      setRatings(review.ratings);
      setReviewText({
        positive: review.positiveReview,
        negative: review.negativeReview,
      });
    }
  }, [review]);

  const ratingLabels = [
    "Very disappointed",
    "Poor experience",
    "Needs improvement",
    "Great overall experience",
    "Outstanding experience",
  ];

  const sections = [
    { key: "easeOfUse", label: "Ease of use" },
    { key: "valueForMoney", label: "Value for money" },
    { key: "features", label: "Features" },
    { key: "customerSupport", label: "Customer support" },
  ];

  const handleRatingClick = (section, value) => {
    setRatings((prev) => ({ ...prev, [section]: value }));
  };

  const handleRatingHover = (section, value) => {
    setHoveredRatings((prev) => ({ ...prev, [section]: value }));
  };

  const handleTextChange = (field, value) => {
    if (value.length > MAX_CHARS) {
      toast.error(
        `Maximum ${MAX_CHARS} characters allowed for ${field} review.`
      );
      return;
    }
    setReviewText((prev) => ({ ...prev, [field]: value }));
  };

  const getCharCountDisplay = (text) => {
    if (text.length < MIN_CHARS) {
      return `${MIN_CHARS - text.length} ch/${MIN_CHARS} ch`;
    }
    return `${MAX_CHARS - text.length} ch/${MAX_CHARS} ch`;
  };

  const handleUpdate = async () => {
    if (reviewText.positive.length < MIN_CHARS) {
      toast.error("Positive review must be at least 100 characters.");
      return;
    }
    if (reviewText.negative.length < MIN_CHARS) {
      toast.error("Negative review must be at least 100 characters.");
      return;
    }
    const requiredRatings = [
      "easeOfUse",
      "valueForMoney",
      "features",
      "customerSupport",
    ];
    for (const rating of requiredRatings) {
      if (ratings[rating] === 0) {
        toast.error(
          `${sections.find((s) => s.key === rating).label} rating is required.`
        );
        return;
      }
    }

    const updatedReview = {
      id,
      ratings,
      positiveReview: reviewText.positive,
      negativeReview: reviewText.negative,
      updatedAt: new Date(),
    };

    try {
      await updateReview(updatedReview).unwrap();
      toast.success("Review updated successfully!");
      navigate("/my-reviews");
    } catch (error) {
      const errorMessage = error?.data?.error || "Failed to update review.";
      toast.error(errorMessage);
      console.error("Update error:", error);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (error || !review) {
    toast.error(
      `Failed to load review: ${error?.data?.error || "Review not found"}`
    );
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error loading review.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen pt-5 bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        className={`flex-1 p-6 ${
          isSidebarCollapsed ? "pl-20 sm:pl-24" : "pl-80"
        }`}
      >
        <div className="w-full px-4 mx-auto shadow-xl rounded-xl  bg-white py-12">
          <h1 className="text-center font-bold text-3xl py-4">Edit Review</h1>
          <div className="mt-6 flex flex-col gap-8 bg-white rounded-xl shadow-xl p-10">
            <div className="flex flex-col sm:flex-row gap-8 items-center mb-6">
              <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-48 flex-shrink-0">
                <img
                  src={
                    review.software?.imageUrl?.url ||
                    "https://via.placeholder.com/50"
                  }
                  alt="Logo"
                  className="w-12 h-12"
                />
                <h2 className="text-lg text-gray-500 font-semibold text-center">
                  {review.software?.name || "Unknown Software"}
                </h2>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sections.map((section) => (
                  <div key={section.key}>
                    <label className="text-gray-500 text-sm block mb-1">
                      {hoveredRatings[section.key]
                        ? ratingLabels[hoveredRatings[section.key] - 1]
                        : section.label}
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            star <=
                            (hoveredRatings[section.key] ||
                              ratings[section.key])
                              ? "text-yellow-400"
                              : "text-gray-800"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          onMouseEnter={() =>
                            handleRatingHover(section.key, star)
                          }
                          onMouseLeave={() => handleRatingHover(section.key, 0)}
                          onClick={() => handleRatingClick(section.key, star)}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="text-gray-500 text-md mb-1">
                  What do you like best about{" "}
                  {review.software?.name || "software"}?
                </label>
                <textarea
                  value={reviewText.positive}
                  onChange={(e) => handleTextChange("positive", e.target.value)}
                  className="w-full h-32 border border-green-500 rounded p-2 focus:border-black hover:border-black transition"
                  minLength={MIN_CHARS}
                  maxLength={MAX_CHARS}
                />
                <span className="absolute bottom-2 right-2 text-gray-500 text-xs">
                  {getCharCountDisplay(reviewText.positive)}
                </span>
              </div>
              <div className="relative">
                <label className="text-gray-500 text-md mb-1">
                  What would you improve about{" "}
                  {review.software?.name || "software"}?
                </label>
                <textarea
                  value={reviewText.negative}
                  onChange={(e) => handleTextChange("negative", e.target.value)}
                  className="w-full h-32 border border-red-500 rounded p-2 focus:border-black hover:border-black transition"
                  minLength={MIN_CHARS}
                  maxLength={MAX_CHARS}
                />
                <span className="absolute bottom-2 right-2 text-gray-500 text-xs">
                  {getCharCountDisplay(reviewText.negative)}
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded hover:from-blue-700 hover:to-blue-900 transition-colors px-6 py-2 ${
                  isUpdating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "Updating..." : "Update Review"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
