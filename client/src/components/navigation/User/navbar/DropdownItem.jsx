import { memo } from "react";
import NavLink from "./NavLink";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import slugify from "slugify";

const DropdownItem = memo(
  ({ category, expandedCategory, onHover, subcategories }) => {
    const categorySlug = slugify(category.name, { lower: true, strict: true });

    return (
      <div
        className="relative group/item"
        onMouseEnter={() => onHover(category._id)}
        onMouseLeave={() => onHover(null)}
      >
        <Link
          to={`/categories/${categorySlug}`}
          className="flex items-center justify-between px-4 py-2 text-xl text-gray-700 
                    hover:bg-gray-50 hover:text-indigo-600 transition-all duration-200 ease-in-out"
        >
          <span>{category.name}</span>
          {subcategories?.length > 0 && (
            <ChevronRight
              className={`h-4 w-4 text-gray-400 
                            transition-all duration-300 ease-in-out
                            group-hover/item:text-indigo-600 
                            group-hover/item:translate-x-1
                            ${
                              expandedCategory === category._id
                                ? "rotate-90"
                                : ""
                            }`}
            />
          )}
        </Link>

        {subcategories?.length > 0 && expandedCategory === category._id && (
          <div
            className="absolute left-full top-0 w-96 bg-white border border-gray-200 
                        rounded-lg shadow-lg text-md
                        opacity-0 invisible translate-x-2
                        group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0
                        transition-all duration-300 ease-in-out"
          >
            <div className="py-2">
              {subcategories.map((subCategory) => {
                const subCategorySlug = slugify(subCategory.name, {
                  lower: true,
                  strict: true,
                });
                return (
                  <NavLink
                    to={`/categories/${subCategorySlug}`}
                    key={subCategory._id}
                    className="block text-xl px-4 py-2 text-gray-700 
                                    hover:bg-gray-50 hover:text-indigo-600
                                    transition-all duration-200 ease-in-out
                                    transform hover:translate-x-1"
                  >
                    {subCategory.name} Software
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default DropdownItem;
