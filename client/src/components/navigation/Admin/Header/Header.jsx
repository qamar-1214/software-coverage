import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { User, LogOut, Settings } from "lucide-react";
import {
  authApi,
  useFetchUserDataQuery,
  useLogoutMutation,
} from "../../../../store/api/auth/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileUpdateModal from "../../../modals/navbar_modal/ProfileUpdateModal";

const Header = () => {
  const { data, isLoading, error } = useFetchUserDataQuery();
  const dispatch = useDispatch();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(authApi.util.resetApiState()); // Reset authApi state
      toast.success("Logged out successfully");
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || "Logout failed");
      console.error("Logout error:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>Error: {error?.data?.message || "Failed to fetch user data"}</div>
    );
  if (!data?.success || !data?.user) return null;

  // Only render for admins
  if (!data.user.isAdmin) return null;

  return (
    <>
      <nav className="bg-white shadow-md h-16 fixed right-0 top-0 lg:left-64 left-0 z-30">
        <div className="h-full px-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800"></h2>
          <div className="flex items-center gap-2 relative">
            <span className="text-gray-600">
              {data?.user?.displayName || "Admin"}
            </span>
            <div
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {data.user.profileImage ? (
                <img
                  src={data.user.profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User size={20} />
              )}
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md w-48 py-2 z-40">
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsProfileModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Settings size={16} />
                  Update Profile
                </button>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        setIsOpen={setIsProfileModalOpen}
      />
    </>
  );
};

export default Header;
