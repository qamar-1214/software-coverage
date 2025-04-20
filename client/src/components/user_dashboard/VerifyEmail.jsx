import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { authApi, useVerifyEmailQuery } from "../../store/api/auth/auth";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [hasVerified, setHasVerified] = useState(false);

  const { data, error, isLoading } = useVerifyEmailQuery(token, {
    skip: !token || hasVerified,
  });

  useEffect(() => {
    if (data?.success) {
      setHasVerified(true);
      dispatch(authApi.util.invalidateTags(["User"]));
      toast.success("Email verified successfully!");
    } else if (error) {
      setHasVerified(true);
      toast.error(error?.data?.message || "Email verification failed.");
    }
  }, [data, error, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-xl w-full text-center">
        {data?.success ? (
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Your Email has been confirmed
          </h1>
        ) : (
          ""
        )}

        {isLoading ? (
          <p className="text-gray-600">Verifying your email, please wait...</p>
        ) : data?.success ? (
          <>
            <p className="text-gray-900 text-lg mb-6">
              You now have access to your{" "}
              <strong className="text-xl font-bold">
                Profile,Favorites,My Software
              </strong>{" "}
              and to <strong>Create/Edit Reviews</strong>
            </p>
            <button
              onClick={() => navigate("/user-dashboard")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
            >
              Account Dashboard
            </button>
          </>
        ) : (
          <p className="text-red-500">
            {error?.data?.message || "Invalid or expired verification link."}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
