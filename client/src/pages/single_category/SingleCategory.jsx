// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../../url";
// import slugify from "slugify";
// import { Filter, ArrowDownUp, RefreshCw, X, Search } from "lucide-react";
// import Dropdown from "../../constant/Dropdown";

// const SingleCategory = () => {
//   const { slug } = useParams();
//   const [category, setCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [selectedRadio, setSelectedRadio] = useState(null);
//   const [isActive, setIsActive] = useState(false);
//   const [filteredSoftwares, setFilteredSoftwares] = useState([]);

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${BASE_URL}api/v1/sub-category/get-sub-category-admin`
//         );
//         const categories = response.data.data.subCategories;

//         const matchedCategory = categories.find(
//           (category) =>
//             slugify(category.name, { lower: true, strict: true }) === slug
//         );

//         if (!matchedCategory) {
//           setError("Category not found.");
//         } else {
//           setCategory(matchedCategory);
//         }
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//         setError("Failed to fetch category details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategory();
//   }, [slug]);

//   const toggleDropdown = (dropdown) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//   };

//   const handleSelectOption = (option) => {
//     if (selectedFilters.includes(option)) {
//       setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
//     } else {
//       setSelectedFilters([...selectedFilters, option]);
//     }
//   };

//   const handleResetFilters = () => {
//     setSelectedFilters([]);
//     setSearchText("");
//     setSelectedRadio(null);
//     setIsActive(false);
//   };

//   const handleRemoveFilter = (option) => {
//     setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
//   };

//   const clearSearch = () => {
//     setSearchText("");
//   };

//   const handleRadioSelect = (option) => {
//     setSelectedRadio(option);
//   };

//   const toggleSwitch = () => {
//     setIsActive(!isActive);
//   };

//   const sortByOptions = ["A to Z", "Z to A"];

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   const filteredData = category?.softwares?.filter((software) => {
//     if (selectedFilters.length > 0) {
//       return selectedFilters.every((filter) => {
//         if (software.features && software.features.includes(filter)) {
//           return true;
//         }
//         if (software.deployment && software.deployment.includes(filter)) {
//           return true;
//         }
//         if (software.pricingoption && software.pricingoption.includes(filter)) {
//           return true;
//         }
//         if (software.bestfor && software.bestfor.includes(filter)) {
//           return true;
//         }
//         return false;
//       });
//     }

//     return software.name.toLowerCase().includes(searchText.toLowerCase());
//   });

//   const sortedData = filteredData.sort((a, b) => {
//     if (selectedRadio === "A to Z") {
//       return a.name.localeCompare(b.name);
//     } else if (selectedRadio === "Z to A") {
//       return b.name.localeCompare(a.name);
//     }
//     return 0;
//   });

//   return (
//     <>
//       <div className="bg-gray-100 pb-20">
//         <div className="flex flex-col items-center bg-gray-100 px-4 md:px-8">
//           {category ? (
//             <div className="pt-12 max-w-4xl w-full">
//               <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-start">
//                 Best {category.name}
//               </h1>
//               <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 pt-4 text-center md:text-start">
//                 What is an {category.name} ?
//               </h2>
//               <p className="text-gray-600 text-base md:text-lg">
//                 {category.description || (
//                   <>
//                     {category.name} software is a specialized tool designed to
//                     help {category.name.toLowerCase()} firms streamline their
//                     operations, improve client communication, and manage tasks
//                     more efficiently.
//                   </>
//                 )}
//                 {isExpanded && (
//                   <span>
//                     <br />
//                     By automating repetitive processes, this software helps
//                     reduce administrative burdens, allowing professionals to
//                     focus more on providing services to their clients.
//                   </span>
//                 )}
//               </p>
//               <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="mt-4 text-[#20D3B4] font-semibold hover:text-blue-700 focus:outline-none"
//               >
//                 {isExpanded ? "Read less ⬆" : "Read more ⬇"}
//               </button>
//             </div>
//           ) : (
//             <div className="pt-12 max-w-4xl w-full">
//               <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-start">
//                 Loading Category...
//               </h1>
//               <p className="text-gray-600 text-base md:text-lg">
//                 Please wait while we fetch the category details.
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col items-center px-4 md:px-8 py-6">
//           <div className="w-full max-w-4xl">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-start">
//               Compare {category.name} Software
//             </h1>
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl p-4 rounded-md shadow-md bg-white">
//             <div className="flex items-center space-x-2 text-gray-700">
//               <Filter size={20} className="text-gray-500" />
//               <span className="text-sm font-medium">
//                 Filter Software Rankings
//               </span>
//               <span className="text-sm">|</span>
//               <span className="text-sm text-gray-500">
//                 Updated on Dec 30th, '24
//               </span>
//             </div>

//             <div className="relative mt-4 md:mt-0">
//               <span className="text-sm font-medium flex gap-1 items-center">
//                 <ArrowDownUp size={18} /> Sort By
//                 <Dropdown
//                   label="Radio Options"
//                   options={sortByOptions}
//                   type="radio"
//                   isOpen={activeDropdown === "radio"}
//                   toggleDropdown={() => toggleDropdown("radio")}
//                   onSelect={handleRadioSelect}
//                   selectedFilters={selectedRadio}
//                 />
//               </span>
//             </div>
//           </div>

//           <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl mt-4">
//             <div className="flex flex-wrap items-center gap-4">
//               <div
//                 onClick={toggleSwitch}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer text-sm font-medium bg-gray-100 text-gray-800`}
//               >
//                 <div
//                   className={`w-8 h-4 rounded-full flex items-center cursor-pointer p-1 transition-all duration-300 ${
//                     isActive
//                       ? "bg-[#20D3B4] justify-end"
//                       : "bg-gray-300 justify-start"
//                   }`}
//                 >
//                   <div className="w-3 h-3 rounded-full bg-white shadow"></div>
//                 </div>
//                 <span className="text-md py-[2px]">Has Deals</span>
//               </div>

//               <Dropdown
//                 label="Features"
//                 options={[
//                   "Access Controls/Permissions",
//                   "Accounting",
//                   "Approval Process Control",
//                   "API",
//                   "Billing & Invoicing",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "features"}
//                 toggleDropdown={() => toggleDropdown("features")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Pricing Options"
//                 options={[
//                   "Subscription",
//                   "Lifetime License",
//                   "Free Trial",
//                   "Free Version",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "pricing"}
//                 toggleDropdown={() => toggleDropdown("pricing")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Deployment"
//                 options={[
//                   "Cloud, SaaS, Web-Based",
//                   "Mobile - Android",
//                   "Mobile - iPhone",
//                   "Mobile - iPad",
//                   "Desktop - Mac",
//                   "Desktop - Windows",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "deployment"}
//                 toggleDropdown={() => toggleDropdown("deployment")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Best For"
//                 options={[
//                   "StartUps",
//                   "Freelancers",
//                   "Small Business",
//                   "Medium Business",
//                   "Large Enterprise",
//                   "Non-profit Organization",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "bestFor"}
//                 toggleDropdown={() => toggleDropdown("bestFor")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 w-full md:w-64 max-w-md">
//                 <Search
//                   size={18}
//                   className="text-gray-500 mr-3"
//                   aria-hidden="true"
//                 />
//                 <input
//                   type="text"
//                   value={searchText}
//                   onChange={(e) => setSearchText(e.target.value)}
//                   className="flex-grow outline-none text-sm text-gray-800 bg-gray-100 placeholder-gray-500"
//                   placeholder="Search..."
//                   aria-label="Search"
//                 />
//                 {searchText && (
//                   <button
//                     type="button"
//                     onClick={clearSearch}
//                     className="ml-2 text-gray-500 hover:text-gray-700"
//                     aria-label="Clear search"
//                   >
//                     <X size={18} />
//                   </button>
//                 )}
//               </div>

//               <button
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gray-100 text-gray-800 border-gray-300 w-full md:w-auto"
//                 onClick={handleResetFilters}
//               >
//                 <RefreshCw size={18} className="text-gray-500" />
//                 <span className="text-sm font-medium">Reset All</span>
//               </button>

//               <div className="overflow-y-auto max-h-32 flex flex-wrap gap-2">
//                 {selectedFilters.map((filter, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-2 px-3 py-1 rounded-full border bg-gray-100 text-gray-800 border-gray-300"
//                   >
//                     <span className="text-sm">{filter}</span>
//                     <X
//                       size={16}
//                       className="cursor-pointer"
//                       onClick={() => handleRemoveFilter(filter)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col space-y-8 my-6">
//           {sortByOptions && filteredData.length > 0 ? (
//             sortedData &&
//             filteredData.map((software, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-xl rounded-lg p-7 w-full max-w-4xl mx-auto"
//               >
//                 <div className="flex flex-col sm:flex-row items-start">
//                   <div className="flex items-center justify-center bg-white shadow-md rounded-xl w-36 h-36 mx-auto sm:mx-0">
//                     <img
//                       src={software.imageUrl?.url || "/noimage.png"}
//                       alt={software.name}
//                       className="w-28 h-28"
//                     />
//                   </div>

//                   <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-left">
//                     <h2 className="text-2xl font-semibold text-[#20D3B4] pt-1">
//                       {software.name}
//                     </h2>
//                     <div className="flex flex-col sm:flex-row sm:gap-12 mt-2">
//                       <span className="text-gray-600 text-sm">
//                         Tekpon Score
//                       </span>
//                       <span className="text-gray-600 text-sm">
//                         {software.score}
//                       </span>
//                     </div>
//                     <div className="flex items-center mt-2 space-x-3">
//                       <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full">
//                         <div
//                           className="absolute h-full rounded-full"
//                           style={{
//                             width: `${(software.score / 10) * 100}%`,
//                             background:
//                               "linear-gradient(to right, #FFA500, #FF4500)",
//                           }}
//                         ></div>
//                         <div
//                           className="absolute bg-red-500 rounded-full shadow-md"
//                           style={{
//                             width: "10px",
//                             height: "10px",
//                             top: "-4px",
//                             left: `${(software.score / 10) * 100}%`,
//                             transform: "translateX(-50%)",
//                           }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                   <a
//                     href={software.visitUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-4 sm:mt-0 sm:ml-8 bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md px-8 py-2 w-full sm:w-auto text-center"
//                   >
//                     Visit Profile
//                   </a>
//                 </div>

