import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useFetchUserDataQuery,
  useResendVerificationMutation,
} from "../../store/api/auth/auth";
import Sidebar from "../sidebars/Sidebar";
import { use } from "react";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { data: userData, isLoading: isUserLoading } = useFetchUserDataQuery();
  const [resendVerification, { isLoading: isResending }] =
    useResendVerificationMutation();

  const user = userData?.user;
  const emailDisplay = user?.email?.split("@")[0];

  const handleResendEmail = async () => {
    if (!user?.email) {
      toast.error("User email not found.");
      return;
    }
    try {
      await resendVerification({ email: user.email }).unwrap();
      toast.success("Verification email resent!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to resend email.");
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  console.log("isem", user?.isEmailVerified);
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-start mt-10 p-6">
        <div className="max-w-2xl w-full">
          {activeTab === "dashboard" && (
            <div className="flex flex-col ">
              <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
              <h2 className="text-2xl font-bold mb-6 text-center">
                Hello,
                {user?.isEmailVerified
                  ? user?.displayName || emailDisplay
                  : emailDisplay}
              </h2>
              {}
              <h2 className="text-2xl font-bold text-center mb-1">
                {user?.isEmailVerified
                  ? "Begin your Software Coverage Journey."
                  : "Confirm E-mail"}
              </h2>

              {user?.isEmailVerified ? (
                <p className="text-gray-900 text-center">
                  You are now ready to create your first review, claim & edit
                  your Software and more.
                </p>
              ) : (
                <div className="text-center">
                  <p className="text-gray-900 text-center">
                    Please confirm your e-mail address, to gain access to your{" "}
                    <strong className="text-xl font-bold mb-4 text-center">
                      Profile{" "}
                    </strong>
                    Account and other features. If you cannot find our email in
                    your inbox (check spam box), use the following link to
                    re-send a new email.
                  </p>
                  <button
                    onClick={handleResendEmail}
                    disabled={isResending}
                    className={`text-blue-600 hover:text-blue-800 underline-offset-4 ${
                      isResending ? "pointer-events-none" : "hover:underline"
                    } transition-colors duration-200 relative`}
                  >
                    {isResending ? (
                      <span className="flex space-x-1">
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse delay-200"></span>
                      </span>
                    ) : (
                      "Resend Email Confirmation"
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
          {activeTab === "coupons" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Coupons</h2>
              <p className="text-gray-700 text-center">
                Your coupons will be displayed here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
