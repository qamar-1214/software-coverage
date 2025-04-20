import React, { useEffect, useState, useCallback, memo } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import DropdownItem from "./DropdownItem";
import SearchBar from "./SearchBar";
import {
  fetchCategories,
  fetchSubcategories,
} from "../../../../store/slices/categorySlices";
import { Link } from "react-router-dom";
import SignUpModal from "../../../modals/navbar_modal/SignUpModal";
import {
  authApi,
  useFetchUserDataQuery,
  useLogoutMutation,
  useVerifyTokenQuery,
} from "../../../../store/api/auth/auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { categories, subcategories, loading, error } = useSelector(
    (state) => state.category
  );

  const { data: authData, isLoading: isVerifying } = useVerifyTokenQuery();
  const { data: userData, isLoading: isUserLoading } = useFetchUserDataQuery(
    undefined,
    {
      skip: !authData?.isAuthenticated,
    }
  );
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoftwareOpen, setSoftwareOpen] = useState(false);
  const [isSaaSOpen, setSaaSOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    setSoftwareOpen(false);
    setSaaSOpen(false);
    setExpandedCategory(null);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const categoriesResult = await dispatch(fetchCategories()).unwrap();
        const subcategoryPromises = categoriesResult.map((category) =>
          dispatch(fetchSubcategories(category._id)).unwrap()
        );
        await Promise.all(subcategoryPromises);
        setIsInitialLoadComplete(true);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    initializeData();
  }, [dispatch]);

  const handleCategoryHover = useCallback((categoryId) => {
    setExpandedCategory(categoryId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMenuOpen(false);
        setSoftwareOpen(false);
        document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Logout failed");
      console.error("Logout error:", err);
    }
  };

  if (error) {
    console.error("Navbar Error:", error);
  }

  const isAuthenticated =
    authData?.isAuthenticated && userData?.success && !userData?.user?.isAdmin;
  const user = userData?.user;

  return (
    <>
      <nav className="flex justify-between items-center h-16 w-full sticky top-0 backdrop-blur-lg bg-transparent px-2 lg:px-6 2xl:px-12 z-[100]">
        <div className="hidden xl:flex items-center space-x-3">
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img
                src="/SoftwareCoverage.png"
                alt="SoftwareCoverage"
                className="w-52 h-auto"
                loading="lazy"
              />
            </NavLink>
          </div>
          <div className="relative group pr-2">
            <button
              onClick={() => setSoftwareOpen(!isSoftwareOpen)}
              className="navbarBtn group-hover:text-indigo-600 transition-colors duration-200"
              aria-expanded={isSoftwareOpen}
            >
              <span className="text-[18.8124px]">Software Categories</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                  isSoftwareOpen ? "rotate-180" : "group-hover:rotate-180"
                }`}
              />
            </button>
            <div
              className="absolute left-0 w-72 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg
                opacity-0 invisible transform translate-y-2
                group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible
                transition-all duration-300 ease-in-out z-50"
            >
              {loading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">
                  Error loading categories
                </div>
              ) : (
                <div className="py-2">
                  {categories.map((category) => (
                    <DropdownItem
                      key={category._id}
                      category={category}
                      expandedCategory={expandedCategory}
                      onHover={handleCategoryHover}
                      subcategories={subcategories[category._id]}
                    />
                  ))}
                  <Link
                    className="block text-xl px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200"
                    to="categories"
                  >
                    All Categories
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="relative group">
            <button
              onClick={() => setSaaSOpen(!isSaaSOpen)}
              className="navbarBtn group-hover:text-indigo-600 transition-colors duration-200"
              aria-expanded={isSaaSOpen}
            >
              <span className="text-[18.8124px]">SaaSplorer</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                  isSaaSOpen ? "rotate-180" : "group-hover:rotate-180"
                }`}
              />
            </button>
            <div
              className="absolute left-0 w-64 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg
                opacity-0 invisible transform translate-y-2
                group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible
                transition-all duration-300 ease-in-out z-50 text-xl"
            >
              <div className="py-2">
                <Link
                  to="/saas/accounting"
                  className="dropdownText transition-colors duration-200"
                >
                  Insights
                </Link>
                <Link
                  to="/saas/fintech"
                  className="dropdownText transition-colors duration-200"
                >
                  SaaS News
                </Link>
                <Link
                  to="/saas/tax"
                  className="dropdownText transition-colors duration-200"
                >
                  Podcasts
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:flex items-center gap-6">
          <SearchBar />
          <div
            className="lg:h-7 lg:w-[0.5px] lg:bg-gray-600"
            aria-hidden="true"
          />
          {!isAuthenticated && (
            <NavLink href="/get-listed" className="px-4 py-2.5 navbarBtnIndigo">
              Get Listed
            </NavLink>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-5">
              <button
                onClick={() => navigate("/user-dashboard")}
                className="bg-blue-800 font-bold text-md text-white rounded px-8 py-2.5 hover:bg-blue-700 transition-colors"
              >
                My Account
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="border border-red-500 text-red-500 bg-transparent rounded px-8 py-2.5 hover:bg-red-50 font-bold text-md transition-colors"
              >
                {isLoggingOut ? "Logging Out..." : "Logout"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSignUpModalOpen(true)}
              className="navbarBtnEndWithGradient px-4 py-2"
            >
              Sign Up/Sign In
            </button>
          )}
        </div>
        <div className="xl:hidden w-full">
          <div className="flex justify-between">
            <NavLink href="/">
              <img
                src="/SoftwareCoverage.png"
                alt="SoftwareCoverage"
                className="w-52 h-auto"
                loading="lazy"
              />
            </NavLink>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <div className="flex flex-col justify-center items-center">
                  <X className="h-6 w-6" />
                  <p>Close</p>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <Menu className="h-6 w-6" />
                  <p>Menu</p>
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 top-16 z-40 bg-transparent backdrop-blur-lg xl:hidden" />
          <div className="fixed inset-0 top-16 z-50 xl:hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 pt-4 pb-32">
                <div className="mb-6">
                  <div className="p-4">
                    <div className="space-y-4">
                      <button
                        onClick={() => setSoftwareOpen(!isSoftwareOpen)}
                        className="w-full flex items-center justify-between text-xl font-medium text-gray-900"
                      >
                        Software Categories
                        <ChevronDown
                          className={`h-5 w-5 transform transition-transform ${
                            isSoftwareOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isSoftwareOpen && (
                        <div className="space-y-3 pt-2 bg-white rounded-lg shadow-lg border border-gray-100">
                          {categories.map((category) => (
                            <div key={category._id}>
                              <button
                                onClick={() =>
                                  setExpandedCategory(
                                    expandedCategory === category._id
                                      ? null
                                      : category._id
                                  )
                                }
                                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                {category.name}
                                <ChevronDown
                                  className={`h-4 w-4 transform transition-transform ${
                                    expandedCategory === category._id
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </button>
                              {expandedCategory === category._id && (
                                <div className="pl-4 space-y-2 mt-2">
                                  {subcategories[category._id]?.map(
                                    (subCategory) => (
                                      <Link
                                        key={subCategory._id}
                                        to={`/category/${category.slug}/${subCategory.slug}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                      >
                                        {subCategory.name}
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                          <Link
                            className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            to="categories"
                          >
                            All Categories
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="p-4">
                    <div className="space-y-4">
                      <button
                        onClick={() => setSaaSOpen(!isSaaSOpen)}
                        className="w-full flex items-center justify-between text-xl font-medium text-gray-900"
                      >
                        SaaSplorer
                        <ChevronDown
                          className={`inline-block ml-2 h-5 w-5 transform transition-transform ${
                            isSaaSOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isSaaSOpen && (
                        <div className="bg-white rounded-lg shadow-lg border border-gray-100">
                          <Link
                            to="/saas/accounting"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            Insights
                          </Link>
                          <Link
                            to="/saas/fintech"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            SaaS News
                          </Link>
                          <Link
                            to="/saas/tax"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            Podcasts
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 space-y-4">
              <div className="flex justify-center gap-2">
                {!isAuthenticated && (
                  <NavLink
                    href="/get-listed"
                    className="px-4 py-2.5 navbarBtnIndigo"
                  >
                    Get Listed
                  </NavLink>
                )}

                {isAuthenticated ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("/user-dashboard")}
                      className="bg-blue-700 text-white rounded-lg px-4 py-2 hover:bg-blue-800 transition-colors"
                    >
                      My Account
                    </button>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="border border-red-500 text-red-500 bg-transparent rounded-lg px-4 py-2 hover:bg-red-50 transition-colors"
                    >
                      {isLoggingOut ? "Logging Out..." : "Logout"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSignUpModalOpen(true)}
                    className="px-4 py-2.5 navbarBtnEndWithGradient"
                  >
                    Sign Up/Sign In
                  </button>
                )}
              </div>
              <SearchBar />
            </div>
          </div>
        </>
      )}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        setIsOpen={setIsSignUpModalOpen}
      />
    </>
  );
};

export default memo(Navbar);