//                 <div className="mt-6 mb-4 text-left">
//                   <p className="text-gray-600 text-lg">
//                     {software.description}&nbsp;
//                     <a
//                       href={software.visitUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#20D3B4] hover:text-blue-700 font-medium text-lg"
//                     >
//                       Learn more about {software.name}
//                     </a>
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2 mt-4 text-left">
//                   <input
//                     type="checkbox"
//                     id={`compare-${index}`}
//                     className="w-5 h-5 border-2 border-[#20D3B4] rounded-sm appearance-none ring-2 checked:bg-[#20D3B4] focus:ring-2 focus:ring-[#20D3B4] focus:outline-none checked:before:content-['✔'] checked:before:text-white checked:before:text-center checked:before:block checked:before:leading-5"
//                   />
//                   <label
//                     htmlFor={`compare-${index}`}
//                     className="text-[#20D3B4] font-medium text-md cursor-pointer"
//                   >
//                     COMPARE
//                   </label>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600">No software available</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleCategory;

// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../../url";
// import slugify from "slugify";
// import {
//   Filter,
//   ArrowDownUp,
//   RefreshCw,
//   X,
//   Search,
//   Info,
//   ChevronDown,
//   ChevronUp,
//   List,
// } from "lucide-react";
// import Dropdown from "../../constant/Dropdown";
// import Profile from "../../assets/Profile.jpg";
// import { FaFacebook, FaTumblr, FaLinkedin, FaXTwitter } from "react-icons/fa6";
// import InsightsCard from "../../components/cards/InsightsCard";

// const tableOfContents = [
//   {
//     id: 1,
//     question: "Who can use accounting software?",
//     answer:
//       "Accountants, controllers, chief financial officers (CFOs), and other accounting department members use online accounting software to perform their tasks. The accounting department can range from a single person to many employees handling financial operations like accounts payable, accounts receivable, cash management, or expenses.",
//   },
//   {
//     id: 2,
//     question: "The benefits of using accounting programs",
//     answer:
//       "Using an accounting program for your business or personal finance brings multiple benefits, including efficiency, automation, and better financial management.",
//   },
//   {
//     id: 3,
//     question: "Key features for accounting software",
//     answer:
//       "Key features include expense tracking, invoicing, tax calculation, financial reporting, and multi-user access.",
//   },
//   {
//     id: 4,
//     question: "Costs range for accounting software",
//     answer:
//       "Accounting software costs vary from free versions to premium subscriptions that can cost hundreds per month.",
//   },
//   {
//     id: 5,
//     question: "What is the best accounting software?",
//     answer:
//       "The best accounting software depends on your needs. Some popular options include QuickBooks, Xero, and FreshBooks.",
//   },
//   {
//     id: 6,
//     question: "Why do businesses need accounting software?",
//     answer:
//       "Businesses need accounting software to streamline financial management, ensure accuracy, and save time on bookkeeping.",
//   },
//   {
//     id: 7,
//     question: "Best accounting software programs",
//     answer:
//       "The best programs include QuickBooks, Zoho Books, Sage, and FreshBooks.",
//   },
// ];

// const authors = [
//   {
//     id: 1,
//     name: "Cristian Dina",
//     role: "Co-Founder & Managing Partner @ Tekpon",
//     designation: "Managing Partner & SaaS Podcast Host @ Tekpon",
//     description:
//       "As one of the founding members of Tekpon, Cristian has worn many hats within the company, but perhaps none shines brighter than his role as the charismatic host of the Tekpon SaaS Podcast. Cristian is a community builder at heart, being the Bucharest city leader for SaaStock Local and the author of the best-selling book King of Networking.",
//     image: Profile, // Replace with actual image
//     type: "Writer",
//     socialLinks: [FaTumblr, FaLinkedin, FaFacebook, FaXTwitter],
//   },
//   {
//     id: 2,
//     name: "Alina Maria Stan",
//     role: "COO & Co-Founder @ Tekpon",
//     designation: "Lead Generation Master & Affiliation Strategist",
//     description:
//       "Alina Maria Stan is the COO and Co-Founder of Tekpon, where she has utilized her expertise in SaaS, software promotion, and lead generation since July 2020. Her role involves media buying and extensive software branding, contributing significantly to Tekpon's market presence.",
//     image: Profile, // Replace with actual image
//     type: "Expert",
//     socialLinks: [FaTumblr, FaLinkedin],
//   },
// ];

// const SingleCategory = () => {
//   const { slug } = useParams();
//   const [category, setCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [selectedRadio, setSelectedRadio] = useState(null);
//   const [isActive, setIsActive] = useState(false);
//   const [filteredSoftwares, setFilteredSoftwares] = useState([]);
//   const [isTOCOpen, setIsTOCOpen] = useState(false); // Table of Contents closed by default
//   const questionRefs = useRef({}); // Store references to each question section

//   // Function to smoothly scroll to the selected question without shifting it to the top
//   const scrollToQuestion = (id) => {
//     if (questionRefs.current[id]) {
//       questionRefs.current[id].scrollIntoView({
//         behavior: "smooth",
//         block: "nearest", // Ensures scrolling without shifting content to top
//         inline: "nearest",
//       });
//     }
//   };

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${BASE_URL}api/v1/sub-category/get-sub-category-admin`
//         );
//         const categories = response.data.data.subCategories;

//         const matchedCategory = categories.find(
//           (category) =>
//             slugify(category.name, { lower: true, strict: true }) === slug
//         );

//         if (!matchedCategory) {
//           setError("Category not found.");
//         } else {
//           setCategory(matchedCategory);
//         }
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//         setError("Failed to fetch category details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategory();
//   }, [slug]);

//   const options = {
//     timeZone: "Asia/Karachi",
//     month: "short",
//     day: "numeric",
//     year: "2-digit",
//   };

//   const pakistanTime = new Date().toLocaleDateString("en-US", options);

//   const toggleDropdown = (dropdown) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//   };

//   const handleSelectOption = (option) => {
//     if (selectedFilters.includes(option)) {
//       setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
//     } else {
//       setSelectedFilters([...selectedFilters, option]);
//     }
//   };

//   const handleResetFilters = () => {
//     setSelectedFilters([]);
//     setSearchText("");
//     setSelectedRadio(null);
//     setIsActive(false);
//   };

//   const handleRemoveFilter = (option) => {
//     setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
//   };

//   const clearSearch = () => {
//     setSearchText("");
//   };

//   const handleRadioSelect = (option) => {
//     setSelectedRadio(option);
//   };

//   const toggleSwitch = () => {
//     setIsActive(!isActive);
//   };

//   const sortByOptions = ["A to Z", "Z to A"];

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   const filteredData = category?.softwares?.filter((software) => {
//     if (selectedFilters.length > 0) {
//       return selectedFilters.every((filter) => {
//         if (software.features && software.features.includes(filter)) {
//           return true;
//         }
//         if (software.deployment && software.deployment.includes(filter)) {
//           return true;
//         }
//         if (software.pricingoption && software.pricingoption.includes(filter)) {
//           return true;
//         }
//         if (software.bestfor && software.bestfor.includes(filter)) {
//           return true;
//         }
//         return false;
//       });
//     }

//     return software.name.toLowerCase().includes(searchText.toLowerCase());
//   });

//   const sortedData = filteredData.sort((a, b) => {
//     if (selectedRadio === "A to Z") {
//       return a.name.localeCompare(b.name);
//     } else if (selectedRadio === "Z to A") {
//       return b.name.localeCompare(a.name);
//     }
//     return 0;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const paginatedData = sortedData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <>
//       <div className="bg-gray-100 pb-20">
//         <div className="flex flex-col items-center bg-gray-100 px-4 md:px-8">
//           {category ? (
//             <div className="pt-12 max-w-4xl w-full">
//               <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-start">
//                 Best {category.name}
//               </h1>
//               <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 pt-4 text-center md:text-start">
//                 What is an {category.name} ?
//               </h2>
//               <p className="text-gray-600 text-base md:text-lg">
//                 {category.description || (
//                   <>
//                     {category.name} software is a specialized tool designed to
//                     help {category.name.toLowerCase()} firms streamline their
//                     operations, improve client communication, and manage tasks
//                     more efficiently.
//                   </>
//                 )}
//                 {isExpanded && (
//                   <span>
//                     <br />
//                     By automating repetitive processes, this software helps
//                     reduce administrative burdens, allowing professionals to
//                     focus more on providing services to their clients.
//                   </span>
//                 )}
//               </p>
//               <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="mt-4 text-[#20D3B4] font-semibold hover:text-blue-700 focus:outline-none"
//               >
//                 {isExpanded ? "Read less ⬆" : "Read more ⬇"}
//               </button>
//             </div>
//           ) : (
//             <div className="pt-12 max-w-4xl w-full">
//               <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-start">
//                 Loading Category...
//               </h1>
//               <p className="text-gray-600 text-base md:text-lg">
//                 Please wait while we fetch the category details.
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col items-center px-4 md:px-8 py-6">
//           <div className="w-full max-w-4xl">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-start">
//               Compare {category.name} Software
//             </h1>
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl p-4 rounded-md shadow-md bg-white">
//             <div className="flex items-center space-x-2 text-gray-700">
//               <Filter size={20} className="text-gray-500" />
//               <span className="text-sm font-medium">
//                 Filter Software Rankings
//               </span>
//               <span className="text-sm">|</span>
//               <span className="text-sm text-gray-500">
//                 Updated on {pakistanTime}
//               </span>
//             </div>

//             <div className="relative mt-4 md:mt-0">
//               <span className="text-sm font-medium flex gap-1 items-center">
//                 <ArrowDownUp size={18} /> Sort By
//                 <Dropdown
//                   label="Radio Options"
//                   options={sortByOptions}
//                   type="radio"
//                   isOpen={activeDropdown === "radio"}
//                   toggleDropdown={() => toggleDropdown("radio")}
//                   onSelect={handleRadioSelect}
//                   selectedFilters={selectedRadio}
//                 />
//               </span>
//             </div>
//           </div>

//           <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl mt-4">
//             <div className="flex flex-wrap items-center gap-4">
//               <div
//                 onClick={toggleSwitch}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer text-sm font-medium bg-gray-100 text-gray-800`}
//               >
//                 <div
//                   className={`w-8 h-4 rounded-full flex items-center cursor-pointer p-1 transition-all duration-300 ${
//                     isActive
//                       ? "bg-[#20D3B4] justify-end"
//                       : "bg-gray-300 justify-start"
//                   }`}
//                 >
//                   <div className="w-3 h-3 rounded-full bg-white shadow"></div>
//                 </div>
//                 <span className="text-md py-[2px]">Has Deals</span>
//               </div>

