import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const verificationStatus = state?.verificationStatus;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img
        src="/SoftwareCoverage.png"
        alt="SoftwareCoverage"
        className="h-20 mb-4"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to SoftwareCoverage!
      </h1>
      {verificationStatus === "success" ? (
        <p className="text-gray-600 text-center mb-6">
          Your email has been verified successfully. You can now access your
          account and start exploring.
        </p>
      ) : (
        <p className="text-red-500 text-center mb-6">
          There was an issue with email verification. Please try again or
          request a new verification link.
        </p>
      )}
      <button
        onClick={() => navigate("/user-dashboard")}
        className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700"
      >
        Go to Account
      </button>
    </div>
  );
};

export default Welcome;
