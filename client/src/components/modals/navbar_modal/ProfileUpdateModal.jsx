import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import {
  useFetchUserDataQuery,
  useUpdateProfileMutation,
} from "../../../store/api/auth/auth";
import {
  setProfileForm,
  toggleShowPassword,
  resetProfileForm,
} from "../../../store/slices/auth/authSlice";

const ProfileUpdateModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { profileForm, showPassword } = useSelector((state) => state.auth);
  const { data: userData, refetch } = useFetchUserDataQuery();
  const [updateProfile, { isLoading: isUpdatingProfile, error: updateError }] =
    useUpdateProfileMutation();
  const [fileUrl, setFileUrl] = useState(userData?.user?.profileImage || "");

  // Prefill form with user data
  useEffect(() => {
    if (userData?.user && isOpen) {
      dispatch(
        setProfileForm({
          email: userData.user.email || "",
          displayName: userData.user.displayName || "",
          password: "",
          profileImage: null,
        })
      );
      setFileUrl(userData.user.profileImage || "");
    }
  }, [userData, isOpen, dispatch]);

  // Clean up fileUrl
  useEffect(() => {
    return () => {
      if (fileUrl && fileUrl.startsWith("blob:")) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const frontendUrl = URL.createObjectURL(file);
      setFileUrl(frontendUrl);
      dispatch(setProfileForm({ profileImage: file }));
    }
  };

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (profileForm.profileImage) {
        formData.append("profileImage", profileForm.profileImage);
      }
      if (profileForm.email?.trim()) {
        formData.append("email", profileForm.email.trim());
      }
      if (profileForm.password?.trim()) {
        formData.append("password", profileForm.password.trim());
      }
      if (profileForm.displayName?.trim()) {
        formData.append("displayName", profileForm.displayName.trim());
      }

      const response = await updateProfile(formData).unwrap();
      toast.success(response.message || "Profile updated!");
      refetch();
      setIsOpen(false);
      dispatch(resetProfileForm());
      setFileUrl("");
    } catch (error) {
      toast.error(error?.data?.message || "Profile update failed.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm bg-white/30 z-50"
      style={{ zIndex: "999" }}
    >
      <div className="bg-white/90 rounded-lg shadow-xl w-full max-w-md p-4 sm:p-6 relative">
        <button
          onClick={() => {
            setIsOpen(false);
            dispatch(resetProfileForm());
            setFileUrl("");
          }}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <div className="space-y-4 sm:space-y-3 max-h-[80vh] overflow-y-auto">
          <div className="text-center flex flex-col items-center">
            <img
              src="/SoftwareCoverage.png"
              alt="SoftwareCoverage"
              className="h-16 sm:h-26 mb-2"
            />
            <h2 className="text-3xl font-[400] text-gray-800">
              Update Profile
            </h2>
            <p className="text-gray-600 mt-3 text-lg sm:text-base">
              Update your profile details and image
            </p>
          </div>
          <form onSubmit={handleUpdateProfileSubmit} className="space-y-4">
            {updateError && (
              <p className="text-red-500 text-sm">
                {updateError.data?.message || "Profile update failed"}
              </p>
            )}
            <div className="flex justify-center">
              <label className="relative cursor-pointer">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {fileUrl ? (
                    <img
                      src={fileUrl}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1 sm:p-2 text-xs sm:text-sm">
                  Edit
                </span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <input
                type="text"
                placeholder="Enter display name"
                value={profileForm.displayName || ""}
                onChange={(e) =>
                  dispatch(setProfileForm({ displayName: e.target.value }))
                }
                className="mt-1 w-full bg-white/90 rounded-lg shadow-sm border border-gray-300 focus:border-black focus:ring-0 px-3 py-2 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter new email"
                value={profileForm.email || ""}
                onChange={(e) =>
                  dispatch(setProfileForm({ email: e.target.value }))
                }
                className="mt-1 w-full bg-white/90 rounded-lg shadow-sm border border-gray-300 focus:border-black focus:ring-0 px-3 py-2 text-sm sm:text-base"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={profileForm.password || ""}
                onChange={(e) =>
                  dispatch(setProfileForm({ password: e.target.value }))
                }
                className="mt-1 w-full bg-white/90 rounded-lg shadow-sm border border-gray-300 focus:border-black focus:ring-0 px-3 py-2 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => dispatch(toggleShowPassword())}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="w-full bg-purple-600 text-white rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 hover:bg-purple-700 transition-colors text-sm sm:text-base"
            >
              {isUpdatingProfile ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;