//               <Dropdown
//                 label="Features"
//                 options={[
//                   "Access Controls/Permissions",
//                   "Accounting",
//                   "Approval Process Control",
//                   "API",
//                   "Billing & Invoicing",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "features"}
//                 toggleDropdown={() => toggleDropdown("features")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Pricing Options"
//                 options={[
//                   "Subscription",
//                   "Lifetime License",
//                   "Free Trial",
//                   "Free Version",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "pricing"}
//                 toggleDropdown={() => toggleDropdown("pricing")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Deployment"
//                 options={[
//                   "Cloud, SaaS, Web-Based",
//                   "Mobile - Android",
//                   "Mobile - iPhone",
//                   "Mobile - iPad",
//                   "Desktop - Mac",
//                   "Desktop - Windows",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "deployment"}
//                 toggleDropdown={() => toggleDropdown("deployment")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Best For"
//                 options={[
//                   "StartUps",
//                   "Freelancers",
//                   "Small Business",
//                   "Medium Business",
//                   "Large Enterprise",
//                   "Non-profit Organization",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "bestFor"}
//                 toggleDropdown={() => toggleDropdown("bestFor")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 w-full md:w-64 max-w-md">
//                 <Search
//                   size={18}
//                   className="text-gray-500 mr-3"
//                   aria-hidden="true"
//                 />
//                 <input
//                   type="text"
//                   value={searchText}
//                   onChange={(e) => setSearchText(e.target.value)}
//                   className="flex-grow outline-none text-sm text-gray-800 bg-gray-100 placeholder-gray-500"
//                   placeholder="Search..."
//                   aria-label="Search"
//                 />
//                 {searchText && (
//                   <button
//                     type="button"
//                     onClick={clearSearch}
//                     className="ml-2 text-gray-500 hover:text-gray-700"
//                     aria-label="Clear search"
//                   >
//                     <X size={18} />
//                   </button>
//                 )}
//               </div>

//               <button
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gray-100 text-gray-800 border-gray-300 w-full md:w-auto"
//                 onClick={handleResetFilters}
//               >
//                 <RefreshCw size={18} className="text-gray-500" />
//                 <span className="text-sm font-medium">Reset All</span>
//               </button>

//               <div className="overflow-y-auto max-h-32 flex flex-wrap gap-2">
//                 {selectedFilters.map((filter, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-2 px-3 py-1 rounded-full border bg-gray-100 text-gray-800 border-gray-300"
//                   >
//                     <span className="text-sm">{filter}</span>
//                     <X
//                       size={16}
//                       className="cursor-pointer"
//                       onClick={() => handleRemoveFilter(filter)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col space-y-8 my-6">
//           {sortByOptions && paginatedData.length > 0 ? (
//             paginatedData.map((software, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-xl rounded-lg p-7 w-full max-w-4xl mx-auto"
//               >
//                 <div className="flex flex-col sm:flex-row items-start">
//                   <div className="flex items-center justify-center bg-white shadow-md rounded-xl w-36 h-36 mx-auto sm:mx-0">
//                     <img
//                       src={software.imageUrl?.url || "/noimage.png"}
//                       alt={software.name}
//                       className="w-28 h-28"
//                     />
//                   </div>

//                   <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-left">
//                     <h2 className="text-2xl font-semibold text-[#20D3B4] pt-1">
//                       {software.name}
//                     </h2>
//                     <div className="flex flex-col sm:flex-row sm:gap-12 mt-2">
//                       <span className="text-gray-600 text-sm">
//                         Tekpon Score
//                       </span>
//                       <span className="text-gray-600 text-sm">
//                         {software.score}
//                       </span>
//                     </div>
//                     <div className="flex items-center mt-2 space-x-3">
//                       <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full">
//                         <div
//                           className="absolute h-full rounded-full"
//                           style={{
//                             width: `${(software.score / 10) * 100}%`,
//                             background:
//                               "linear-gradient(to right, #FFA500, #FF4500)",
//                           }}
//                         ></div>
//                         <div
//                           className="absolute bg-red-500 rounded-full shadow-md"
//                           style={{
//                             width: "10px",
//                             height: "10px",
//                             top: "-4px",
//                             left: `${(software.score / 10) * 100}%`,
//                             transform: "translateX(-50%)",
//                           }}
//                         ></div>
//                       </div>
//                     </div>
//                     <button className="flex items-center mt-4 space-x-2 px-4 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-teal-500 to-teal-800 hover:from-teal-600 hover:to-teal-400 shadow-md">
//                       <span>PREMIUM SELLER</span>
//                       <Info size={18} />
//                     </button>
//                   </div>
//                   <div className="flex flex-col space-y-6">
//                     <a
//                       href={software.visitUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-4 sm:mt-0 sm:ml-8 bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md px-8 py-2.5 cursor-pointer w-full sm:w-auto text-center"
//                     >
//                       Visit Profile
//                     </a>
//                     <a
//                       href={software.visitUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-4 sm:mt-0 sm:ml-8 hover:bg-teal-500 hover:text-white text-teal-500 border-teal-500 cursor-pointer border-2 rounded-md px-8 py-2 w-full sm:w-auto text-center"
//                     >
//                       See Deal
//                     </a>
//                   </div>
//                 </div>

//                 <div className="mt-6 mb-4 text-left">
//                   <p className="text-gray-600 text-lg">
//                     {software.description}&nbsp;
//                     <a
//                       href={software.visitUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#20D3B4] hover:text-blue-700 font-medium text-lg"
//                     >
//                       Learn more about {software.name}
//                     </a>
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2 mt-4 text-left">
//                   <input
//                     type="checkbox"
//                     id={`compare-${index}`}
//                     className="w-5 h-5 border-2 border-[#20D3B4] rounded-sm appearance-none ring-2 checked:bg-[#20D3B4] focus:ring-2 focus:ring-[#20D3B4] focus:outline-none checked:before:content-['✔'] checked:before:text-white checked:before:text-center checked:before:block checked:before:leading-5"
//                   />
//                   <label
//                     htmlFor={`compare-${index}`}
//                     className="text-[#20D3B4] font-medium text-md cursor-pointer"
//                   >
//                     COMPARE
//                   </label>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600">No software available</p>
//           )}

