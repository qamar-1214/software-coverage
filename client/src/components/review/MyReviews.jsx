import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import {
  reviewApi,
  useGetMyReviewsQuery,
} from "../../store/api/review/reviewApi";
import { useFetchUserDataQuery } from "../../store/api/auth/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Sidebar from "../sidebars/Sidebar";

const MyReviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("reviews");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const { data: userData, isLoading: isUserLoading } = useFetchUserDataQuery();
  const {
    data: reviews = [],
    error,
    isLoading: isReviewsLoading,
  } = useGetMyReviewsQuery(undefined, {
    skip: isUserLoading || !userData?.user, // Skip until user data is loaded
  });

  // Invalidate cache when user changes
  useEffect(() => {
    if (userData?.user) {
      dispatch(reviewApi.util.invalidateTags(["Review"])); // Clear MyReviews cache
    }
  }, [userData, dispatch]);

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

  if (isUserLoading || isReviewsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!userData?.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Please log in to view your reviews.
      </div>
    );
  }

  if (error) {
    toast.error(
      `Failed to load reviews: ${error?.data?.error || "Unknown error"}`
    );
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error loading reviews.
      </div>
    );
  }

  // Filter reviews to include only those with userId
  const validReviews = reviews.filter((review) => review.userId);

  const calculateAverageRating = (review) => {
    const { easeOfUse, valueForMoney, features, customerSupport } =
      review.ratings || {};
    return (
      (easeOfUse + valueForMoney + features + customerSupport) /
      4
    ).toFixed(2);
  };

  return (
    <div className="flex min-h-screen pt-10 bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        className={`flex-1 p-6 ${
          isSidebarCollapsed ? "pl-20 sm:pl-24" : "pl-80"
        }`}
      >
        <div className="w-full px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">My Software Reviews</h2>
            {validReviews.length === 0 ? (
              <p className="text-gray-900 mb-4">
                Currently, you do not have any Software Reviews.
              </p>
            ) : (
              <p className="text-gray-900 mb-4">
                From here you can Write new reviews or edit old ones.
              </p>
            )}
            <button
              onClick={() => navigate("/write-review")}
              className="text-blue-900 text-lg my-10 font-semibold underline hover:bg-blue-100 px-5 py-2 rounded transition-all ease-in-out"
            >
              Write a Review
            </button>
          </div>
          <div>
            {validReviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-xl shadow-xl p-6 mb-6"
              >
                <div className="flex flex-col sm:flex-row justify-start gap-12 items-start">
                  <div className="flex flex-col gap-12 m-6 items-center mb-4 sm:mb-0">
                    <img
                      src={
                        review.software?.imageUrl?.url ||
                        "https://via.placeholder.com/50"
                      }
                      alt="Logo"
                      className="w-12 h-12 mr-4"
                    />
                    <h2 className="text-lg text-gray-500 font-semibold">
                      {review.software?.name || "Unknown Software"}
                    </h2>
                  </div>
                  <div className="text-center sm:text-right">
                    <h3 className="text-lg font-semibold mb-2">
                      <span className="text-gray-500"> Overall Rating</span>{" "}
                      {calculateAverageRating(review)}/5
                    </h3>
                    <div className="flex gap-4 justify-center sm:justify-end">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(calculateAverageRating(review))
                              ? "text-yellow-400"
                              : star ===
                                  Math.ceil(calculateAverageRating(review)) &&
                                calculateAverageRating(review) % 1 !== 0
                              ? "text-yellow-400"
                              : "text-gray-800"
                          }`}
                          fill={
                            star <= calculateAverageRating(review)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-md text-gray-500 font-semibold mb-1">
                      What do you like best about{" "}
                      {review.software?.name || "software"}?
                    </h4>
                    <div className="border border-green-500 rounded-xl p-4 max-h-40 overflow-y-auto">
                      <p className="text-gray-700 break-words">
                        {review.positiveReview || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md text-gray-500 font-semibold mb-1">
                      What would you improve about{" "}
                      {review.software?.name || "software"}?
                    </h4>
                    <div className="border border-red-500 rounded-xl p-4 max-h-40 overflow-y-auto">
                      <p className="text-gray-700 break-words">
                        {review.negativeReview || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                  <div className="text-gray-500 text-sm mb-2 sm:mb-0">
                    <p>
                      Published {new Date(review.createdAt).toLocaleString()}
                    </p>
                    <p>
                      Last Edit {new Date(review.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to={`/edit-review/${review._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
