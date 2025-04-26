import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../../layout/user/UserLayout";
import Home from "../../pages/home/Home";
import AdminLayout from "../../layout/admin/AdminLayout";
import CategoryTable from "../tables/categorytable/CategoryTable";
import SubcategoryTable from "../tables/subcategorytable/SubcategoryTable";
import SoftwareTable from "../tables/softwaretable/SoftwareTable";
import AllCategories from "../../pages/all_categories/AllCategories";
import SingleCategory from "../../pages/single_category/SingleCategory";
import ComingSoon from "../../pages/coming-soon/ComingSoon";
import AssetInsider from "../../pages/softwares/AssetInsider";
import SoftwareDescriptionForm from "../forms/SoftwareDescriptionForm";
import ComparisonPage from "../../pages/comparison-page/ComparisonPage";

// Placeholder components (add real ones when available)
const Landing = () => <div>Landing Page (To be implemented)</div>;
const SingleSoftware = () => (
  <div>Single Software Page (To be implemented)</div>
);
const FreeTrial = () => <div>Free Trial Page (To be implemented)</div>;
const InsightDetails = () => (
  <div>Insight Details Page (To be implemented)</div>
);

import ProtectedRoute from "./ProtectedRoute";
import { useVerifyTokenQuery } from "../../store/api/auth/auth";
import { useEffect, useState } from "react";
import AdminLoginModal from "../modals/navbar_modal/AdminLoginModal";
import VerifyEmail from "../user_dashboard/VerifyEmail";
import UserDashboard from "../user_dashboard/UserDashboard";
import Profile from "../profile/Profile";
import EditReview from "../review/EditReview";
import WriteReview from "../review/WriteReview";
import MyReviews from "../review/MyReviews";
import Coupons from "../coupons/Coupons";

// Fixed AdminLoginWrapper
const AdminLoginWrapper = () => {
  const { data, isLoading } = useVerifyTokenQuery();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const isAuthenticated = data?.isAuthenticated && data?.user?.isAdmin;

  useEffect(() => {
    if (isLoading || isAuthenticated) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }, [isLoading, isAuthenticated]); // Only run when dependencies change

  if (isLoading || isAuthenticated) {
    return null;
  }

  return <AdminLoginModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />;
};
const router = createBrowserRouter([
  // ✅ Public route for Home + Layout
  {
    path: "verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ComingSoon />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "categories",
        element: <AllCategories />,
      },
      {
        path: "versus",
        element: <ComparisonPage />,
      },

      {
        path: "categories/:slug",
        element: <SingleCategory />,
      },
      {
        path: "category/:categorySlug/:subSlug",
        element: <SingleCategory />,
      },
      {
        path: "/software/:softwareName/reviews/",
        element: <AssetInsider />, // Ya SingleSoftware component
      },
      // Routes for search results
      {
        path: "software/:id",
        element: <ComingSoon />, // Replace with SingleSoftware when available
      },
      {
        path: "free-trial/:id",
        element: <ComingSoon />, // Replace with FreeTrial when available
      },
      {
        path: "insight/:id",
        element: <ComingSoon />, // Replace with InsightDetails when available
      },
    ],
  },

  // ✅ Protected user  routes
  {
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/user-dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit-review/:id",
        element: <EditReview />,
      },
      {
        path: "/write-review",
        element: <WriteReview />,
      },
      {
        path: "/my-reviews",
        element: <MyReviews />,
      },
      {
        path: "/coupons",
        element: <Coupons />,
      },
    ],
  },

  // Admin routes with login modal
  {
    path: "admin",
    element: (
      <>
        <AdminLoginWrapper />
        <ProtectedRoute allowedRoles={["admin"]} />
      </>
    ),
    errorElement: <ComingSoon />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            path: "categories",
            element: <CategoryTable />,
          },
          {
            path: "sub-categories",
            element: <SubcategoryTable />,
          },
          {
            path: "software",
            element: <SoftwareTable />,
          },
          {
            path: "software-description",
            element: <SoftwareDescriptionForm />,
          },
        ],
      },
    ],
  },
]);
// Wrapper to handle modal state

export default router;