//           {/* Pagination Controls */}
//           {sortedData.length > itemsPerPage && (
//             <div className="flex justify-center mt-6 space-x-4">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-md ${
//                   currentPage === 1
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-[#20D3B4] hover:bg-teal-500 text-white"
//                 }`}
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700 font-semibold mt-2">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-md ${
//                   currentPage === totalPages
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-[#20D3B4] hover:bg-teal-500 text-white"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>

// <div className="max-w-4xl mx-auto p-4">
//   {/* Author Section */}
//   <div className="flex items-center space-x-3 mb-4">
//     <img
//       src={Profile}
//       alt="Author"
//       className="rounded-full w-10 h-10"
//     />
//     <p className="text-gray-700">
//       by <span className="font-semibold">Author Name first</span> &
//       <span className="font-semibold">(agar 2 authors hain to)Author Name second</span>
//       <span className="text-gray-500">Role</span>
//     </p>
//   </div>

//   <div className="mx-auto mt-10">
//     {/* Table of Contents */}
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <div
//         className="flex justify-between items-center cursor-pointer"
//         onClick={() => setIsTOCOpen(!isTOCOpen)}
//       >
//         <div className="flex items-center space-x-2">
//           <List size={20} />
//           <h3 className="font-semibold text-lg">Table of Contents</h3>
//         </div>
//         {isTOCOpen ? (
//           <ChevronUp size={20} className="text-gray-600" />
//         ) : (
//           <ChevronDown size={20} className="text-gray-600" />
//         )}
//       </div>

//       {isTOCOpen && (
//         <ul className="space-y-2 mt-3">
//           {tableOfContents.map((item) => (
//             <li key={item.id}>
//               <button
//                 className="text-[#20D3B4] hover:underline"
//                 onClick={() => scrollToQuestion(item.id)}
//               >
//                 {item.id}. {item.question}
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>

//     {/* Display All Questions and Answers */}
//     <div className="mt-8 space-y-6">
//       {tableOfContents.map((item) => (
//         <div
//           key={item.id}
//           ref={(el) => (questionRefs.current[item.id] = el)}
//         >
//           <h2 className="text-xl font-semibold">{item.question}</h2>
//           <div
//             className="mt-1 mb-2"
//             style={{
//               width: "60%",
//               height: "2px",
//               background:
//                 "linear-gradient(to right, #20D3B4 0, #20D3B4 50%, transparent 100%)",
//             }}
//           ></div>
//           <p className="text-gray-700">{item.answer}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
//         <div className="max-w-4xl mx-auto p-6">
//           <h2 className="text-2xl font-bold text-center mb-6">Authors</h2>
//           <div className="flex flex-col sm:flex-row gap-6">
//             {authors.map(
//               (
//                 author,
//                 index // Added index here
//               ) => (
//                 <div
//                   key={index} // Now, index is correctly defined
//                   className="bg-white shadow-md rounded-lg p-6 flex flex-col w-full sm:w-1/2"
//                 >
//                   <div className="flex items-center w-full sm:w-96 space-x-6">
//                     {/* Profile Image */}
//                     <img
//                       src={author.image}
//                       alt={author.name}
//                       className="w-28 h-28 rounded-full object-cover shadow-lg"
//                     />

//                     {/* Text Content */}
//                     <div className="flex flex-col text-left">
//                       <p className="text-sm text-gray-600 font-semibold">
//                         {author.type}
//                       </p>
//                       <h3 className="text-2xl font-bold">{author.name}</h3>
//                       <p className="text-gray-600 text-md font-medium">
//                         {author.role}
//                       </p>

//                       {/* Social Media Icons */}
//                       <div className="flex space-x-3 mt-3">
//                         {author.socialLinks.map((Icon, index) => (
//                           <Icon
//                             key={index}
//                             className="text-gray-700 bg-gray-200 text-4xl p-2 rounded-md hover:bg-gray-300 cursor-pointer"
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <p className="text-md text-left font-semibold text-gray-800 mt-4">
//                     {author.designation}
//                   </p>
//                   <p className="text-gray-600 text-left mt-2">
//                     {author.description}
//                   </p>
//                 </div>
//               )
//             )}
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           <InsightsCard />
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleCategory;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../../url";
// import slugify from "slugify";
// import { Filter, ArrowDownUp, RefreshCw, X, Search } from "lucide-react";
// import Dropdown from "../../constant/Dropdown";

// const SingleCategory = () => {
//   const { slug } = useParams();
//   const [category, setCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [selectedRadio, setSelectedRadio] = useState(null);
//   const [isActive, setIsActive] = useState(false);
//   const [filteredSoftwares, setFilteredSoftwares] = useState([]);

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${BASE_URL}api/v1/sub-category/get-sub-category-admin`
//         );
//         const categories = response.data.data.subCategories;

//         const matchedCategory = categories.find(
//           (category) =>
//             slugify(category.name, { lower: true, strict: true }) === slug
//         );

//         if (!matchedCategory) {
//           setError("Category not found.");
//         } else {
//           setCategory(matchedCategory);
//         }
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//         setError("Failed to fetch category details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategory();
//   }, [slug]);

//   const toggleDropdown = (dropdown) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//   };

//   const handleSelectOption = (option) => {
//     if (selectedFilters.includes(option)) {
//       setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
//     } else {
//       setSelectedFilters([...selectedFilters, option]);
//     }
//   };

//   const handleResetFilters = () => {
//     setSelectedFilters([]);
//     setSearchText("");
//     setSelectedRadio(null);
//     setIsActive(false);
//   };

//   const handleRemoveFilter = (option) => {
//     setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
//   };

//   const clearSearch = () => {
//     setSearchText("");
//   };

//   const handleRadioSelect = (option) => {
//     setSelectedRadio(option);
//   };

//   const toggleSwitch = () => {
//     setIsActive(!isActive);
//   };

//   const sortByOptions = ["A to Z", "Z to A"];

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   const filteredData = category?.softwares?.filter((software) => {
//     if (selectedFilters.length > 0) {
//       return selectedFilters.every((filter) => {
//         if (software.features && software.features.includes(filter)) {
//           return true;
//         }
//         if (software.deployment && software.deployment.includes(filter)) {
//           return true;
//         }
//         if (software.pricingoption && software.pricingoption.includes(filter)) {
//           return true;
//         }
//         if (software.bestfor && software.bestfor.includes(filter)) {
//           return true;
//         }
//         return false;
//       });
//     }

//     return software.name.toLowerCase().includes(searchText.toLowerCase());
//   });

//   const sortedData = filteredData.sort((a, b) => {
//     if (selectedRadio === "A to Z") {
//       return a.name.localeCompare(b.name);
//     } else if (selectedRadio === "Z to A") {
//       return b.name.localeCompare(a.name);
//     }
//     return 0;
//   });

//   return (
//     <>
//       <div className="bg-gray-100 pb-20">
//         <div className="flex flex-col items-center bg-gray-100 px-4 md:px-8">
//           {category ? (
//             <div className="pt-12 max-w-4xl w-full">
//               <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-start">
//                 Best {category.name}
//               </h1>
//               <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 pt-4 text-center md:text-start">
//                 What is an {category.name} ?
//               </h2>
//               <p className="text-gray-600 text-base md:text-lg">
//                 {category.description || (
//                   <>
//                     {category.name} software is a specialized tool designed to
//                     help {category.name.toLowerCase()} firms streamline their
//                     operations, improve client communication, and manage tasks
//                     more efficiently.
//                   </>
//                 )}
//                 {isExpanded && (
//                   <span>
//                     <br />
//                     By automating repetitive processes, this software helps
//                     reduce administrative burdens, allowing professionals to
//                     focus more on providing services to their clients.
//                   </span>
//                 )}
//               </p>
//               <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="mt-4 text-[#20D3B4] font-semibold hover:text-blue-700 focus:outline-none"
//               >
//                 {isExpanded ? "Read less ⬆" : "Read more ⬇"}
//               </button>
//             </div>
//           ) : (
//             <div className="pt-12 max-w-4xl w-full">
//               <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-start">
//                 Loading Category...
//               </h1>
//               <p className="text-gray-600 text-base md:text-lg">
//                 Please wait while we fetch the category details.
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col items-center px-4 md:px-8 py-6">
//           <div className="w-full max-w-4xl">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-start">
//               Compare {category.name} Software
//             </h1>
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl p-4 rounded-md shadow-md bg-white">
//             <div className="flex items-center space-x-2 text-gray-700">
//               <Filter size={20} className="text-gray-500" />
//               <span className="text-sm font-medium">
//                 Filter Software Rankings
//               </span>
//               <span className="text-sm">|</span>
//               <span className="text-sm text-gray-500">
//                 Updated on Dec 30th, '24
//               </span>
//             </div>

//             <div className="relative mt-4 md:mt-0">
//               <span className="text-sm font-medium flex gap-1 items-center">
//                 <ArrowDownUp size={18} /> Sort By
//                 <Dropdown
//                   label="Radio Options"
//                   options={sortByOptions}
//                   type="radio"
//                   isOpen={activeDropdown === "radio"}
//                   toggleDropdown={() => toggleDropdown("radio")}
//                   onSelect={handleRadioSelect}
//                   selectedFilters={selectedRadio}
//                 />
//               </span>
//             </div>
//           </div>

//           <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl mt-4">
//             <div className="flex flex-wrap items-center gap-4">
//               <div
//                 onClick={toggleSwitch}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer text-sm font-medium bg-gray-100 text-gray-800`}
//               >
//                 <div
//                   className={`w-8 h-4 rounded-full flex items-center cursor-pointer p-1 transition-all duration-300 ${
//                     isActive
//                       ? "bg-[#20D3B4] justify-end"
//                       : "bg-gray-300 justify-start"
//                   }`}
//                 >
//                   <div className="w-3 h-3 rounded-full bg-white shadow"></div>
//                 </div>
//                 <span className="text-md py-[2px]">Has Deals</span>
//               </div>

//               <Dropdown
//                 label="Features"
//                 options={[
//                   "Access Controls/Permissions",
//                   "Accounting",
//                   "Approval Process Control",
//                   "API",
//                   "Billing & Invoicing",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "features"}
//                 toggleDropdown={() => toggleDropdown("features")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Pricing Options"
//                 options={[
//                   "Subscription",
//                   "Lifetime License",
//                   "Free Trial",
//                   "Free Version",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "pricing"}
//                 toggleDropdown={() => toggleDropdown("pricing")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Deployment"
//                 options={[
//                   "Cloud, SaaS, Web-Based",
//                   "Mobile - Android",
//                   "Mobile - iPhone",
//                   "Mobile - iPad",
//                   "Desktop - Mac",
//                   "Desktop - Windows",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "deployment"}
//                 toggleDropdown={() => toggleDropdown("deployment")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Best For"
//                 options={[
//                   "StartUps",
//                   "Freelancers",
//                   "Small Business",
//                   "Medium Business",
//                   "Large Enterprise",
//                   "Non-profit Organization",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "bestFor"}
//                 toggleDropdown={() => toggleDropdown("bestFor")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 w-full md:w-64 max-w-md">
//                 <Search
//                   size={18}
//                   className="text-gray-500 mr-3"
//                   aria-hidden="true"
//                 />
//                 <input
//                   type="text"
//                   value={searchText}
//                   onChange={(e) => setSearchText(e.target.value)}
//                   className="flex-grow outline-none text-sm text-gray-800 bg-gray-100 placeholder-gray-500"
//                   placeholder="Search..."
//                   aria-label="Search"
//                 />
//                 {searchText && (
//                   <button
//                     type="button"
//                     onClick={clearSearch}
//                     className="ml-2 text-gray-500 hover:text-gray-700"
//                     aria-label="Clear search"
//                   >
//                     <X size={18} />
//                   </button>
//                 )}
//               </div>

//               <button
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gray-100 text-gray-800 border-gray-300 w-full md:w-auto"
//                 onClick={handleResetFilters}
//               >
//                 <RefreshCw size={18} className="text-gray-500" />
//                 <span className="text-sm font-medium">Reset All</span>
//               </button>

//               <div className="overflow-y-auto max-h-32 flex flex-wrap gap-2">
//                 {selectedFilters.map((filter, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-2 px-3 py-1 rounded-full border bg-gray-100 text-gray-800 border-gray-300"
//                   >
//                     <span className="text-sm">{filter}</span>
//                     <X
//                       size={16}
//                       className="cursor-pointer"
//                       onClick={() => handleRemoveFilter(filter)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col space-y-8 my-6">
//           {sortByOptions && filteredData.length > 0 ? (
//             sortedData &&
//             filteredData.map((software, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-xl rounded-lg p-7 w-full max-w-4xl mx-auto"
//               >
//                 <div className="flex flex-col sm:flex-row items-start">
//                   <div className="flex items-center justify-center bg-white shadow-md rounded-xl w-36 h-36 mx-auto sm:mx-0">
//                     <img
//                       src={software.imageUrl?.url || "/noimage.png"}
//                       alt={software.name}
//                       className="w-28 h-28"
//                     />
//                   </div>

//                   <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-left">
//                     <h2 className="text-2xl font-semibold text-[#20D3B4] pt-1">
//                       {software.name}
//                     </h2>
//                     <div className="flex flex-col sm:flex-row sm:gap-12 mt-2">
//                       <span className="text-gray-600 text-sm">
//                         Tekpon Score
//                       </span>
//                       <span className="text-gray-600 text-sm">
//                         {software.score}
//                       </span>
//                     </div>
//                     <div className="flex items-center mt-2 space-x-3">
//                       <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full">
//                         <div
//                           className="absolute h-full rounded-full"
//                           style={{
//                             width: `${(software.score / 10) * 100}%`,
//                             background:
//                               "linear-gradient(to right, #FFA500, #FF4500)",
//                           }}
//                         ></div>
//                         <div
//                           className="absolute bg-red-500 rounded-full shadow-md"
//                           style={{
//                             width: "10px",
//                             height: "10px",
//                             top: "-4px",
//                             left: `${(software.score / 10) * 100}%`,
//                             transform: "translateX(-50%)",
//                           }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                   <a
//                     href={software.visitUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-4 sm:mt-0 sm:ml-8 bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md px-8 py-2 w-full sm:w-auto text-center"
//                   >
//                     Visit Profile
//                   </a>
//                 </div>

//                 <div className="mt-6 mb-4 text-left">
//                   <p className="text-gray-600 text-lg">
//                     {software.description}&nbsp;
//                     <a
//                       href={software.visitUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#20D3B4] hover:text-blue-700 font-medium text-lg"
//                     >
//                       Learn more about {software.name}
//                     </a>
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2 mt-4 text-left">
//                   <input
//                     type="checkbox"
//                     id={`compare-${index}`}
//                     className="w-5 h-5 border-2 border-[#20D3B4] rounded-sm appearance-none ring-2 checked:bg-[#20D3B4] focus:ring-2 focus:ring-[#20D3B4] focus:outline-none checked:before:content-['✔'] checked:before:text-white checked:before:text-center checked:before:block checked:before:leading-5"
//                   />
//                   <label
//                     htmlFor={`compare-${index}`}
//                     className="text-[#20D3B4] font-medium text-md cursor-pointer"
//                   >
//                     COMPARE
//                   </label>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600">No software available</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleCategory;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../../url";
// import slugify from "slugify";
// import {
//   Filter,
//   ArrowDownUp,
//   RefreshCw,
//   X,
//   Search,
//   Info,
//   ChevronDown,
//   ChevronUp,
//   List,
// } from "lucide-react";
// import Dropdown from "../../constant/Dropdown";
// import Profile from "../../assets/Profile.jpg";
// import { FaFacebook, FaTumblr, FaLinkedin, FaXTwitter } from "react-icons/fa6";
// import InsightsCard from "../../components/cards/InsightsCard";

// const tableOfContents = [
//   {
//     id: 1,
//     question: "Who can use accounting software?",
//     answer:
//       "Accountants, controllers, chief financial officers (CFOs), and other accounting department members use online accounting software to perform their tasks. The accounting department can range from a single person to many employees handling financial operations like accounts payable, accounts receivable, cash management, or expenses.",
//   },
//   {
//     id: 2,
//     question: "The benefits of using accounting programs",
//     answer:
//       "Using an accounting program for your business or personal finance brings multiple benefits, including efficiency, automation, and better financial management.",
//   },
//   {
//     id: 3,
//     question: "Key features for accounting software",
//     answer:
//       "Key features include expense tracking, invoicing, tax calculation, financial reporting, and multi-user access.",
//   },
//   {
//     id: 4,
//     question: "Costs range for accounting software",
//     answer:
//       "Accounting software costs vary from free versions to premium subscriptions that can cost hundreds per month.",
//   },
//   {
//     id: 5,
//     question: "What is the best accounting software?",
//     answer:
//       "The best accounting software depends on your needs. Some popular options include QuickBooks, Xero, and FreshBooks.",
//   },
//   {
//     id: 6,
//     question: "Why do businesses need accounting software?",
//     answer:
//       "Businesses need accounting software to streamline financial management, ensure accuracy, and save time on bookkeeping.",
//   },
//   {
//     id: 7,
//     question: "Best accounting software programs",
//     answer:
//       "The best programs include QuickBooks, Zoho Books, Sage, and FreshBooks.",
//   },
// ];

// const SingleCategory = ({ softwareData }) => {
//   const { slug } = useParams();
//   const [category, setCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [selectedRadio, setSelectedRadio] = useState(null);
//   const [isActive, setIsActive] = useState(false);
//   const [filteredSoftwares, setFilteredSoftwares] = useState([]);
//   const [isTOCOpen, setIsTOCOpen] = useState(false);
//   const questionRefs = useRef({});
//   const [selectedSoftware, setSelectedSoftware] = useState([]);

//   const navigate = useNavigate();
//   // Extract authors and questions dynamically
//   const authors = category?.authors || [];

//   const tableOfContents =
//     authors[1]?.questionsAnswers?.map((qa, index) => ({
//       id: index + 1,
//       question: qa.question,
//       answer: qa.answer,
//     })) || [];

//   // Function to smoothly scroll to questions
//   const scrollToQuestion = (id) => {
//     if (questionRefs.current[id]) {
//       questionRefs.current[id].scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//       });
//     }
//   };

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${BASE_URL}api/v1/sub-category/get-sub-category-admin`
//         );
//         console.log("API Response:", response.data);
//         const categories = response.data.data.subCategories;

//         const matchedCategory = categories.find(
//           (category) =>
//             slugify(category.name, { lower: true, strict: true }) === slug
//         );

//         if (!matchedCategory) {
//           setError("Category not found.");
//         } else {
//           console.log("Matched Category:", matchedCategory);
//           setCategory(matchedCategory);
//         }
//       } catch (err) {
//         console.error("Error fetching category:", err);
//         setError("Failed to fetch category data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategory();
//   }, [slug]);

//   const options = {
//     timeZone: "Asia/Karachi",
//     month: "short",
//     day: "numeric",
//     year: "2-digit",
//   };

//   const pakistanTime = new Date().toLocaleDateString("en-US", options);

//   const toggleDropdown = (dropdown) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//   };

//   const handleSelectOption = (option) => {
//     if (selectedFilters.includes(option)) {
//       setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
//     } else {
//       setSelectedFilters([...selectedFilters, option]);
//     }
//   };

//   const handleResetFilters = () => {
//     setSelectedFilters([]);
//     setSearchText("");
//     setSelectedRadio(null);
//     setIsActive(false);
//   };

//   const handleRemoveFilter = (option) => {
//     setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
//   };

//   const clearSearch = () => {
//     setSearchText("");
//   };

//   const handleRadioSelect = (option) => {
//     setSelectedRadio(option);
//   };

//   const toggleSwitch = () => {
//     setIsActive(!isActive);
//   };

//   const sortByOptions = ["A to Z", "Z to A"];

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   const filteredData = category?.softwares?.filter((software) => {
//     if (selectedFilters.length > 0) {
//       return selectedFilters.every((filter) => {
//         if (software.features && software.features.includes(filter)) {
//           return true;
//         }
//         if (software.deployment && software.deployment.includes(filter)) {
//           return true;
//         }
//         if (software.pricingoption && software.pricingoption.includes(filter)) {
//           return true;
//         }
//         if (software.bestfor && software.bestfor.includes(filter)) {
//           return true;
//         }
//         return false;
//       });
//     }

//     return software.name.toLowerCase().includes(searchText.toLowerCase());
//   });

//   const sortedData = filteredData.sort((a, b) => {
//     if (selectedRadio === "A to Z") {
//       return a.name.localeCompare(b.name);
//     } else if (selectedRadio === "Z to A") {
//       return b.name.localeCompare(a.name);
//     }
//     return 0;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const paginatedData = sortedData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   //comparison functionality
//   const toggleSelection = (software) => {
//     setSelectedSoftware((prevSelected) => {
//       const isSelected = prevSelected.find(
//         (item) => item.name === software.name
//       );
//       if (isSelected) {
//         return prevSelected.filter((item) => item.name !== software.name);
//       } else {
//         return [...prevSelected, software];
//       }
//     });
//   };

//   const removeSoftware = (name) => {
//     setSelectedSoftware((prev) => prev.filter((item) => item.name !== name));
//   };

//   const handleCompare = () => {
//     if (selectedSoftware.length > 1) {
//       const softwareNames = selectedSoftware.map((s) =>
//         s.name.replace(/\s+/g, "-").toLowerCase()
//       );
//       navigate(`/versus/?filter[software]=${softwareNames.join(",")}`, {
//         state: { selectedSoftware }, // ✅ Passing selected software to the next page
//       });
//     }
//   };
//   console.log(
//     "this is the data of the softwares in the singlecategory",
//     paginatedData
//   );
//   return (
//     <>
//       <div className="bg-gray-100 pb-20">
//         <div className="flex flex-col items-center bg-gray-100 px-4 md:px-8">
//           {category ? (
//             <div className="pt-12 max-w-4xl w-full">
//               <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-start">
//                 Best {category.name}
//               </h1>
//               <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 pt-4 text-center md:text-start">
//                 What is an {category.name} ?
//               </h2>
//               <p className="text-gray-600 text-base md:text-lg">
//                 {category.description || (
//                   <>
//                     {category.name} software is a specialized tool designed to
//                     help {category.name.toLowerCase()} firms streamline their
//                     operations, improve client communication, and manage tasks
//                     more efficiently.
//                   </>
//                 )}
//                 {isExpanded && (
//                   <span>
//                     <br />
//                     By automating repetitive processes, this software helps
//                     reduce administrative burdens, allowing professionals to
//                     focus more on providing services to their clients.
//                   </span>
//                 )}
//               </p>
//               <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="mt-4 text-[#20D3B4] font-semibold hover:text-blue-700 focus:outline-none"
//               >
//                 {isExpanded ? "Read less ⬆" : "Read more ⬇"}
//               </button>
//             </div>
//           ) : (
//             <div className="pt-12 max-w-4xl w-full">
//               <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-start">
//                 Loading Category...
//               </h1>
//               <p className="text-gray-600 text-base md:text-lg">
//                 Please wait while we fetch the category details.
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col items-center px-4 md:px-8 py-6">
//           <div className="w-full max-w-4xl">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-start">
//               Compare {category.name} Software
//             </h1>
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl p-4 rounded-md shadow-md bg-white">
//             <div className="flex items-center space-x-2 text-gray-700">
//               <Filter size={20} className="text-gray-500" />
//               <span className="text-sm font-medium">
//                 Filter Software Rankings
//               </span>
//               <span className="text-sm">|</span>
//               <span className="text-sm text-gray-500">
//                 Updated on {pakistanTime}
//               </span>
//             </div>

//             <div className="relative mt-4 md:mt-0">
//               <span className="text-sm font-medium flex gap-1 items-center">
//                 <ArrowDownUp size={18} /> Sort By
//                 <Dropdown
//                   label="Radio Options"
//                   options={sortByOptions}
//                   type="radio"
//                   isOpen={activeDropdown === "radio"}
//                   toggleDropdown={() => toggleDropdown("radio")}
//                   onSelect={handleRadioSelect}
//                   selectedFilters={selectedRadio}
//                 />
//               </span>
//             </div>
//           </div>

//           <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl mt-4">
//             <div className="flex flex-wrap items-center gap-4">
//               <div
//                 onClick={toggleSwitch}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer text-sm font-medium bg-gray-100 text-gray-800`}
//               >
//                 <div
//                   className={`w-8 h-4 rounded-full flex items-center cursor-pointer p-1 transition-all duration-300 ${
//                     isActive
//                       ? "bg-[#20D3B4] justify-end"
//                       : "bg-gray-300 justify-start"
//                   }`}
//                 >
//                   <div className="w-3 h-3 rounded-full bg-white shadow"></div>
//                 </div>
//                 <span className="text-md py-[2px]">Has Deals</span>
//               </div>

