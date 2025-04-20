import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useVerifyTokenQuery } from "../../store/api/auth/auth";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles = ["user", "admin"] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, refetch } = useVerifyTokenQuery();

  const isAuthenticated = data?.isAuthenticated || false;
  const user = data?.user || null;
  const userRole = user?.isAdmin ? "admin" : "user";
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    console.log("ProtectedRoute data:", {
      data,
      isAuthenticated,
      userRole,
      isAdminRoute,
    });
    if (isLoading) return;

    if (!isAuthenticated && !isAdminRoute) {
      // Only show toast for non-admin routes
      //toast.error("Please login to access this page.");
      navigate("/", { replace: true });
      return;
    }

    if (!allowedRoles.includes(userRole) && !isAdminRoute) {
      // Only show toast for non-admin routes
      toast.error("Access denied. Insufficient permissions.", {
        toastId: "unauthorized-role",
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/", { replace: true });
      return;
    }

    // For admin routes, rely on AdminLoginWrapper to show modal
    if (
      isAdminRoute &&
      (!isAuthenticated || !allowedRoles.includes(userRole))
    ) {
      return; // Skip redirect, let AdminLoginWrapper handle modal
    }
  }, [
    isLoading,
    isAuthenticated,
    userRole,
    allowedRoles,
    navigate,
    isAdminRoute,
  ]);

  useEffect(() => {
    refetch(); // Ensure fresh token check
  }, [refetch]);

  if (isLoading) {
    return null; // Wait for auth check
  }

  if (isAdminRoute && (!isAuthenticated || !allowedRoles.includes(userRole))) {
    return null; // Let AdminLoginWrapper render modal
  }

  return <Outlet />;
};

export default ProtectedRoute;
