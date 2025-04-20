// components/Profile.jsx
import React, { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { toast } from "react-toastify";
import {
  useFetchUserDataQuery,
  useUpdateProfileMutation,
  useResendVerificationMutation,
} from "../../store/api/auth/auth";
import Sidebar from "../sidebars/Sidebar";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { data: userData, isLoading: isUserLoading } = useFetchUserDataQuery();
  const [resendVerification, { isLoading: isResending }] =
    useResendVerificationMutation();

  const user = userData?.user;

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
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex  min-h-screen h-full bg-gray-100">
      {/* Sidebar only if user is verified */}
      {user?.isEmailVerified && (
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* Main Content */}
      {user?.isEmailVerified ? (
        <div className="flex-1 flex justify-center items-center p-6">
          <div className="max-w-2xl w-full">
            <ProfileUpdateForm />
          </div>
        </div>
      ) : (
        // No Access Full Page Layout
        <div className="flex-1 flex flex-col justify-between bg-white min-h-screen">
          {/* Center Box */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-5xl w-full text-center">
              <h2 className="text-7xl font-bold mb-4">No Access</h2>
              <p className="text-gray-900 text-4xl mb-8">
                Currently you do not have access to this page.
              </p>
              <p className="text-gray-900 text-4xl mb-6">
                Follow the next steps to gain access:
              </p>
              <ol className="list-decimal list-inside text-center text-gray-700 space-y-2 mb-6">
                <li className="text-xl mb-2">
                  <strong>
                    Confirm your e-mail address <br />
                  </strong>{" "}
                  (if you have not done this already).
                  <br />
                  This is required to have access to your Profile page.
                </li>
                <li className="text-xl mb-2">
                  <strong>Please fill out your profile form.</strong>
                  <br />
                  This step is required for access to Claiming your Software or
                  submitting a Review.
                </li>
              </ol>
              <button
                onClick={() => navigate("/profile")}
                className="bg-blue-700 text-white rounded-lg px-4 py-2 hover:bg-blue-800 transition-colors"
              >
                My Profile
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white py-4 text-center border-t">
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className={`text-blue-600 hover:text-blue-800 underline-offset-4 ${
                isResending ? "pointer-events-none" : "hover:underline"
              } transition-colors duration-200 relative`}
            >
              {isResending ? (
                <span className="flex justify-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse delay-200"></span>
                </span>
              ) : (
                "Resend Email Confirmation"
              )}
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};

const ProfileUpdateForm = () => {
  const { data: userData } = useFetchUserDataQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: userData?.user?.displayName || "",
    email: userData?.user?.email || "",
    password: "",
    profileImage: null,
    companyName: "",
    companyPosition: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully");
      // Reset formData — preserve fields with values, clear others
      setFormData((prev) => ({
        displayName: prev.displayName || "",
        email: prev.email || "",
        firstName: prev.firstName || "",
        lastName: prev.lastName || "",
        publicName: prev.publicName || "",
        companyName: prev.companyName || "",
        companyPosition: prev.companyPosition || "",
        password: "", // always clear password
        profileImage: null, // clear uploaded image
      }));
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const fields = [
    {
      label: "First Name",
      name: "firstName",
      placeholder: "Enter your first name",
      info: "This is the First name of the user.",
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter your last name",
      info: "This is the Second name of the user.",
    },
    {
      label: "Public Name",
      name: "displayName",
      placeholder: "Enter your public name",
      info: "This name will be publicly visible",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      info: "Provide a proper email",
    },
    {
      label: "New Password",
      name: "password",
      type: "password",
      placeholder: "Leave blank to keep current password",
      info: "Provide a unique and min 6 character password.",
    },
  ];

  const businessFields = [
    {
      label: "Your Company",
      name: "companyName",
      placeholder: "Enter company name",
      info: "Your company or brand",
    },
    {
      label: "Company Position",
      name: "companyPosition",
      placeholder: "Enter your position",
      info: "Your role in the company",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Profile Image Section */}
      <div className="flex justify-center mb-6 relative">
        <div className="group relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
          {formData.profileImage ? (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={userData?.user?.profileImage || "/default-avatar.png"}
              alt="Default"
              className="w-full h-full object-cover"
            />
          )}
          <label className="absolute inset-0 bg-black bg-opacity-30 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
            Edit
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Personal Info */}
        <div>
          <h3 className="text-3xl  font-bold mb-4 ml-5">Personal Info</h3>
          {fields.map(({ label, name, placeholder, type = "text", info }) => (
            <div key={name} className="mb-4 w-[250px]">
              <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                {label}
                <div className="group relative cursor-pointer">
                  <Info className="w-4 h-4 text-gray-500 group-hover:text-black transition duration-200" />
                  {info && (
                    <span className="absolute z-10 hidden group-hover:block w-40 text-xs bg-gray-700 text-white rounded p-2 -top-10 left-6">
                      {info}
                    </span>
                  )}
                </div>
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full px-2 py-[6px] rounded-md border border-transparent focus:border-black bg-transparent focus:outline-none text-sm placeholder-gray-400"
              />
            </div>
          ))}
        </div>

        {/* Business Info */}
        <div>
          <h3 className="text-3xl  font-bold mb-4 ml-5">Business Info</h3>
          {businessFields.map(({ label, name, placeholder, info }) => (
            <div key={name} className="mb-4 w-[250px]">
              <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                {label}
                <div className="group relative cursor-pointer">
                  <Info className="w-4 h-4 text-gray-500 group-hover:text-black transition duration-200" />
                  <span className="absolute z-10 hidden group-hover:block w-40 text-xs bg-gray-700 text-white rounded p-2 -top-10 left-6">
                    {info}
                  </span>
                </div>
              </label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full px-2 py-[6px] rounded-md border border-transparent focus:border-black bg-transparent focus:outline-none text-sm placeholder-gray-400"
              />
            </div>
          ))}
        </div>
      </form>
      <div className="min-w-full bg-white w-[100%] px-5 py-4 flex items-center justify-center">
        <div className="text-center  ">
          <button
            type="submit"
            disabled={isUpdating}
            onClick={handleSubmit}
            className="px-4 py-2.5 navbarBtnEndWithGradient"
          >
            {isUpdating ? "Updating..." : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