//               <Dropdown
//                 label="Features"
//                 options={[
//                   "Access Controls/Permissions",
//                   "Accounting",
//                   "Approval Process Control",
//                   "API",
//                   "Billing & Invoicing",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "features"}
//                 toggleDropdown={() => toggleDropdown("features")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Pricing Options"
//                 options={[
//                   "Subscription",
//                   "Lifetime License",
//                   "Free Trial",
//                   "Free Version",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "pricing"}
//                 toggleDropdown={() => toggleDropdown("pricing")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Deployment"
//                 options={[
//                   "Cloud, SaaS, Web-Based",
//                   "Mobile - Android",
//                   "Mobile - iPhone",
//                   "Mobile - iPad",
//                   "Desktop - Mac",
//                   "Desktop - Windows",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "deployment"}
//                 toggleDropdown={() => toggleDropdown("deployment")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <Dropdown
//                 label="Best For"
//                 options={[
//                   "StartUps",
//                   "Freelancers",
//                   "Small Business",
//                   "Medium Business",
//                   "Large Enterprise",
//                   "Non-profit Organization",
//                 ]}
//                 type="checkbox"
//                 isOpen={activeDropdown === "bestFor"}
//                 toggleDropdown={() => toggleDropdown("bestFor")}
//                 onSelect={handleSelectOption}
//                 selectedFilters={selectedFilters}
//               />

