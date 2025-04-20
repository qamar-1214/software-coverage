import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { FilterIcon, Search, RotateCcwIcon, ArrowUpDown } from "lucide-react";
import SoftwareCard from "./SoftwareCard";
import { BASE_URL } from "../../url";
import { ShimmerGrid } from "./Shimmer";
import { AiOutlineSearch } from "react-icons/ai";
import AnimatedSortDropdown from "./AnimatedSortDropdown";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  // Fetch categories from API with pagination
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}api/v1/sub-category/get-all-subcategories`,
          {
            params: {
              page: currentPage,
            },
          }
        );

        const { subCategories, pagination } = response.data.data;
        setCategories(subCategories);
        setTotalPages(pagination.totalPages);
        scrollToTop();
      } catch (err) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [currentPage]); // Fetch when page changes

  // Client-side filtering and sorting
  const getFilteredAndSortedData = () => {
    let result = [...categories];

    if (searchQuery) {
      result = result.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === "A-Z") {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "Z-A") {
      result = result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  };

  const filteredData = getFilteredAndSortedData();

  const handleReset = () => {
    setSearchQuery("");
    setSortOrder("A-Z");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="lg:px-16 xl:px-25">
        <ShimmerGrid />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 text-lg font-medium mt-6">
        {error}
      </p>
    );
  }

  return (
    <div className="lg:px-16 xl:px-25">
      {/* Filter Bar */}
      <div className="hidden md:flex flex-col md:flex-row justify-between items-center mb-6 ">
        <div className="flex items-center gap-2 text-black">
          <FilterIcon className="h-4 w-4" />
          <p className="text-md font-normal">
            Filter Categories | Updated on 22nd Dec ,'24
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AnimatedSortDropdown
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
      </div>

      {/* Search and Reset */}
      <div className="flex flex-col items-center sm:items-start gap-4 mb-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Filter by Keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1 pl-10 rounded-lg drop-shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
          />
          <span className="absolute left-3 top-1 text-gray-400">
            <AiOutlineSearch className="text-black" />
          </span>
        </div>

        <div className="flex w-full justify-start">
          <button
            onClick={handleReset}
            className="flex items-center shadow-lg gap-2 px-4 py-1 text-black border rounded-lg transition hover:shadow-md bg-white hover:bg-gray-50 active:shadow-sm"
          >
            <span>Reset All</span>
            <RotateCcwIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex w-full justify-center md:hidden">
          <button
            onClick={handleReset}
            className="flex items-center shadow-lg gap-2 px-4 py-1 text-black border rounded-lg transition hover:shadow-md bg-white hover:bg-gray-50 active:shadow-sm"
          >
            <span>Open Filter & Sort</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((subCategory) => (
            <SoftwareCard
              key={subCategory._id}
			  slug={subCategory.slug}
              name={subCategory.name}
              image={subCategory?.imageUrl?.url}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No categories found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CategoryGrid;
