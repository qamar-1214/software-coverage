import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Info,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useCreateReviewMutation,
  useGetSoftwaresQuery,
} from "../../store/api/review/reviewApi";

import { toast } from "react-toastify";
import Sidebar from "../sidebars/Sidebar";
import { useFetchUserDataQuery } from "../../store/api/auth/auth";

const WriteReview = () => {
  const navigate = useNavigate();
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
  const { data: softwares = [], isLoading, error } = useGetSoftwaresQuery();
  const { data: userData, isLoading: isUserLoading } = useFetchUserDataQuery();
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const itemsPerPage = 8;
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

  const filteredSoftwares = softwares.filter((software) =>
    software.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSoftwares.length / itemsPerPage);
  const paginatedSoftwares = filteredSoftwares.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleSubmit = async () => {
    if (isUserLoading) {
      toast.error("Please wait, user data is loading.");
      return;
    }
    if (!userData?.user) {
      toast.error("Please log in to submit a review.");
      return;
    }
    if (!selectedSoftware) {
      toast.error("Please select a software.");
      return;
    }
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

    const reviewData = {
      softwareId: selectedSoftware._id,
      ratings,
      positiveReview: reviewText.positive,
      negativeReview: reviewText.negative,
    };

    try {
      await createReview(reviewData).unwrap();
      toast.success("Review submitted successfully!");
      navigate("/my-reviews");
    } catch (error) {
      const errorMessage = error?.data?.error || "Failed to submit review.";
      toast.error(errorMessage);
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="flex min-h-screen pt-10 bg-gray-50">
      <Sidebar />
      <div
        className={`flex-1 p-6  ${
          isSidebarCollapsed ? "pl-20 sm:pl-24" : "pl-80"
        }`}
      >
        <h1 className="text-center text-3xl font-bold mb-6">Write Review</h1>
        <div className="w-full px-4">
          {isLoading ? (
            <div className="text-center mt-6">Loading softwares...</div>
          ) : error ? (
            <div className="text-center mt-6 text-red-600">
              {toast.error(
                `Failed to load softwares: ${
                  error?.data?.error || "Unknown error"
                }`
              )}
              Unable to load softwares. Please try again later.
            </div>
          ) : (
            <>
              <div className="mt-6 relative max-w-lg mx-auto">
                <div className="flex items-center mb-2">
                  <label className="text-gray-500 text-lg mr-2">
                    Software Name
                  </label>
                  <div className="group relative cursor-pointer">
                    <Info className="w-4 h-4 text-gray-500 group-hover:text-black transition duration-200" />
                    <span className="absolute z-10 w-40 text-xs bg-gray-700 text-white rounded p-2 -top-10 left-6 hidden group-hover:block">
                      Select the software you want to review
                    </span>
                  </div>
                </div>
                <div className="relative   ">
                  <div className="border  border-blue-800 rounded px-3 py-2 flex items-center bg-transparent">
                    <input
                      type="text"
                      value={
                        selectedSoftware
                          ? selectedSoftware.name
                          : "Select your Software"
                      }
                      readOnly
                      className="flex-1 outline-none bg-transparent cursor-pointer"
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                    />
                    {selectedSoftware && (
                      <X
                        className="w-4 h-4 text-gray-500 cursor-pointer mr-2"
                        onClick={() => setSelectedSoftware(null)}
                      />
                    )}
                    {isDropdownOpen ? (
                      <ChevronUp className="w-8 h-8 text-gray-900  font-bold" />
                    ) : (
                      <ChevronDown className="w-8 h-8 text-gray-900 font-bold" />
                    )}
                  </div>
                  <div
                    id="dropdown"
                    className={`absolute z-10 w-full bg-white rounded-lg shadow-lg mt-0 max-h-96 overflow-y-auto ${
                      isDropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    <div className="p-2 ">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search software..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full border  border-blue-800 rounded px-2 py-2 pr-8"
                        />
                        <Search className="w-4 h-4 text-gray-500 absolute right-2 top-3" />
                      </div>
                    </div>
                    {paginatedSoftwares.map((software) => (
                      <div
                        key={software._id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedSoftware(software);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {software.name}
                      </div>
                    ))}
                    {/* <div className="p-2  flex justify-between items-center">
                      <span>
                        Showing {paginatedSoftwares.length} of{" "}
                        {filteredSoftwares.length} results
                      </span>
                      <div className="flex gap-2">
                        <ChevronLeft
                          className={`w-4 h-4 ${
                            currentPage === 1
                              ? "text-gray-300"
                              : "text-gray-700 cursor-pointer"
                          }`}
                          onClick={() =>
                            currentPage > 1 &&
                            setCurrentPage((prev) => prev - 1)
                          }
                        />
                        <ChevronRight
                          className={`w-4 h-4 ${
                            currentPage === totalPages
                              ? "text-gray-300"
                              : "text-gray-700 cursor-pointer"
                          }`}
                          onClick={() =>
                            currentPage < totalPages &&
                            setCurrentPage((prev) => prev + 1)
                          }
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div
                className={`mt-6 bg-white rounded-xl shadow-xl p-6 ${
                  !selectedSoftware ? "blur-sm pointer-events-none" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                  <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-48 flex-shrink-0">
                    <img
                      src={
                        selectedSoftware?.imageUrl?.url ||
                        "https://via.placeholder.com/50"
                      }
                      alt="Logo"
                      className="w-12 h-12"
                    />
                    <h2 className="text-lg text-gray-500 font-semibold text-center">
                      {selectedSoftware?.name || "Software Name"}
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
                              onMouseLeave={() =>
                                handleRatingHover(section.key, 0)
                              }
                              onClick={() =>
                                handleRatingClick(section.key, star)
                              }
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
                      {selectedSoftware?.name || "software"}?
                    </label>
                    <textarea
                      value={reviewText.positive}
                      onChange={(e) =>
                        handleTextChange("positive", e.target.value)
                      }
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
                      {selectedSoftware?.name || "software"}?
                    </label>
                    <textarea
                      value={reviewText.negative}
                      onChange={(e) =>
                        handleTextChange("negative", e.target.value)
                      }
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
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded hover:from-blue-700 hover:to-blue-900 transition-colors px-6 py-2  ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
