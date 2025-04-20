import React, { useState, useCallback, useEffect } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { debounce } from "lodash";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../url";
import { ChevronDown } from "lucide-react";
import { initialData } from "../../../../text/reuseableText/Reuseabletext";
import { fetchStaticData } from "../../../../api/common_api/common_api";
import slugify from "slugify";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [staticData, setStaticData] = useState();
  const [searchResults, setSearchResults] = useState({
    subcategories: [],
    softwares: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery.length < 2) {
        setSearchResults({ subcategories: [], softwares: [] });
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}api/v1/search/banner-search`,
          {
            params: { query: searchQuery },
            maxRedirects: 5,
          }
        );

        if (response.data.success) {
          setSearchResults(response.data.data);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults({ subcategories: [], softwares: [] });
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const fetchingStaticData = async () => {
    try {
      const result = await fetchStaticData();
      setStaticData(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  // Handle input change
  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    debouncedSearch(searchQuery);
    setIsDropdownVisible(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    fetchingStaticData();
    const handleClickOutside = (event) => {
      const searchContainer = document.getElementById("search-container");
      if (searchContainer && !searchContainer.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="search-container" className="relative w-full xl:w-64">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search ..."
          className="w-full xl:w-64 px-[24px] py-1 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500 text-lg"
          aria-label="Search"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownVisible(true)}
        />
        <Link
          to={query}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <AiOutlineSearch className="h-5 w-5 text-black" />
        </Link>
      </div>

      {isDropdownVisible && (
        <div className="absolute top-full left-0 w-full mt-2 bg-transparent shadow-lg  rounded-lg z-50  max-h-[400px]  overflow-y-auto">
          {query.length < 2 ? (
            // Show initial data when no search query
            <>
              {/* Popular Categories */}
              <div className="p-[24px] shadow-2xl rounded-lg bg-white mb-4    border-gray-200">
                <div className="flex justify-between">
                  <p className="text-[18.6782px] text-teal-600 font-semibold px-2 mb-2">
                    Categories
                  </p>
                  <ChevronDown className="text-teal-600 w-7 h-7" />
                </div>
                {staticData.subcategories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/subcategories/${category._id}`}
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md text-[18.6782px] text-gray-700"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {/*  Software Reviews */}
              <div className="p-[24px] shadow-lg rounded-lg bg-white mb-4 border border-gray-200">
                <div className="flex justify-between">
                  <p className="text-[18.6782px] font-semibold text-teal-600 px-2 mb-2">
                    Popular Software
                  </p>
                  <ChevronDown className="text-teal-600 w-7 h-7" />
                </div>
                {staticData.softwares.map((software) => (
                  <Link
                    key={software._id}
                    to={`/softwares/${software.name}`}
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md text-[18.6782px] text-gray-700"
                  >
                    {software.name}
                  </Link>
                ))}
              </div>

              {/* Free Trials */}
              <div className="p-[24px] shadow-lg rounded-lg bg-white mb-4 border border-gray-200">
                <div className="flex justify-between">
                  <p className="text-[18.6782px] font-semibold text-teal-600 px-2 mb-2">
                    Free Trials
                  </p>
                  <ChevronDown className="text-teal-600 w-7 h-7" />
                </div>
                {initialData.freeTrials.map((trial) => (
                  <Link
                    key={trial._id}
                    to={`/freetrial/${trial.name}`}
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md text-[18.6782px] text-gray-700"
                  >
                    {trial.name}
                  </Link>
                ))}
              </div>
              {/* Press Releases */}
              <div className="p-[24px] shadow-lg rounded-lg bg-white mb-4 border border-gray-200">
                <div className="flex justify-between">
                  <p className="text-[18.6782px] font-semibold text-teal-600 px-2 mb-2">
                    Press Releases
                  </p>
                  <ChevronDown className="text-teal-600 w-7 h-7" />
                </div>
                {initialData.pressRelases.map((press) => (
                  <Link
                    key={press._id}
                    to={`/freetrial/${press.name}`}
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md text-[18.6782px] text-gray-700"
                  >
                    {press.name}
                  </Link>
                ))}
              </div>
              {/* News */}
              <div className="p-[24px] shadow-lg rounded-lg bg-white mb-4 border border-gray-200">
                <div className="flex justify-between">
                  <p className="text-[18.6782px] font-semibold text-teal-600 px-2 mb-2">
                    News
                  </p>
                  <ChevronDown className="text-teal-600 w-7 h-7" />
                </div>
                {initialData.news.map((news) => (
                  <Link
                    key={news._id}
                    to={`/news/${news.name}`}
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md text-[18.6782px] text-gray-700"
                  >
                    {news.name}
                  </Link>
                ))}
              </div>
              {/* Podcats */}
              <div className="p-[24px] shadow-lg rounded-lg bg-white mb-4 border border-gray-200">
                <div className="flex justify-between">
                  <p className="text-[18.6782px] font-semibold text-teal-600 px-2 mb-2">
                    Podcasts
                  </p>
                  <ChevronDown className="text-teal-600 w-7 h-7" />
                </div>
                {initialData.podcasts.map((podcast) => (
                  <Link
                    key={podcast._id}
                    to={`/podcast/${podcast.name}`}
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md text-[18.6782px] text-gray-700"
                  >
                    {podcast.name}
                  </Link>
                ))}
              </div>

              {/* Insights */}
              <div className="p-[24px] shadow-lg rounded-lg bg-white  border border-gray-200">
                <div className="flex justify-between">
                  <p className="text-[18.6782px] font-semibold text-teal-600 px-2 mb-2">
                    Insights
                  </p>
                  <ChevronDown className="text-teal-600 w-7 h-7" />
                </div>
                {initialData.insights.map((insight) => (
                  <Link
                    key={insight._id}
                    to={`/insights/${insight._id}`}
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md text-[18.6782px] text-gray-700"
                  >
                    {insight.name}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            // Show search results when there's a query
            <>
              {isLoading ? (
                <div className="p-4 text-center text-black shadow-lg bg-white">
                  Searching...
                </div>
              ) : (
                <>
                  {searchResults?.subcategories?.length > 0 ? (
                    <div className="p-6 shadow-sm rounded-lg bg-white mb-4 border border-gray-200">
                      <div className="flex justify-between">
                        <p className="text-xl text-teal-600 font-semibold mb-4">
                          Categories
                        </p>
                        <ChevronDown className="text-teal-600 w-7 h-7" />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {searchResults.subcategories.map((subCategory) => {
                          // Generate a slug for each subcategory
                          const slug = slugify(subCategory.name, {
                            lower: true,
                            strict: true,
                          });

                          return (
                            <Link
                              key={subCategory._id}
                              to={`/categories/${slug}`} // Dynamic slug used here
                              className="block px-3 py-2 hover:bg-gray-100 rounded-md text-lg text-gray-700"
                            >
                              {subCategory.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-black shadow-lg bg-white">
                      No categories found
                    </div>
                  )}

                  {searchResults?.softwares?.length > 0 && (
                    <div className="p-[24px] shadow-lg rounded-lg bg-white mb-4 border border-gray-200">
                      <div className="flex justify-between">
                        <p className="text-[18.6782px] font-semibold text-teal-600 px-2 mb-2">
                          Software Reviews
                        </p>
                        <ChevronDown className="text-teal-600 w-7 h-7" />
                      </div>
                      {searchResults.softwares.map((software) => (
                        <div className="flex  items-center space-x-4">
                          <div className="flex-shrink-0 w-8 h-8">
                            <img
                              src={software.imageUrl.url}
                              alt={software.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <Link
                            key={software._id}
                            to={`/softwares/${software._id}`}
                            className="block px-3 py-2 hover:bg-gray-100 rounded-md text-[18.6782px] text-gray-700"
                          >
                            {software.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults?.subcategories?.length === 0 &&
                    searchResults?.softwares?.length === 0 && (
                      <div className="p-4 text-center shadow-lg text-black bg-white">
                        No results found
                      </div>
                    )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