//               <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 w-full md:w-64 max-w-md">
//                 <Search
//                   size={18}
//                   className="text-gray-500 mr-3"
//                   aria-hidden="true"
//                 />
//                 <input
//                   type="text"
//                   value={searchText}
//                   onChange={(e) => setSearchText(e.target.value)}
//                   className="flex-grow outline-none text-sm text-gray-800 bg-gray-100 placeholder-gray-500"
//                   placeholder="Search..."
//                   aria-label="Search"
//                 />
//                 {searchText && (
//                   <button
//                     type="button"
//                     onClick={clearSearch}
//                     className="ml-2 text-gray-500 hover:text-gray-700"
//                     aria-label="Clear search"
//                   >
//                     <X size={18} />
//                   </button>
//                 )}
//               </div>

//               <button
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gray-100 text-gray-800 border-gray-300 w-full md:w-auto"
//                 onClick={handleResetFilters}
//               >
//                 <RefreshCw size={18} className="text-gray-500" />
//                 <span className="text-sm font-medium">Reset All</span>
//               </button>

//               <div className="overflow-y-auto max-h-32 flex flex-wrap gap-2">
//                 {selectedFilters.map((filter, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-2 px-3 py-1 rounded-full border bg-gray-100 text-gray-800 border-gray-300"
//                   >
//                     <span className="text-sm">{filter}</span>
//                     <X
//                       size={16}
//                       className="cursor-pointer"
//                       onClick={() => handleRemoveFilter(filter)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col space-y-8 my-6">
//           {sortByOptions && paginatedData.length > 0 ? (
//             paginatedData.map((software, index) => {
//               const softwareSlug = software.name
//                 .replace(/\s+/g, "-")
//                 .toLowerCase();

//               return (
//                 <div
//                   key={index}
//                   id="Usman"
//                   className="bg-white shadow-xl rounded-lg p-7 w-full max-w-4xl mx-auto"
//                 >
//                   <div className="flex flex-col sm:flex-row items-start">
//                     <div
//                       className="flex items-center justify-center bg-white shadow-md rounded-xl w-36 h-36 mx-auto sm:mx-0"
//                       onClick={() =>
//                         navigate(`/software/${softwareSlug}/reviews/`, {
//                           state: { software, categoryName: slug },
//                         })
//                       }
//                     >
//                       <img
//                         src={software.imageUrl?.url || "/noimage.png"}
//                         alt={software.name}
//                         className="w-28 h-28"
//                       />
//                     </div>

//                     <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-left">
//                       <h2 className="text-2xl font-semibold text-[#20D3B4] pt-1">
//                         {software.name}
//                       </h2>
//                       <div className="flex flex-col sm:flex-row sm:gap-12 mt-2">
//                         <span className="text-gray-600 text-sm">
//                           Tekpon Score
//                         </span>
//                         <span className="text-gray-600 text-sm">
//                           {software.score}
//                         </span>
//                       </div>
//                       <div className="flex items-center mt-2 space-x-3">
//                         <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full">
//                           <div
//                             className="absolute h-full rounded-full"
//                             style={{
//                               width: `${(software.score / 10) * 100}%`,
//                               background:
//                                 "linear-gradient(to right, #FFA500, #FF4500)",
//                             }}
//                           ></div>
//                           <div
//                             className="absolute bg-red-500 rounded-full shadow-md"
//                             style={{
//                               width: "10px",
//                               height: "10px",
//                               top: "-4px",
//                               left: `${(software.score / 10) * 100}%`,
//                               transform: "translateX(-50%)",
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                       <button className="flex items-center mt-4 space-x-2 px-4 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-teal-500 to-teal-800 hover:from-teal-600 hover:to-teal-400 shadow-md">
//                         <span>PREMIUM SELLER</span>
//                         <Info size={18} />
//                       </button>
//                     </div>
//                     <div className="flex flex-col space-y-6">
//                       <button
//                         onClick={() =>
//                           navigate(`/software/${softwareSlug}/reviews/`, {
//                             state: { software, categoryName: slug },
//                           })
//                         }
//                         style={{ textDecoration: "none" }}
//                         target="_blank"
//                         className="mt-4 sm:mt-0 sm:ml-8 bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md px-8 py-2.5 cursor-pointer w-full sm:w-auto text-center"
//                       >
//                         Visit Profile
//                       </button>
//                       <a
//                         href={software.visitUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="mt-4 sm:mt-0 sm:ml-8 hover:bg-teal-500 hover:text-white text-teal-500 border-teal-500 cursor-pointer border-2 rounded-md px-8 py-2 w-full sm:w-auto text-center"
//                       >
//                         See Deal
//                       </a>
//                     </div>
//                   </div>

//                   <div className="mt-6 mb-4 text-left">
//                     <p className="text-gray-600 text-lg">
//                       {software.description}&nbsp;
//                       <a
//                         href={software.visitUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-[#20D3B4] hover:text-blue-700 font-medium text-lg"
//                       >
//                         Learn more about {software.name}
//                       </a>
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2 mt-4 text-left">
//                     <input
//                       type="checkbox"
//                       id={`compare-${index}`}
//                       checked={selectedSoftware.some(
//                         (s) => s.name === software.name
//                       )}
//                       onChange={() => toggleSelection(software)}
//                       className="w-5 h-5 border-2 border-[#20D3B4] rounded-sm appearance-none ring-2 checked:bg-[#20D3B4] focus:ring-2 focus:ring-[#20D3B4] focus:outline-none checked:before:content-['✔'] checked:before:text-white checked:before:text-center checked:before:block checked:before:leading-5"
//                     />
//                     <label
//                       htmlFor={`compare-${index}`}
//                       className="text-[#20D3B4] font-medium text-md cursor-pointer"
//                     >
//                       COMPARE
//                     </label>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-center text-gray-600">No software available</p>
//           )}

//           {/* Modal for Selected Software */}
//           {selectedSoftware.length > 0 && (
//             <div className="fixed bottom-32  right-6 bg-white shadow-lg rounded-md p-4 w-20">
//               <div className="flex flex-col gap-3">
//                 {selectedSoftware.map((software) => (
//                   <div
//                     key={software.name}
//                     className="relative bg-gray-100 rounded-md p-2 flex items-center"
//                   >
//                     <img
//                       src={software.imageUrl?.url || "/noimage.png"}
//                       alt={software.name}
//                       className="w-10 h-10"
//                     />
//                     <button
//                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-sm"
//                       onClick={() => removeSoftware(software.name)}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={handleCompare}
//                 className="mt-4 bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md text-center px-4 py-2 "
//               >
//                 Go
//               </button>
//             </div>
//           )}

