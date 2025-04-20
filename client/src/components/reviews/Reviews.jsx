// components/Reviews.jsx
import React, { useState } from "react";
import { useFetchUserDataQuery } from "../../store/api/auth/auth";
import Sidebar from "../sidebars/Sidebar";

const Reviews = () => {
  const [activeTab, setActiveTab] = useState("reviews");
  const { data: userData, isLoading: isUserLoading } = useFetchUserDataQuery();

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex justify-center mt-10 p-6">
        <div className="max-w-2xl w-full flex flex-col  gap-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            My Software Reviews
          </h2>
          <p className="text-gray-900 text-center">
            Currently, you do not have any Software Reviews.
          </p>
          <div className="flex justify-center items-center">
            <button className="text-blue-900 text-lg font-semibold underline hover:bg-blue-100 px-5 py-2 rounded transition-all ease-in-out ">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews; // components/Reviews.jsx
