import React, { memo } from "react";
import { ChevronDown, ChevronUp, ChevronRight, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import slugify from "slugify";

const Dropdown = memo(
  ({
    title,
    items = [],
    isActive,
    onToggle,
    loading,
    subcategories,
    category,
  }) => {
    const categorySlug = category
      ? slugify(category.name, { lower: true, strict: true })
      : null;

    return (
      <div className="bg-white rounded-xl shadow-lg w-full my-4">
        <div
          className="flex justify-between items-center px-4 sm:px-6 py-6 sm:py-6 cursor-pointer"
          onClick={onToggle}
        >
          <span
            className={`text-base sm:text-lg ${
              isActive ? "text-indigo-600 font-semibold" : "text-gray-900"
            }`}
          >
            {title}
          </span>
          {isActive ? (
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
          ) : (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-black " />
          )}
        </div>

        <div
          className={`transition-all duration-300 ease-in-out origin-top ${
            isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0"
          }`}
        >
          <ul className="px-4 sm:px-6 pb-3 sm:pb-4">
            {loading ? (
              <li className="text-black py-2">Loading subcategories...</li>
            ) : items.length === 0 ? (
              <li className="text-black py-2">No subcategories found</li>
            ) : (
              items.map((item) => {
                const subCategorySlug = slugify(item.name, {
                  lower: true,
                  strict: true,
                });

                return (
                  <li key={item._id} className="group">
                    <NavLink
                      to={`/categories/${subCategorySlug}`}
                      className="flex items-center justify-between py-2 sm:py-3 text-black font-bold hover:text-indigo-600 transition-colors duration-200"
                    >
                      <span className="text-sm sm:text-base font-bold">
                        {item.name}
                      </span>
                      {subcategories?.length > 0 && (
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transform transition-transform group-hover:translate-x-1" />
                      )}
                    </NavLink>

                    {subcategories?.length > 0 && (
                      <div
                        className={`mt-2 ml-6 border-l-2 pl-4 ${
                          isActive ? "block" : "hidden"
                        }`}
                      >
                        {subcategories.map((subCategory) => {
                          const nestedSubCategorySlug = slugify(
                            subCategory.name,
                            {
                              lower: true,
                              strict: true,
                            }
                          );
                          return (
                            <NavLink
                              to={`/categories/${nestedSubCategorySlug}`}
                              key={subCategory._id}
                              className="block text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-all duration-200 ease-in-out transform hover:translate-x-1"
                            >
                              {subCategory.name} Software
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    );
  }
);

export default Dropdown;
