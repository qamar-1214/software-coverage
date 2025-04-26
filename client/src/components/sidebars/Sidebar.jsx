import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  UserRound,
  LayoutDashboard,
  Scissors,
  MessageSquareMore,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  useFetchUserDataQuery,
  useLogoutMutation,
  authApi,
} from "../../store/api/auth/auth";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userData, isLoading: isUserLoading } = useFetchUserDataQuery();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const user = userData?.user;
  const emailDisplay = user?.email?.split("@")[0];

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed") === "true";
    setIsSidebarCollapsed(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  if (isUserLoading) {
    return null;
  }

  return (
    <div
      className={`bg-blue-800 text-white transition-all duration-300 shadow-lg flex flex-col fixed top-0 left-0 h-screen ${
        isSidebarCollapsed ? "w-16" : "w-72"
      } z-10`}
    >
      {!isSidebarCollapsed && (
        <div className="flex items-center justify-start py-4 border-blue-700 px-4">
          <img
            src="/SoftwareCoverage.webp"
            alt="Logo"
            className="w-52 h-auto"
            onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
          />
        </div>
      )}
      <nav className="flex-1 pt-4">
        <ul className="space-y-2">
          <li className="px-2">
            <Link
              to="/user-dashboard"
              className={`w-full flex items-center gap-3 py-3 rounded-lg transition-colors duration-200 ${
                location.pathname === "/user-dashboard"
                  ? "bg-blue-700 text-white"
                  : "text-gray-200 hover:bg-blue-700/50"
              } ${isSidebarCollapsed ? "justify-center" : "px-4"}`}
            >
              <LayoutDashboard size={20} />
              {!isSidebarCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="px-2">
            <Link
              to="/coupons"
              className={`w-full flex items-center gap-3 py-3 rounded-lg transition-colors duration-200 ${
                location.pathname === "/coupons"
                  ? "bg-blue-700 text-white"
                  : "text-gray-200 hover:bg-blue-700/50"
              } ${isSidebarCollapsed ? "justify-center" : "px-4"}`}
            >
              <Scissors size={20} />
              {!isSidebarCollapsed && <span>Coupons</span>}
            </Link>
          </li>
          {user?.isEmailVerified && (
            <li className="px-2">
              <Link
                to="/my-reviews"
                className={`w-full flex items-center gap-3 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === "/my-reviews"
                    ? "bg-blue-700 text-white"
                    : "text-gray-200 hover:bg-blue-700/50"
                } ${isSidebarCollapsed ? "justify-center" : "px-4"}`}
              >
                <MessageSquareMore size={20} />
                {!isSidebarCollapsed && <span>Reviews</span>}
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="p-4 border-t border-blue-700">
        <div
          className={`flex items-center gap-3 ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
        >
          <div
            className={`min-w-[40px] h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer ${
              isSidebarCollapsed ? "w-10" : "w-10"
            }`}
            onClick={() => navigate("/profile")}
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UserRound size={20} className="text-blue-900" />
            )}
          </div>
          {!isSidebarCollapsed && (
            <div className="flex-1">
              <p className="text-sm">
                {user?.isEmailVerified
                  ? user?.displayName || emailDisplay
                  : emailDisplay}
              </p>
            </div>
          )}
          {!isSidebarCollapsed && (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-red-400 hover:text-red-300"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`mt-3 flex items-center gap-3 py-3 rounded-lg transition-colors duration-200 text-gray-200 hover:bg-blue-700/50 ${
            isSidebarCollapsed ? "w-full justify-center" : "px-4 w-full"
          }`}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
          {!isSidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