//           {/* Pagination Controls */}
//           {sortedData.length > itemsPerPage && (
//             <div className="flex justify-center mt-6 space-x-4">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-md ${
//                   currentPage === 1
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-[#20D3B4] hover:bg-teal-500 text-white"
//                 }`}
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700 font-semibold mt-2">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-md ${
//                   currentPage === totalPages
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-[#20D3B4] hover:bg-teal-500 text-white"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="max-w-4xl mx-auto p-4">
//           <div className="flex items-center space-x-3 mb-4">
//             <img
//               // src={category?.imageUrl || "default-profile.png"}
//               src={Profile}
//               alt="Author"
//               className="rounded-full w-10 h-10"
//             />
//             <p className="text-gray-700">
//               by
//               <span className="font-semibold">
//                 {category?.authors?.[0]?.name}
//               </span>
//               {category?.authors?.length > 1 && (
//                 <span className="font-semibold">
//                   & {category.authors[1].name}
//                 </span>
//               )}
//               <span className="text-gray-500">
//                 {category?.authors?.[0]?.role}
//               </span>
//             </p>
//           </div>

//           <div className="max-w-4xl mx-auto mt-6">
//             <div className="bg-white shadow-md rounded-lg p-4">
//               <div
//                 className="flex justify-between items-center cursor-pointer"
//                 onClick={() => setIsTOCOpen(!isTOCOpen)}
//               >
//                 <div className="flex items-center space-x-2">
//                   <List size={20} />
//                   <h3 className="font-semibold text-lg">Table of Contents</h3>
//                 </div>
//                 {isTOCOpen ? (
//                   <ChevronUp size={20} className="text-gray-600" />
//                 ) : (
//                   <ChevronDown size={20} className="text-gray-600" />
//                 )}
//               </div>

//               {isTOCOpen && (
//                 <ul className="space-y-2 mt-3">
//                   {tableOfContents.map((item) => (
//                     <li key={item.id}>
//                       <button
//                         className="text-[#20D3B4] hover:underline"
//                         onClick={() => scrollToQuestion(item.id)}
//                       >
//                         {item.id}. {item.question}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             {/* Display All Questions and Answers */}
//             <div className="mt-8 space-y-6">
//               {tableOfContents.map((item) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => (questionRefs.current[item.id] = el)}
//                 >
//                   <h2 className="text-xl font-semibold">{item.question}</h2>
//                   <div
//                     className="mt-1 mb-2"
//                     style={{
//                       width: "60%",
//                       height: "2px",
//                       background:
//                         "linear-gradient(to right, #20D3B4 0, #20D3B4 50%, transparent 100%)",
//                     }}
//                   ></div>
//                   <p className="text-gray-700">{item.answer}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-2xl font-bold text-center mb-6">Authors</h2>
//             <div className="flex flex-col sm:flex-row gap-6">
//               {category?.authors?.map((author, index) => (
//                 <div
//                   key={index}
//                   className="bg-white shadow-md rounded-lg p-6 flex flex-col w-full sm:w-1/2"
//                 >
//                   <div className="flex items-center w-full sm:w-96 space-x-6">
//                     <img
//                       // src={author.imageUrl || "default-profile.png"}
//                       src={Profile}
//                       alt={author.name}
//                       className="w-28 h-28 rounded-full object-cover shadow-lg"
//                     />
//                     <div className="flex flex-col text-left">
//                       <p className="text-sm text-gray-600 font-semibold">
//                         {author.role}
//                       </p>
//                       <h3 className="text-2xl font-bold">{author.name}</h3>
//                       <p className="text-gray-600 text-md font-medium">
//                         {author.workRole}
//                       </p>
//                       <div className="flex space-x-3 mt-3">
//                         {author.socialLinks?.map((link, i) => (
//                           <a
//                             key={i}
//                             href={link.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             {link.platform === "Twitter" && (
//                               <FaXTwitter className="text-gray-700 text-2xl" />
//                             )}
//                             {link.platform === "Facebook" && (
//                               <FaFacebook className="text-gray-700 text-2xl" />
//                             )}
//                             {link.platform === "LinkedIn" && (
//                               <FaLinkedin className="text-gray-700 text-2xl" />
//                             )}
//                             {link.platform === "Tumblr" && (
//                               <FaTumblr className="text-gray-700 text-2xl" />
//                             )}
//                           </a>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-md text-left font-semibold text-gray-800 mt-4">
//                     {author.title}
//                   </p>
//                   <p className="text-gray-600 text-left mt-2">
//                     {author.paragraph}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           <InsightsCard />
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleCategory;















import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../url";
import slugify from "slugify";
import {
  Filter,
  ArrowDownUp,
  RefreshCw,
  X,
  Search,
  Info,
  ChevronDown,
  ChevronUp,
  List,
} from "lucide-react";
import Dropdown from "../../constant/Dropdown";
import Profile from "../../assets/Profile.jpg";
import { FaFacebook, FaTumblr, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import InsightsCard from "../../components/cards/InsightsCard";

const tableOfContents = [
  {
    id: 1,
    question: "Who can use accounting software?",
    answer:
      "Accountants, controllers, chief financial officers (CFOs), and other accounting department members use online accounting software to perform their tasks. The accounting department can range from a single person to many employees handling financial operations like accounts payable, accounts receivable, cash management, or expenses.",
  },
  {
    id: 2,
    question: "The benefits of using accounting programs",
    answer:
      "Using an accounting program for your business or personal finance brings multiple benefits, including efficiency, automation, and better financial management.",
  },
  {
    id: 3,
    question: "Key features for accounting software",
    answer:
      "Key features include expense tracking, invoicing, tax calculation, financial reporting, and multi-user access.",
  },
  {
    id: 4,
    question: "Costs range for accounting software",
    answer:
      "Accounting software costs vary from free versions to premium subscriptions that can cost hundreds per month.",
  },
  {
    id: 5,
    question: "What is the best accounting software?",
    answer:
      "The best accounting software depends on your needs. Some popular options include QuickBooks, Xero, and FreshBooks.",
  },
  {
    id: 6,
    question: "Why do businesses need accounting software?",
    answer:
      "Businesses need accounting software to streamline financial management, ensure accuracy, and save time on bookkeeping.",
  },
  {
    id: 7,
    question: "Best accounting software programs",
    answer:
      "The best programs include QuickBooks, Zoho Books, Sage, and FreshBooks.",
  },
];

const SingleCategory = ({ softwareData }) => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [filteredSoftwares, setFilteredSoftwares] = useState([]);
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const questionRefs = useRef({});
  const [selectedSoftware, setSelectedSoftware] = useState([]);

  const navigate = useNavigate();
  // Extract authors and questions dynamically
  const authors = category?.authors || [];

  const tableOfContents =
    authors[1]?.questionsAnswers?.map((qa, index) => ({
      id: index + 1,
      question: qa.question,
      answer: qa.answer,
    })) || [];

  // Function to smoothly scroll to questions
  const scrollToQuestion = (id) => {
    if (questionRefs.current[id]) {
      questionRefs.current[id].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}api/v1/sub-category/get-sub-category-admin`
        );
        console.log("API Response:", response.data);
        const categories = response.data.data.subCategories;

        const matchedCategory = categories.find(
          (category) =>
            slugify(category.name, { lower: true, strict: true }) === slug
        );

        if (!matchedCategory) {
          setError("Category not found.");
        } else {
          console.log("Matched Category:", matchedCategory);
          setCategory(matchedCategory);
        }
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to fetch category data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  const options = {
    timeZone: "Asia/Karachi",
    month: "short",
    day: "numeric",
    year: "2-digit",
  };

  const pakistanTime = new Date().toLocaleDateString("en-US", options);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSelectOption = (option) => {
    if (selectedFilters.includes(option)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
    } else {
      setSelectedFilters([...selectedFilters, option]);
    }
  };

  const handleResetFilters = () => {
    setSelectedFilters([]);
    setSearchText("");
    setSelectedRadio(null);
    setIsActive(false);
  };

  const handleRemoveFilter = (option) => {
    setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const handleRadioSelect = (option) => {
    setSelectedRadio(option);
  };

  const toggleSwitch = () => {
    setIsActive(!isActive);
  };

  const sortByOptions = ["A to Z", "Z to A"];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const filteredData = category?.softwares?.filter((software) => {
    if (selectedFilters.length > 0) {
      return selectedFilters.every((filter) => {
        if (software.features && software.features.includes(filter)) {
          return true;
        }
        if (software.deployment && software.deployment.includes(filter)) {
          return true;
        }
        if (software.pricingoption && software.pricingoption.includes(filter)) {
          return true;
        }
        if (software.bestfor && software.bestfor.includes(filter)) {
          return true;
        }
        return false;
      });
    }

    return software.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const sortedData = filteredData.sort((a, b) => {
    if (selectedRadio === "A to Z") {
      return a.name.localeCompare(b.name);
    } else if (selectedRadio === "Z to A") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  //comparison functionality
  const toggleSelection = (software) => {
    setSelectedSoftware((prevSelected) => {
      const isSelected = prevSelected.find(
        (item) => item.name === software.name
      );
      if (isSelected) {
        return prevSelected.filter((item) => item.name !== software.name);
      } else {
        return [...prevSelected, software];
      }
    });
  };

  const removeSoftware = (name) => {
    setSelectedSoftware((prev) => prev.filter((item) => item.name !== name));
  };

  const handleCompare = () => {
    if (selectedSoftware.length > 1) {
      const softwareNames = selectedSoftware.map((s) =>
        s.name.replace(/\s+/g, "-").toLowerCase()
      );
      navigate(`/versus/?filter[software]=${softwareNames.join(",")}`, {
        state: { selectedSoftware }, // ✅ Passing selected software to the next page
      });
    }
  };
  console.log(
    "this is the data of the softwares in the singlecategory",
    paginatedData
  );
  return (
    <>
      <div className="bg-gray-100 pb-20">
        <div className="flex flex-col items-center bg-gray-100 px-4 md:px-8">
          {category ? (
            <div className="pt-12 max-w-4xl w-full">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-start">
                Best {category.name}
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 pt-4 text-center md:text-start">
                What is an {category.name} ?
              </h2>
              <p className="text-gray-600 text-base md:text-lg">
                {category.description || (
                  <>
                    {category.name} software is a specialized tool designed to
                    help {category.name.toLowerCase()} firms streamline their
                    operations, improve client communication, and manage tasks
                    more efficiently.
                  </>
                )}
                {isExpanded && (
                  <span>
                    <br />
                    By automating repetitive processes, this software helps
                    reduce administrative burdens, allowing professionals to
                    focus more on providing services to their clients.
                  </span>
                )}
              </p>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 text-[#20D3B4] font-semibold hover:text-blue-700 focus:outline-none"
              >
                {isExpanded ? "Read less ⬆" : "Read more ⬇"}
              </button>
            </div>
          ) : (
            <div className="pt-12 max-w-4xl w-full">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-start">
                Loading Category...
              </h1>
              <p className="text-gray-600 text-base md:text-lg">
                Please wait while we fetch the category details.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center px-4 md:px-8 py-6">
          <div className="w-full max-w-4xl">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-start">
              Compare {category.name} Software
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl p-4 rounded-md shadow-md bg-white">
            {/* Left Section */}
            <div className="flex flex-wrap items-center space-x-2 text-gray-700 text-center md:text-left">
              <Filter size={20} className="text-gray-500" />
              <span className="text-sm font-medium">
                Filter Software Rankings
              </span>
              <span className="hidden sm:inline text-sm">|</span>
              <span className="text-sm text-gray-500">{pakistanTime}</span>
            </div>

            {/* Right Section (Sort By Dropdown) */}
            <div className="relative mt-4 md:mt-0 w-full md:w-auto flex items-center justify-center md:justify-end">
              <span className="text-sm font-medium flex items-center gap-2">
                <ArrowDownUp size={18} className="text-gray-700" />
                <span className="whitespace-nowrap">Sort By</span>
                <Dropdown
                  label="Radio Options"
                  options={sortByOptions}
                  type="radio"
                  isOpen={activeDropdown === "radio"}
                  toggleDropdown={() => toggleDropdown("radio")}
                  onSelect={handleRadioSelect}
                  selectedFilters={selectedRadio}
                  className="w-40"
                />
              </span>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl mt-4">
            <div className="flex flex-wrap items-center gap-4">
              <div
                onClick={toggleSwitch}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer text-sm font-medium bg-gray-100 text-gray-800`}
              >
                <div
                  className={`w-8 h-4 rounded-full flex items-center cursor-pointer p-1 transition-all duration-300 ${
                    isActive
                      ? "bg-[#20D3B4] justify-end"
                      : "bg-gray-300 justify-start"
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-white shadow"></div>
                </div>
                <span className="text-md py-[2px]">Has Deals</span>
              </div>

              <Dropdown
                label="Features"
                options={[
                  "Access Controls/Permissions",
                  "Accounting",
                  "Approval Process Control",
                  "API",
                  "Billing & Invoicing",
                ]}
                type="checkbox"
                isOpen={activeDropdown === "features"}
                toggleDropdown={() => toggleDropdown("features")}
                onSelect={handleSelectOption}
                selectedFilters={selectedFilters}
              />

              <Dropdown
                label="Pricing Options"
                options={[
                  "Subscription",
                  "Lifetime License",
                  "Free Trial",
                  "Free Version",
                ]}
                type="checkbox"
                isOpen={activeDropdown === "pricing"}
                toggleDropdown={() => toggleDropdown("pricing")}
                onSelect={handleSelectOption}
                selectedFilters={selectedFilters}
              />

              <Dropdown
                label="Deployment"
                options={[
                  "Cloud, SaaS, Web-Based",
                  "Mobile - Android",
                  "Mobile - iPhone",
                  "Mobile - iPad",
                  "Desktop - Mac",
                  "Desktop - Windows",
                ]}
                type="checkbox"
                isOpen={activeDropdown === "deployment"}
                toggleDropdown={() => toggleDropdown("deployment")}
                onSelect={handleSelectOption}
                selectedFilters={selectedFilters}
              />

              <Dropdown
                label="Best For"
                options={[
                  "StartUps",
                  "Freelancers",
                  "Small Business",
                  "Medium Business",
                  "Large Enterprise",
                  "Non-profit Organization",
                ]}
                type="checkbox"
                isOpen={activeDropdown === "bestFor"}
                toggleDropdown={() => toggleDropdown("bestFor")}
                onSelect={handleSelectOption}
                selectedFilters={selectedFilters}
              />

              <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 w-full md:w-64 max-w-md">
                <Search
                  size={18}
                  className="text-gray-500 mr-3"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-grow outline-none text-sm text-gray-800 bg-gray-100 placeholder-gray-500"
                  placeholder="Search..."
                  aria-label="Search"
                />
                {searchText && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gray-100 text-gray-800 border-gray-300 w-full md:w-auto"
                onClick={handleResetFilters}
              >
                <RefreshCw size={18} className="text-gray-500" />
                <span className="text-sm font-medium">Reset All</span>
              </button>

              <div className="overflow-y-auto max-h-32 flex flex-wrap gap-2">
                {selectedFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 rounded-full border bg-gray-100 text-gray-800 border-gray-300"
                  >
                    <span className="text-sm">{filter}</span>
                    <X
                      size={16}
                      className="cursor-pointer"
                      onClick={() => handleRemoveFilter(filter)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-8 my-6">
          {sortByOptions && paginatedData.length > 0 ? (
            paginatedData.map((software, index) => {
              const softwareSlug = software.name
                .replace(/\s+/g, "-")
                .toLowerCase();

              return (
                <div
                  key={index}
                  id="Usman"
                  className="bg-white shadow-xl rounded-lg p-6 sm:p-7 w-full max-w-4xl mx-auto"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    {/* Image Section */}
                    <div
                      className="flex items-center justify-center bg-white shadow-md rounded-xl w-32 h-32 sm:w-36 sm:h-36 mx-auto sm:mx-0"
                      onClick={() =>
                        navigate(`/software/${softwareSlug}/reviews/`, {
                          state: { software, categoryName: slug },
                        })
                      }
                    >
                      <img
                        src={software.imageUrl?.url || "/noimage.png"}
                        alt={software.name}
                        className="w-24 h-24 sm:w-28 sm:h-28"
                      />
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                      <h2 className="text-xl sm:text-2xl font-semibold text-[#20D3B4] pt-1">
                        {software.name}
                      </h2>
                      <div className="flex flex-col sm:flex-row sm:gap-12 mt-2 text-gray-600 text-sm">
                        <span>Tekpon Score</span>
                        <span>{software.score}</span>
                      </div>

                      {/* Score Progress Bar */}
                      <div className="flex items-center mt-2 space-x-3">
                        <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full">
                          <div
                            className="absolute h-full rounded-full"
                            style={{
                              width: `${(software.score / 10) * 100}%`,
                              background:
                                "linear-gradient(to right, #FFA500, #FF4500)",
                            }}
                          ></div>
                          <div
                            className="absolute bg-red-500 rounded-full shadow-md"
                            style={{
                              width: "10px",
                              height: "10px",
                              top: "-4px",
                              left: `${(software.score / 10) * 100}%`,
                              transform: "translateX(-50%)",
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Premium Seller Badge */}
                      <button className="flex items-center mt-4 space-x-2 px-4 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-teal-500 to-teal-800 hover:from-teal-600 hover:to-teal-400 shadow-md">
                        <span>PREMIUM SELLER</span>
                        <Info size={18} />
                      </button>
                    </div>

                    {/* Action Buttons Section */}
                    <div className="flex flex-col space-y-4 w-full sm:w-auto mt-4 sm:mt-0">
                      <button
                        onClick={() =>
                          navigate(`/software/${softwareSlug}/reviews/`, {
                            state: { software, categoryName: slug },
                          })
                        }
                        className="bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md px-6 py-2.5 cursor-pointer w-full text-center"
                      >
                        Visit Profile
                      </button>
                      <a
                        href={software.visitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-teal-500 hover:text-white text-teal-500 border-teal-500 border-2 rounded-md px-6 py-2 w-full text-center"
                      >
                        See Deal
                      </a>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="mt-6 mb-4 text-center sm:text-left">
                    <p className="text-gray-600 text-lg">
                      {software.description}&nbsp;
                      <a
                        href={software.visitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#20D3B4] hover:text-blue-700 font-medium text-lg"
                      >
                        Learn more about {software.name}
                      </a>
                    </p>
                  </div>

                  {/* Compare Checkbox Section */}
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mt-4">
                    <input
                      type="checkbox"
                      id={`compare-${index}`}
                      checked={selectedSoftware.some(
                        (s) => s.name === software.name
                      )}
                      onChange={() => toggleSelection(software)}
                      className="w-5 h-5 border-2 border-[#20D3B4] rounded-sm appearance-none ring-2 checked:bg-[#20D3B4] focus:ring-2 focus:ring-[#20D3B4] focus:outline-none checked:before:content-['✔'] checked:before:text-white checked:before:text-center checked:before:block checked:before:leading-5"
                    />
                    <label
                      htmlFor={`compare-${index}`}
                      className="text-[#20D3B4] font-medium text-md cursor-pointer"
                    >
                      COMPARE
                    </label>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600">No software available</p>
          )}

          {/* Modal for Selected Software */}
          {selectedSoftware.length > 0 && (
            <div className="fixed bottom-32 right-6 bg-white shadow-lg rounded-md p-4 w-24 sm:w-28 md:w-24">
              <div className="flex flex-col gap-3">
                {selectedSoftware.map((software) => (
                  <div
                    key={software.name}
                    className="relative bg-gray-100 rounded-md p-2 flex items-center justify-center"
                  >
                    <img
                      src={software.imageUrl?.url || "/noimage.png"}
                      alt={software.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 object-contain rounded-md"
                    />
                    <button
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                      onClick={() => removeSoftware(software.name)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleCompare}
                className="mt-4 w-full bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md text-center px-4 py-2 text-sm sm:text-base"
              >
                Go
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {sortedData.length > itemsPerPage && (
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#20D3B4] hover:bg-teal-500 text-white"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700 font-semibold mt-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#20D3B4] hover:bg-teal-500 text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center space-x-3 mb-4">
            <img
              // src={category?.imageUrl || "default-profile.png"}
              src={Profile}
              alt="Author"
              className="rounded-full w-10 h-10"
            />
            <p className="text-gray-700">
              by
              <span className="font-semibold">
                {category?.authors?.[0]?.name}
              </span>
              {category?.authors?.length > 1 && (
                <span className="font-semibold">
                  & {category.authors[1].name}
                </span>
              )}
              <span className="text-gray-500">
                {category?.authors?.[0]?.role}
              </span>
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsTOCOpen(!isTOCOpen)}
              >
                <div className="flex items-center space-x-2">
                  <List size={20} />
                  <h3 className="font-semibold text-lg">Table of Contents</h3>
                </div>
                {isTOCOpen ? (
                  <ChevronUp size={20} className="text-gray-600" />
                ) : (
                  <ChevronDown size={20} className="text-gray-600" />
                )}
              </div>

              {isTOCOpen && (
                <ul className="space-y-2 mt-3">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <button
                        className="text-[#20D3B4] hover:underline"
                        onClick={() => scrollToQuestion(item.id)}
                      >
                        {item.id}. {item.question}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Display All Questions and Answers */}
            <div className="mt-8 space-y-6">
              {tableOfContents.map((item) => (
                <div
                  key={item.id}
                  ref={(el) => (questionRefs.current[item.id] = el)}
                >
                  <h2 className="text-xl font-semibold">{item.question}</h2>
                  <div
                    className="mt-1 mb-2"
                    style={{
                      width: "60%",
                      height: "2px",
                      background:
                        "linear-gradient(to right, #20D3B4 0, #20D3B4 50%, transparent 100%)",
                    }}
                  ></div>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mt-8">
            <h2 className="text-2xl font-bold text-center mb-6">Authors</h2>

            {/* Responsive Author Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {category?.authors?.map((author, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 flex flex-col w-full"
                >
                  {/* Profile Image & Info */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start w-full gap-4">
                    <img
                      src={Profile}
                      alt={author.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-lg"
                    />
                    <div className="flex flex-col text-center sm:text-left">
                      <p className="text-sm text-gray-600 font-semibold">
                        {author.role}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold">
                        {author.name}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-md font-medium">
                        {author.workRole}
                      </p>

                      {/* Social Media Icons */}
                      <div className="flex justify-center sm:justify-start space-x-3 mt-3">
                        {author.socialLinks?.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.platform === "Twitter" && (
                              <FaXTwitter className="text-gray-700 text-2xl hover:text-blue-500 transition" />
                            )}
                            {link.platform === "Facebook" && (
                              <FaFacebook className="text-gray-700 text-2xl hover:text-blue-600 transition" />
                            )}
                            {link.platform === "LinkedIn" && (
                              <FaLinkedin className="text-gray-700 text-2xl hover:text-blue-700 transition" />
                            )}
                            {link.platform === "Tumblr" && (
                              <FaTumblr className="text-gray-700 text-2xl hover:text-blue-800 transition" />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Author Description */}
                  <p className="text-md font-semibold text-gray-800 mt-4 text-center sm:text-left">
                    {author.title}
                  </p>
                  <p className="text-gray-600 text-center sm:text-left mt-2">
                    {author.paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <InsightsCard />
        </div>
      </div>
    </>
  );
};

export default SingleCategory;
