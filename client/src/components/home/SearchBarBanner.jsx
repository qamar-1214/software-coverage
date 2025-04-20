import React, { useState, useCallback, useEffect } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { debounce } from "lodash";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { BASE_URL } from "../../url";
import { initialData } from "../../text/reuseableText/Reuseabletext";
import { fetchStaticData } from "../../api/common_api/common_api";
import slugify from "slugify";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [staticData, setStaticData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(["All Options"]);
  const [placeholder, setPlaceholder] = useState(
    "Search your Software, Insights, News, Press, Deals, Coupons..."
  );

  const options = [
    "All Options",
    "Software",
    "Categories",
    "Insights",
    "News",
    "PR",
    "Deals",
    "Coupons",
    "Products",
  ];
  const handleItemClick = (id, type) => {
    switch (type) {
      case "software":
        return `/software/${id}`;
      case "category":
        return `/categories/${id}`; // Match the existing categories/:id route
      case "freeTrial":
        return `/free-trial/${id}`;
      case "insight":
        return `/insight/${id}`;
      default:
        return "/";
    }
  };
  const handleOptionClick = (option, event) => {
    event.stopPropagation();

    if (option === "All Options") {
      setSelectedOptions(["All Options"]);
      setPlaceholder(
        "Search your Software, Insights, News, Press, Deals, Coupons..."
      );
    } else {
      const newOptions = selectedOptions.filter(
        (item) => item !== "All Options"
      );

      if (selectedOptions.includes(option)) {
        const updatedOptions = newOptions.filter((item) => item !== option);
        if (updatedOptions.length === 0) {
          setSelectedOptions(["All Options"]);
          setPlaceholder(
            "Search your Software, Insights, News, Press, Deals, Coupons..."
          );
        } else {
          setSelectedOptions(updatedOptions);
          setPlaceholder(`Search for ${updatedOptions.join(", ")}`);
        }
      } else {
        const updatedOptions = [...newOptions, option];
        setSelectedOptions(updatedOptions);
        setPlaceholder(`Search for ${updatedOptions.join(", ")}`);
      }
    }
  };
  const getSelectedOptionsString = () => {
    if (selectedOptions.includes("All Options")) {
      return "all";
    }
    return selectedOptions.join(",").toLowerCase();
  };

  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}api/v1/search/search-by-options`,
          {
            params: {
              searchQuery,
              options: getSelectedOptionsString(),
            },
          }
        );

        if (response.data.success) {
          setSearchResults(response.data.data);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [selectedOptions]
  );

  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    debouncedSearch(searchQuery);
    setIsDropdownVisible(true);
  };
  const fetchingStaticData = async () => {
    try {
      const result = await fetchStaticData();
      setStaticData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchingStaticData();
    const handleClickOutside = (event) => {
      const searchContainer = document.getElementById("search-container");
      const filterDropdown = document.getElementById("filter-dropdown");

      if (
        searchContainer &&
        !searchContainer.contains(event.target) &&
        (!filterDropdown || !filterDropdown.contains(event.target))
      ) {
        setIsDropdownVisible(false);
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(searchResults);
  return (
    <div className="w-full max-w-4xl relative" id="search-container">
      <div className="flex items-center bg-white shadow-md rounded-lg overflow-visible">
        <div
          className="relative flex items-center rounded-l-lg color-custom-gradient text-white py-7 px-4 sm:px-6 cursor-pointer transition-all duration-200 hover:opacity-90"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span className="font-medium text-nowrap ios-text-nowrap text-clip text-sm sm:text-base mr-2">
            All Options
          </span>
          {isFilterOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>

        <div className="flex-grow relative">
          <input
            type="search"
            placeholder={placeholder}
            className="w-full rounded-lg pl-9 pr-12 py-6 text-gray-900 outline-none text-[20px]"
            value={query}
            onChange={handleInputChange}
            inputMode="search"
            aria-label="Search software"
          />
          <Link to={query}>
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* Options Dropdown */}
      <div
        id="filter-dropdown"
        className={`absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] transition-all duration-200 ease-in-out origin-top ${
          isFilterOpen
            ? "opacity-100 transform scale-y-100"
            : "opacity-0 transform scale-y-0 pointer-events-none"
        }`}
      >
        <div className="relative bg-white rounded-lg h-40 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
              onClick={(e) => handleOptionClick(option, e)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => {}}
                className="w-4 h-4 mr-3 text-blue-600 border-gray-300 rounded"
              />
              <span
                className={
                  option === "All Options" ? "text-blue-600" : "text-gray-700"
                }
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div
        className={`absolute ml-0 sm:ml-[116px] right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] max-h-[80vh] overflow-y-auto sm:w-[calc(100%-116px)] ${
          isDropdownVisible && query.length >= 2
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Searching...</div>
        ) : (
          <>
            {/* Software Section */}
            {(selectedOptions.includes("All Options") ||
              selectedOptions.includes("Software")) && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-left">
                  Software Reviews
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(searchResults?.software?.length > 0
                    ? searchResults.software
                    : staticData?.softwares
                  )?.map((software) => (
                    <Link
                      key={software._id}
                      to={`/software/${software._id}`}
                      className="flex items-center p-4 bg-white border border-gray-100 rounded-lg drop-shadow-lg hover:shadow-2xl transition-all duration-200"
                    >
                      {software.imageUrl?.url && (
                        <img
                          src={software.imageUrl.url}
                          alt={software.name}
                          className="w-12 h-12 object-contain mr-4"
                        />
                      )}
                      <span className="font-medium text-gray-800">
                        {software.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Section */}
            {(selectedOptions.includes("All Options") ||
              selectedOptions.includes("Categories")) && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-left">
                  Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(searchResults?.categories?.length > 0
                    ? searchResults.categories
                    : staticData?.subcategories
                  )?.map((category) => {
                    const slug = slugify(category.name, {
                      lower: true,
                      strict: true,
                    });

                    return (
                      <Link
                        key={category._id}
                        to={`/categories/${slug}`}
                        className="flex items-center p-4 bg-white border border-gray-100 rounded-lg drop-shadow-lg hover:shadow-2xl transition-all duration-200"
                      >
                        {category.imageUrl?.url && (
                          <img
                            src={category.imageUrl.url}
                            alt={category.name}
                            className="w-12 h-12 object-contain mr-4"
                          />
                        )}
                        <span className="font-medium text-gray-800">
                          {category.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Insights Section */}
            {(selectedOptions.includes("All Options") ||
              selectedOptions.includes("Insights")) && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-left">
                  Insights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {initialData.insights.map((insight) => (
                    <Link
                      key={insight._id}
                      to={`/insight/${insight._id}`}
                      className="flex items-center p-4 bg-white border border-gray-100 rounded-lg drop-shadow-lg hover:shadow-2xl transition-all duration-200"
                    >
                      <span className="font-medium text-gray-800">
                        {insight.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Similar pattern for other sections */}
            {/* News Section */}
            {(selectedOptions.includes("All Options") ||
              selectedOptions.includes("News")) && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-left">News</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {initialData.news.map((news) => (
                    <Link
                      key={news._id}
                      to={`/news/${news._id}`}
                      className="flex items-center p-4 bg-white border border-gray-100 rounded-lg drop-shadow-lg hover:shadow-2xl transition-all duration-200"
                    >
                      <span className="font-medium text-gray-800">
                        {news.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* PR Section */}
            {(selectedOptions.includes("All Options") ||
              selectedOptions.includes("PR")) && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-left">
                  Press Releases
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {initialData.pressRelases.map((press) => (
                    <Link
                      key={press._id}
                      to={`/press/${press._id}`}
                      className="flex items-center p-4 bg-white border border-gray-100 rounded-lg drop-shadow-lg hover:shadow-2xl transition-all duration-200"
                    >
                      <span className="font-medium text-gray-800">
                        {press.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
