// components/EmailVerificationAlert.jsx
import React from "react";

const EmailVerificationAlert = ({ onResend }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-orange-500 shadow-xl text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm sm:text-base">
      <p className="mb-2 sm:mb-0">
        📩 We've sent a verification email. Please check your inbox and verify
        your email address.
      </p>
      <button
        onClick={onResend}
        className="text-blue-200 underline hover:text-white transition"
      >
        Resend Confirmation Email
      </button>
    </div>
  );
};

export default EmailVerificationAlert;
