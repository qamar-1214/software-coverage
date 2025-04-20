import React, { useState, memo } from "react";
import Dropdown from "../common/Dropdown";
import { useSelector } from "react-redux";

const AllSoftwareCategories = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { categories, subcategories, loading, error } = useSelector(
    (state) => state.category
  );

  const handleDropdownToggle = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  // Split categories into two columns for larger screens
  const midPoint = Math.ceil(categories.length / 2);
  const leftColumn = categories.slice(0, midPoint);
  const rightColumn = categories.slice(midPoint);

  if (loading && categories.length === 0) {
    return (
      <section className="bg-gray-50 py-4 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-8 px-4">
          Browse all Software Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 animate-pulse"
            >
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 py-4 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-8 px-4">
          Browse all Software Categories
        </h2>
        <div className="text-center text-red-600 py-4 px-4">
          Error loading categories. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-4 sm:py-8 sm:px-40 font-bold">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4 sm:mb-8 px-4">
        Browse all Software Categories
      </h2>
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile view - single column */}
        <div className="block lg:hidden space-y-4">
          {categories.map((category, index) => (
            <div key={category._id}>
              <Dropdown
                title={category.name}
                items={
                  subcategories[category._id]?.map((sub) => ({
                    name: sub.name,
                    slug: sub.slug || "default-slug", // Fallback for missing slug
                  })) || []
                }
                isActive={activeDropdown === index}
                onToggle={() => handleDropdownToggle(index)}
                loading={loading && activeDropdown === index}
              />
            </div>
          ))}
        </div>

        {/* Tablet and desktop view - two columns */}
        <div className="hidden lg:flex gap-6">
          <div className="flex-1 space-y-6">
            {leftColumn.map((category, index) => (
              <div key={category._id}>
                <Dropdown
                  title={category.name}
                  items={
                    subcategories[category._id]?.map((sub) => ({
                      name: sub.name,
                      slug: sub.slug || "default-slug", 
                    })) || []
                  }
                  isActive={activeDropdown === index}
                  onToggle={() => handleDropdownToggle(index)}
                  loading={loading && activeDropdown === index}
                />
              </div>
            ))}
          </div>

          <div className="flex-1 space-y-6">
            {rightColumn.map((category, index) => (
              <div key={category._id}>
                <Dropdown
                  title={category.name}
                  items={
                    subcategories[category._id]?.map((sub) => ({
                      name: sub.name,
                      slug: sub.slug || "default-slug",
                    })) || []
                  }
                  isActive={activeDropdown === index + midPoint}
                  onToggle={() => handleDropdownToggle(index + midPoint)}
                  loading={loading && activeDropdown === index + midPoint}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(AllSoftwareCategories);
