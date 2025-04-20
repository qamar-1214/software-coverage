// import { useState, useRef } from "react";
// import Award from "../../assets/Award.webp";
// import Profile from "../../assets/Profile.jpg";
// import IntegrationImg from "../../assets/Insights.webp";
// import {
//   ChevronRight,
//   ChevronLeft,
//   List,
//   ChevronUp,
//   ChevronDown,
//   Info,
// } from "lucide-react";
// import { FaFacebook, FaTumblr, FaLinkedin, FaXTwitter } from "react-icons/fa6";
// import { useLocation } from "react-router-dom";

// const faqs = [
//   {
//     question: "How does PartnerStack work?",
//     answer:
//       "PartnerStack works by providing a seamless platform for managing affiliate and referral programs.",
//   },
//   {
//     question: "What does PartnerStack do?",
//     answer:
//       "PartnerStack helps businesses grow through partnerships, enabling automated partner onboarding, engagement, and payments.",
//   },
//   {
//     question: "How much does PartnerStack cost?",
//     answer:
//       "Pricing for PartnerStack varies based on the business needs and chosen subscription plan.",
//   },
//   {
//     question: "How to make money with PartnerStack?",
//     answer:
//       "You can earn money through PartnerStack by becoming an affiliate partner and generating commissions.",
//   },
// ];

// const authors = [
//   {
//     id: 1,
//     name: "Cristian Dina",
//     role: "Co-Founder & Managing",
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

// const categories = [
//   "Affiliate Software",
//   "Influencer Marketing Software",
//   "Lead Generation Software",
//   "Sales Acceleration Software",
// ];

// const alternativeProducts = [
//   { name: "Reditus", score: "9.2", logo: IntegrationImg },
//   { name: "impact.com", score: "9.3", logo: IntegrationImg },
//   { name: "Target Circle", score: "8.6", logo: IntegrationImg },
//   { name: "SEMrush", score: "9.1", logo: IntegrationImg },
//   { name: "Ahrefs", score: "8.9", logo: IntegrationImg },
//   { name: "Moz Pro", score: "8.4", logo: IntegrationImg },
// ];

// const products = [
//   {
//     name: "Reditus",
//     score: "9.2",
//     logo: IntegrationImg,
//   },
//   {
//     name: "impact.com",
//     score: "9.3",
//     logo: IntegrationImg,
//   },
//   {
//     name: "Target Circle",
//     score: "8.6",
//     logo: IntegrationImg,
//   },
//   {
//     name: "Reditus",
//     score: "9.2",
//     logo: IntegrationImg,
//   },
//   {
//     name: "impact.com",
//     score: "9.3",
//     logo: IntegrationImg,
//   },
//   {
//     name: "Target Circle",
//     score: "8.6",
//     logo: IntegrationImg,
//   },
// ];

// const integrations = [
//   { name: "Salesforce CRM", category: "CRM Software", logo: IntegrationImg },
//   { name: "HubSpot CRM", category: "CRM Software", logo: IntegrationImg },
//   {
//     name: "WooCommerce",
//     category: "eCommerce Software",
//     logo: IntegrationImg,
//   },
//   { name: "Unbounce", category: "Marketing Software", logo: IntegrationImg },
//   {
//     name: "Chargebee",
//     category: "Subscription Management",
//     logo: IntegrationImg,
//   },
// ];

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

// const productsAlternative = [
//   {
//     name: "Reditus",
//     score: "9.2",
//     logo: IntegrationImg,
//   },
//   {
//     name: "impact.com",
//     score: "9.3",
//     logo: IntegrationImg,
//   },
//   {
//     name: "Target Circle",
//     score: "8.6",
//     logo: IntegrationImg,
//   },
//   {
//     name: "Reditus",
//     score: "9.2",
//     logo: IntegrationImg,
//   },
//   {
//     name: "impact.com",
//     score: "9.3",
//     logo: IntegrationImg,
//   },
//   {
//     name: "Target Circle",
//     score: "8.6",
//     logo: IntegrationImg,
//   },
// ];

// const AssetInsider = () => {
//   const location = useLocation();
//   const software = location.state?.software;

//   const sectionsRef = {
//     overview: useRef(null),
//     pricing: useRef(null),
//     features: useRef(null),
//     globalBuzz: useRef(null),
//     compare: useRef(null),
//     reviews: useRef(null),
//     editorsReview: useRef(null),
//   };

//   const scrollToSection = (section) => {
//     sectionsRef[section].current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   const { categoryName } = location.state || {};

//   const tabContainerRef = useRef(null);

//   const scrollTabs = (direction) => {
//     if (tabContainerRef.current) {
//       const scrollAmount = 150; // Adjust scroll speed
//       tabContainerRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const [isExpanded, setIsExpanded] = useState(false);

//   const [isPricingOpen, setIsPricingOpen] = useState(false);
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
//   const [isAdditionalFeaturesOpen, setIsAdditionalFeaturesOpen] =
//     useState(false);

//   const [isOpen, setIsOpen] = useState(false);

//   const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);
//   const [showMore, setShowMore] = useState(false);

//   const [isComparisonOpen, setIsComparisonOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const featuredComparison = {
//     logo1: IntegrationImg,
//     logo2: IntegrationImg,
//     name: "PartnerStack vs impact.com",
//   };

//   const totalSlides = products.length;
//   const visibleSlides = 3;

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex + visibleSlides >= totalSlides ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? totalSlides - visibleSlides : prevIndex - 1
//     );
//   };

//   const [isReviewsOpen, setIsReviewsOpen] = useState(false);

//   const [isTOCOpen, setIsTOCOpen] = useState(false);

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

//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const [isOpenCategories, setIsOpenCategories] = useState(true);

//   const [isAlternativeOpen, setIsAlternativeOpen] = useState(false);
//   const [currentAlternativeIndex, setCurrentAlternativeIndex] = useState(0);

//   const totalAlternativeSlides = products.length;
//   const visibleAlternativeSlides = 3;

//   const nextAlternativeSlide = () => {
//     setCurrentAlternativeIndex((prevAlternativeIndex) =>
//       prevAlternativeIndex + visibleAlternativeSlides >= totalAlternativeSlides
//         ? 0
//         : prevAlternativeIndex + 1
//     );
//   };

//   const prevAlternativeSlide = () => {
//     setCurrentAlternativeIndex((prevAlternativeIndex) =>
//       prevAlternativeIndex === 0
//         ? totalAlternativeSlides - visibleAlternativeSlides
//         : prevAlternativeIndex - 1
//     );
//   };

//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

//   if (!software) {
//     return (
//       <h3 className="text-center text-red-500">Software data not found</h3>
//     );
//   }

//   return (
//     <>
//       <div className="bg-gray-100 pt-8">
//         <div className="w-full max-w-3xl mx-auto">
//           {categoryName && (
//             <>
//               <p className="flex items-center space-x-1 text-gray-700">
//                 <span>Home</span>
//                 <ChevronRight className="w-4 h-4 text-gray-400" />
//                 {categoryName && (
//                   <>
//                     <span>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</span>
//                     <ChevronRight className="w-4 h-4 text-gray-400" />
//                   </>
//                 )}
//                 <span>{software.name}</span>
//               </p>
//             </>
//           )}
//         </div>
//         <div className="bg-white shadow-xl rounded-lg p-7 w-full max-w-3xl mt-4 mx-auto">
//           <div className="flex flex-col sm:flex-row items-start">
//             {/* Software Image */}
//             <div className="flex items-center justify-center bg-white shadow-md rounded-xl w-36 h-36 mx-auto sm:mx-0">
//               <img
//                 src={software.imageUrl?.url || "/noimage.png"}
//                 alt={software.name}
//                 className="w-28 h-28 object-cover rounded-lg"
//               />
//             </div>

//             {/* Software Details */}
//             <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-left">
//               <h2 className="text-2xl font-semibold text-[#20D3B4] pt-1">
//                 {software.name}
//               </h2>

//               <div className="flex flex-col sm:flex-row sm:gap-12 mt-2">
//                 <span className="text-gray-600 text-sm">Tekpon Score</span>
//                 <span className="text-gray-600 text-sm">
//                   {software.score || "N/A"}
//                 </span>
//               </div>

//               {/* Score Bar */}
//               <div className="flex items-center mt-2 space-x-3">
//                 <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full">
//                   <div
//                     className="absolute h-full rounded-full"
//                     style={{
//                       width: `${(software.score / 10) * 100}%`,
//                       background: "linear-gradient(to right, #FFA500, #FF4500)",
//                     }}
//                   ></div>
//                   <div
//                     className="absolute bg-red-500 rounded-full shadow-md"
//                     style={{
//                       width: "10px",
//                       height: "10px",
//                       top: "-4px",
//                       left: `${(software.score / 10) * 100}%`,
//                       transform: "translateX(-50%)",
//                     }}
//                   ></div>
//                 </div>
//               </div>

//               {/* Premium Seller Badge */}
//               <button className="flex items-center mt-4 space-x-2 px-4 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-teal-500 to-teal-800 hover:from-teal-600 hover:to-teal-400 shadow-md">
//                 <span>PREMIUM SELLER</span>
//                 <Info size={18} />
//               </button>
//             </div>

//             <div className="flex flex-col space-y-6">
//               <button
//                 style={{ textDecoration: "none" }}
//                 target="_blank"
//                 className="mt-4 sm:mt-0 sm:ml-8 bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md px-8 py-2.5 cursor-pointer w-full sm:w-auto text-center"
//               >
//                 Free Demo
//               </button>
//               <a
//                 href={software.visitUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-4 sm:mt-0 sm:ml-8 hover:bg-red-500 hover:text-white text-red-500 border-red-500 cursor-pointer border-2 rounded-md px-8 py-2 w-full sm:w-auto text-center"
//               >
//                 Contact Software
//               </a>
//             </div>
//           </div>

//           {/* Name-based Tabs */}
//           <div className="relative w-full mt-4">
//             {/* Left Scroll Button */}
//             <button
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full z-10"
//               onClick={() => scrollTabs("left")}
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-600" />
//             </button>

//             {/* Scrollable Tabs */}
//             <div
//               ref={tabContainerRef}
//               className="flex overflow-x-auto space-x-4 ps-4 py-3 border-b scrollbar-hide"
//             >
//               {[
//                 "Overview",
//                 "Pricing",
//                 "Features",
//                 "Global Buzz",
//                 "Compare",
//                 "Reviews",
//                 "Editor's Review",
//                 "Overview",
//                 "Pricing",
//                 "Features",
//                 "Global Buzz",
//                 "Compare",
//                 "Reviews",
//                 "Editor's Review",
//               ].map((tab, index) => (
//                 <button
//                   key={index}
//                   onClick={() =>
//                     scrollToSection(tab.toLowerCase().replace(" ", ""))
//                   }
//                   className="text-sm font-medium px-3 py-2 cursor-pointer hover:text-blue-500 whitespace-nowrap"
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Right Scroll Button */}
//             <button
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full z-10"
//               onClick={() => scrollTabs("right")}
//             >
//               <ChevronRight className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         </div>
//         {/* First Section */}
//         <div
//           className="flex justify-center items-center bg-gray-100 p-4"
//           ref={sectionsRef.overview}
//         >
//           <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6">
//             <div className="flex justify-between items-start">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 PartnerStack Reviews & <br /> Product Details
//               </h2>
//               <div className="flex justify-center">
//                 <div>
//                   <span className="text-gray-600 font-semibold">
//                     Tekpon Awards
//                   </span>
//                   <div className="flex justify-center">
//                     <img
//                       src={Award}
//                       alt="Tekpon Award Badge"
//                       className="w-16 mt-2"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800">
//                 What is PartnerStack?
//               </h3>
//               <p className="text-gray-700 mt-2">
//                 PartnerStack is a comprehensive platform designed to empower
//                 businesses to grow through partnerships. It offers a unique
//                 blend of tools tailored for both companies and their partners,
//                 ensuring a seamless collaboration experience.
//               </p>
//               {isExpanded && (
//                 <p className="text-gray-700 mt-2">
//                   The platform's core functionality revolves around automating
//                   partner management, from onboarding to payouts, making it
//                   easier for businesses to scale.
//                 </p>
//               )}
//               <button
//                 className="text-blue-600 font-medium mt-2 focus:outline-none"
//                 onClick={() => setIsExpanded(!isExpanded)}
//               >
//                 {isExpanded ? "Read less ⬆" : "Read more ⬇"}
//               </button>
//             </div>
//             <div className="mt-6">
//               <h3 className="text-lg font-semibold text-gray-800">Best For</h3>
//               <p className="text-gray-700">
//                 Partner ecosystem platform of B2B SaaS.
//               </p>
//             </div>
//           </div>
//         </div>
//         {/* Second Section */}
//         <div
//           ref={sectionsRef.pricing}
//           className="flex flex-col items-center justify-center bg-gray-100 p-4 space-y-4"
//         >
//           <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4">
//             <div
//               className="flex items-center space-x-2 cursor-pointer"
//               onClick={() => setIsPricingOpen(!isPricingOpen)}
//             >
//               <span
//                 className={`transform transition-transform ${
//                   isPricingOpen ? "rotate-90" : ""
//                 }`}
//               >
//                 <ChevronRight />
//               </span>
//               <h3 className="font-bold text-lg">PartnerStack Pricing</h3>
//             </div>
//             {isPricingOpen && (
//               <div className="mt-4 text-gray-700">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-600 font-semibold">
//                       Starting from:
//                     </p>
//                     <p className="text-black font-bold">Custom</p>
//                     <p className="text-gray-600 font-semibold mt-2">
//                       Pricing Model: Subscription
//                     </p>
//                     <p className="flex items-center text-gray-600 mt-2">
//                       ❌ Free Trial
//                     </p>
//                     <p className="flex items-center text-gray-600">
//                       ❌ Free Version
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600 font-semibold">
//                       Pricing Details:
//                     </p>
//                     <p>
//                       PartnerStack pricing is fully customizable based on every
//                       business need. You will need to fill out a form and wait
//                       for them to contact you with the personalized quote. All
//                       plans include access to B2B-focused partners, automated
//                       partner payments, partner journey automation, and partner
//                       analytics.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="mt-4 flex justify-center">
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition">
//                     See All Pricing
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div
//           className="flex flex-col items-center justify-center bg-gray-100 p-4 space-y-4"
//           ref={sectionsRef.features}
//         >
//           <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4">
//             <div
//               className="flex items-center space-x-2 cursor-pointer"
//               onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
//             >
//               <span
//                 className={`transform transition-transform ${
//                   isFeaturesOpen ? "rotate-90" : ""
//                 }`}
//               >
//                 <ChevronRight />
//               </span>
//               <h3 className="font-bold text-lg">PartnerStack Features</h3>
//             </div>
//             {isFeaturesOpen && (
//               <>
//                 <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
//                   <ul>
//                     <li>Advocate Management</li>
//                     <li>Fraud Detection</li>
//                     <li>Conversion Tracking</li>
//                     <li>Banner Management</li>
//                     <li>Customer Segmentation</li>
//                     <li>Email Marketing</li>
//                     <li>Lead Management</li>
//                     <li>Performance Metrics</li>
//                     <li>Reporting & Statistics</li>
//                   </ul>
//                   <ul>
//                     <li>Affiliate Coupon Tracking</li>
//                     <li>Lead Engagement</li>
//                     <li>Analytics & Reporting</li>
//                     <li>Channel Management</li>
//                     <li>Customizable Reports</li>
//                     <li>Engagement Tracking</li>
//                     <li>Multi-Campaign</li>
//                     <li>ROI Tracking</li>
//                     <li>Social Media Integration</li>
//                   </ul>
//                   <ul>
//                     <li>Campaign Management</li>
//                     <li>Custom Links</li>
//                     <li>Rewards Management</li>
//                     <li>Commission Management</li>
//                     <li>Document Management</li>
//                     <li>Incentive Management</li>
//                     <li>Multi-Channel Marketing</li>
//                     <li>Referral Tracking</li>
//                     <li>Social Promotion</li>
//                   </ul>
//                 </div>
//                 <div className="text-center mt-4">
//                   <button
//                     className="text-blue-600 font-medium focus:outline-none"
//                     onClick={() =>
//                       setIsAdditionalFeaturesOpen(!isAdditionalFeaturesOpen)
//                     }
//                   >
//                     {isAdditionalFeaturesOpen
//                       ? "Show Less Features ⬆"
//                       : "Additional Features ⬇"}
//                   </button>
//                 </div>
//                 {isAdditionalFeaturesOpen && (
//                   <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
//                     <ul>
//                       <li>Customizable Branding</li>
//                       <li>Campaign Segmentation</li>
//                       <li>Contact Management</li>
//                       <li>Access Controls/Permissions</li>
//                       <li>Deal Management</li>
//                       <li>Lead Capture</li>
//                       <li>Alerts/Notifications</li>
//                       <li>Social Engagement</li>
//                       <li>Electronic Payments</li>
//                     </ul>
//                     <ul>
//                       <li>Referral Management</li>
//                       <li>Activity Tracking</li>
//                       <li>Customizable Templates</li>
//                       <li>Campaign Analytics</li>
//                       <li>Opportunity Management</li>
//                       <li>Partner Portal</li>
//                       <li>Real-Time Data</li>
//                       <li>Training Management</li>
//                       <li>Real-Time Monitoring</li>
//                     </ul>
//                     <ul>
//                       <li>API</li>
//                       <li>Employee Referral Management</li>
//                       <li>Fund Management</li>
//                       <li>Visual Analytics</li>
//                       <li>Gamification</li>
//                       <li>For Customer Referrals</li>
//                       <li>Content Management</li>
//                       <li>Third-Party Integrations</li>
//                       <li>Goal Setting/Tracking</li>
//                     </ul>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//         {/* Third Section */}
//         <div
//           className="flex flex-col items-center justify-center bg-gray-100 p-4"
//           ref={sectionsRef.globalBuzz}
//         >
//           {/* Main Card */}
//           <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
//             {/* Header Section */}
//             <div
//               className="flex items-center justify-between cursor-pointer"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               <div className="flex items-center space-x-2">
//                 <ChevronRight
//                   size={20}
//                   className={`transition-transform duration-200 ${
//                     isOpen ? "rotate-90" : ""
//                   }`}
//                 />
//                 <h3 className="font-bold text-lg">
//                   Global Buzz: PartnerStack at a glance
//                 </h3>
//               </div>
//             </div>

//             {/* Expanded Content */}
//             {isOpen && (
//               <div className="mt-4">
//                 {/* Score Section */}
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-purple-600 text-white flex items-center justify-center rounded-full text-xl font-bold shadow-md">
//                     4.7
//                   </div>
//                   <div>
//                     <p className="text-gray-600 font-semibold">
//                       Global Average Score
//                     </p>
//                     <p className="text-sm text-gray-500">⭐ Score: 4.7/5</p>
//                     <p className="text-sm text-gray-500">📝 Reviews: 2,423</p>
//                   </div>
//                 </div>

//                 {/* Content Sections */}
//                 <div className="grid grid-cols-2 gap-6 mt-6">
//                   {/* Left Column */}
//                   <div className="space-y-4">
//                     {[
//                       {
//                         title: "✔ Effective Partner Management",
//                         description:
//                           "PartnerStack streamlines collaboration with affiliates, making it easier to manage partner relationships.",
//                       },
//                       {
//                         title: "✔ User-Friendly Interface",
//                         description:
//                           "Users appreciate the intuitive design of PartnerStack, allowing quick setup and navigation.",
//                       },
//                       {
//                         title: "✔ Enhanced Revenue Opportunities",
//                         description:
//                           "PartnerStack boosts revenue streams by connecting businesses with potential partners.",
//                       },
//                       {
//                         title: "✔ Automation and Scalability",
//                         description:
//                           "PartnerStack automates repetitive tasks, saving time for businesses and partners.",
//                         highlight: true,
//                       },
//                       {
//                         title: "✔ Excellent Customer Support",
//                         description:
//                           "Users report positive experiences with PartnerStack's support team, with timely assistance.",
//                       },
//                     ].map((item, index) => (
//                       <div key={index}>
//                         <p
//                           className={`font-semibold ${
//                             item.highlight ? "text-blue-600 underline" : ""
//                           }`}
//                         >
//                           {item.title}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           {item.description}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Right Column (Issues) */}
//                   <div className="space-y-4">
//                     {[
//                       {
//                         title: "⚠ Account-Related Issues",
//                         description:
//                           "A few users encountered account setup issues, requiring additional documentation.",
//                       },
//                       {
//                         title: "⚠ Learning Curve for New Users",
//                         description:
//                           "The interface is user-friendly, but onboarding guidance could improve the experience.",
//                       },
//                       {
//                         title: "⚠ Limited Customization Options",
//                         description:
//                           "PartnerStack’s customization is great, but highly tailored partner programs may face limitations.",
//                       },
//                     ].map((item, index) => (
//                       <div
//                         key={index}
//                         className="bg-gray-100 p-4 rounded-md shadow-sm"
//                       >
//                         <p className="font-semibold">{item.title}</p>
//                         <p className="text-sm text-gray-600">
//                           {item.description}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Disclaimer Section */}
//                 <div className="mt-6 text-xs text-gray-500 border-t pt-2">
//                   📌 Disclaimer: These are aggregated user insights and may not
//                   reflect every experience.
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* Fourth Section */}
//         <div
//           className="flex flex-col items-center justify-center bg-gray-100 p-4"
//           ref={sectionsRef.compare}
//         >
//           {/* Main Card */}
//           <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
//             {/* Header Section */}
//             <div
//               className="flex items-center justify-between cursor-pointer"
//               onClick={() => setIsIntegrationsOpen(!isIntegrationsOpen)}
//             >
//               <div className="flex items-center space-x-2">
//                 <ChevronRight
//                   size={20}
//                   className={`transition-transform duration-200 ${
//                     isIntegrationsOpen ? "rotate-90" : ""
//                   }`}
//                 />
//                 <h3 className="font-bold text-lg">PartnerStack Integrations</h3>
//               </div>
//             </div>

//             {/* Expanded Content */}
//             {isIntegrationsOpen && (
//               <>
//                 <div className="grid grid-cols-3 gap-4 mt-4">
//                   {integrations
//                     .slice(0, showMore ? integrations.length : 3)
//                     .map((integration, index) => (
//                       <div
//                         key={index}
//                         className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
//                       >
//                         <img
//                           src={integration.logo}
//                           alt={integration.name}
//                           className="h-10 mb-2"
//                         />
//                         <p className="text-blue-600 font-semibold">
//                           {integration.name}
//                         </p>
//                         <p className="text-gray-500 text-sm">
//                           {integration.category}
//                         </p>
//                       </div>
//                     ))}
//                 </div>

//                 {/* Show More / Show Less Button */}
//                 <div className="text-center mt-4">
//                   <button
//                     className="text-purple-600 font-medium focus:outline-none"
//                     onClick={() => setShowMore(!showMore)}
//                   >
//                     {showMore ? "Read less ⬆" : "Read more ⬇"}
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         {/* Fifth Section */}
//         <div
//           className="flex flex-col items-center justify-center bg-gray-100 p-4"
//           ref={sectionsRef.reviews}
//         >
//           {/* Main Card */}
//           <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
//             {/* Header Section */}
//             <div
//               className="flex items-center justify-between cursor-pointer"
//               onClick={() => setIsComparisonOpen(!isComparisonOpen)}
//             >
//               <div className="flex items-center space-x-2">
//                 <ChevronRight
//                   size={20}
//                   className={`transition-transform duration-200 ${
//                     isComparisonOpen ? "rotate-90" : ""
//                   }`}
//                 />
//                 <h3 className="font-bold text-lg">
//                   PartnerStack vs. Similar Products
//                 </h3>
//               </div>
//             </div>

//             {/* Expanded Content */}
//             {isComparisonOpen && (
//               <>
//                 {/* Carousel Section */}
//                 <div className="relative w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//                   {/* Slider Section */}
//                   <div className="relative flex items-center">
//                     {/* Left Button */}
//                     <button
//                       className="absolute left-0 bg-gray-300 hover:bg-gray-400 p-2 rounded-full z-10"
//                       onClick={prevSlide}
//                     >
//                       <ChevronLeft size={20} />
//                     </button>

//                     {/* Product Cards Container */}
//                     <div className="flex overflow-hidden w-full justify-center">
//                       <div
//                         className="flex transition-transform duration-300 ease-in-out"
//                         style={{
//                           transform: `translateX(-${
//                             currentIndex * (100 / visibleSlides)
//                           }%)`,
//                         }}
//                       >
//                         {products.map((product, index) => (
//                           <div
//                             key={index}
//                             className="bg-white shadow-md rounded-lg p-4 w-64 flex items-center transition-transform duration-300 mx-2"
//                           >
//                             {/* Left Side - Logo */}
//                             <img
//                               src={product.logo}
//                               alt={product.name}
//                               className="h-12 w-12 object-contain mr-4"
//                             />

//                             {/* Right Side - Details */}
//                             <div className="flex flex-col flex-grow">
//                               {/* Product Name */}
//                               <p className="text-blue-600 font-semibold">
//                                 {product.name}
//                               </p>

//                               {/* Tekpon Score */}
//                               <div className="flex justify-between items-center w-full mt-1 text-gray-600 text-sm">
//                                 <p>Tekpon Score</p>
//                                 <p className="font-semibold">{product.score}</p>
//                               </div>

//                               {/* Score Progress Bar */}
//                               <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full mt-1">
//                                 <div
//                                   className="absolute h-full rounded-full"
//                                   style={{
//                                     width: `${(product.score / 10) * 100}%`,
//                                     background:
//                                       "linear-gradient(to right, #FFA500, #FF4500)",
//                                   }}
//                                 ></div>
//                                 <div
//                                   className="absolute bg-red-500 rounded-full shadow-md"
//                                   style={{
//                                     width: "10px",
//                                     height: "10px",
//                                     top: "-4px",
//                                     left: `${(product.score / 10) * 100}%`,
//                                     transform: "translateX(-50%)",
//                                   }}
//                                 ></div>
//                               </div>

//                               {/* Compare Checkbox */}
//                               <div className="flex items-center space-x-1 mt-2">
//                                 <input
//                                   type="checkbox"
//                                   className="accent-purple-600"
//                                 />
//                                 <p className="text-purple-600 text-sm font-medium">
//                                   COMPARE
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Right Button */}
//                     <button
//                       className="absolute right-0 bg-gray-300 hover:bg-gray-400 p-2 rounded-full z-10"
//                       onClick={nextSlide}
//                     >
//                       <ChevronRight size={20} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Featured Comparisons */}
//                 <div className="mt-6">
//                   <h3 className="font-semibold text-lg">
//                     PartnerStack Featured Comparisons
//                   </h3>
//                   <div className="bg-white shadow-md inline-block rounded-lg p-4 mt-4">
//                     <div className="flex items-center  space-x-4">
//                       <img
//                         src={featuredComparison.logo1}
//                         alt="PartnerStack"
//                         className="h-12 w-12"
//                       />
//                       <p className="text-gray-700 font-semibold text-xl">VS</p>
//                       <img
//                         src={featuredComparison.logo2}
//                         alt="impact.com"
//                         className="h-12 w-12"
//                       />
//                     </div>
//                     <p className="pt-3 text-blue-600 font-medium">
//                       {featuredComparison.name}
//                     </p>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         {/* Sixth Section */}
//         <div
//           className="flex flex-col items-center justify-center bg-gray-100 p-4"
//           ref={sectionsRef.editorsReview}
//         >
//           {/* Main Card */}
//           <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
//             {/* Header Section */}
//             <div
//               className="flex items-center justify-between cursor-pointer"
//               onClick={() => setIsReviewsOpen(!isReviewsOpen)}
//             >
//               <div className="flex items-center space-x-2">
//                 <ChevronRight
//                   size={20}
//                   className={`transition-transform duration-200 ${
//                     isReviewsOpen ? "rotate-90" : ""
//                   }`}
//                 />
//                 <h3 className="font-bold text-lg">PartnerStack Reviews</h3>
//               </div>
//             </div>

//             {/* Expanded Content */}
//             {isReviewsOpen && (
//               <div className="mt-4 text-center">
//                 <p className="text-gray-600">
//                   Tell us your opinion about{" "}
//                   <span className="font-semibold">PartnerStack</span> and help
//                   others.
//                 </p>
//                 <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition">
//                   Write a Review
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* Seven Section */}
//         <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
//           <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
//             <div className="flex items-center space-x-3 text-gray-700 text-sm">
//               {/* Reviewer Image */}
//               <img
//                 src={Profile}
//                 alt="Reviewer"
//                 className="w-8 h-8 rounded-full object-cover"
//               />

//               {/* Reviewer Details */}
//               <p>
//                 Reviewed by{" "}
//                 <span className="font-semibold">Ana Maria Stanciuc</span> &{" "}
//                 <span className="font-semibold">Alina Maria Stan</span>{" "}
//                 <span className="text-gray-500">(Editor)</span> on{" "}
//                 <span className="font-semibold">Jan 1st, ‘25</span>
//               </p>
//             </div>
//             <div className="mx-auto mt-4">
//               {/* Table of Contents */}
//               <div className="bg-white shadow-md rounded-lg p-4">
//                 <div
//                   className="flex justify-between items-center cursor-pointer"
//                   onClick={() => setIsTOCOpen(!isTOCOpen)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <List size={20} />
//                     <h3 className="font-semibold text-lg">Table of Contents</h3>
//                   </div>
//                   {isTOCOpen ? (
//                     <ChevronUp size={20} className="text-gray-600" />
//                   ) : (
//                     <ChevronDown size={20} className="text-gray-600" />
//                   )}
//                 </div>

//                 {isTOCOpen && (
//                   <ul className="space-y-2 mt-3">
//                     {tableOfContents.map((item) => (
//                       <li key={item.id}>
//                         <button
//                           className="text-[#20D3B4] hover:underline"
//                           onClick={() => scrollToQuestion(item.id)}
//                         >
//                           {item.id}. {item.question}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>

//               {/* Display All Questions and Answers */}
//               <div className="mt-8 space-y-6">
//                 {tableOfContents.map((item) => (
//                   <div
//                     key={item.id}
//                     ref={(el) => (questionRefs.current[item.id] = el)}
//                   >
//                     <h2 className="text-xl font-semibold">{item.question}</h2>
//                     <div
//                       className="mt-1 mb-2"
//                       style={{
//                         width: "60%",
//                         height: "2px",
//                         background:
//                           "linear-gradient(to right, #20D3B4 0, #20D3B4 50%, transparent 100%)",
//                       }}
//                     ></div>
//                     <p className="text-gray-700">{item.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="w-full mx-auto bg-white shadow-lg mt-10 rounded-lg p-6">
//               {/* Header */}
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 PartnerStack Frequently Asked Questions (FAQs)
//               </h2>
//               <div
//                 className="mt-1 mb-2"
//                 style={{
//                   width: "60%",
//                   height: "2px",
//                   background:
//                     "linear-gradient(to right, #20D3B4 0, #20D3B4 50%, transparent 100%)",
//                 }}
//               ></div>

//               {/* FAQ List */}
//               <div className="space-y-3">
//                 {faqs.map((faq, index) => (
//                   <div key={index} className="bg-white shadow-md rounded-lg">
//                     <button
//                       className="w-full flex justify-between items-center p-4 font-medium text-gray-800 text-left focus:outline-none"
//                       onClick={() => toggleFAQ(index)}
//                     >
//                       {faq.question}
//                       {openIndex === index ? (
//                         <ChevronUp size={20} />
//                       ) : (
//                         <ChevronDown size={20} />
//                       )}
//                     </button>
//                     {openIndex === index && (
//                       <div className="p-4 text-gray-600 border-t border-gray-200">
//                         {faq.answer}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Eight Section */}
//         <div className="flex flex-col items-center justify-center bg-gray-100">
//           <div className="w-full max-w-3xl">
//             <h2 className="text-2xl font-bold text-center mb-6">Authors</h2>
//             <div className="flex flex-col sm:flex-row gap-6">
//               {authors.map(
//                 (
//                   author,
//                   index // Added index here
//                 ) => (
//                   <div
//                     key={index} // Now, index is correctly defined
//                     className="bg-white shadow-md rounded-lg p-6 flex flex-col w-full sm:w-1/2"
//                   >
//                     <div className="flex items-center w-full sm:w-96 space-x-6">
//                       {/* Profile Image */}
//                       <img
//                         src={author.image}
//                         alt={author.name}
//                         className="w-28 h-28 rounded-full object-cover shadow-lg"
//                       />

//                       {/* Text Content */}
//                       <div className="flex flex-col text-left">
//                         <p className="text-sm text-gray-600 font-semibold">
//                           {author.type}
//                         </p>
//                         <h3 className="text-2xl font-bold">{author.name}</h3>
//                         <p className="text-gray-600 text-md font-medium">
//                           {author.role}
//                         </p>

//                         {/* Social Media Icons */}
//                         <div className="flex space-x-3 mt-3">
//                           {author.socialLinks.map((Icon, index) => (
//                             <Icon
//                               key={index}
//                               className="text-gray-700 bg-gray-200 text-4xl p-2 rounded-md hover:bg-gray-300 cursor-pointer"
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     <p className="text-md text-left font-semibold text-gray-800 mt-4">
//                       {author.designation}
//                     </p>
//                     <p className="text-gray-600 text-left mt-2">
//                       {author.description}
//                     </p>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//         {/* Nineth Section */}
//         <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
//           {/* Main Card */}
//           <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
//             {/* Header Section */}
//             <div
//               className="flex items-center justify-between cursor-pointer"
//               onClick={() => setIsAlternativeOpen(!isAlternativeOpen)}
//             >
//               <div className="flex items-center space-x-2">
//                 <ChevronRight
//                   size={20}
//                   className={`transition-transform duration-200 ${
//                     isAlternativeOpen ? "rotate-90" : ""
//                   }`}
//                 />
//                 <h3 className="font-bold text-lg">
//                   PartnerStack vs. Similar Products
//                 </h3>
//               </div>
//             </div>

//             {/* Expanded Content */}
//             {isAlternativeOpen && (
//               <>
//                 {/* Carousel Section */}
//                 <div className="relative w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//                   {/* Slider Section */}
//                   <div className="relative flex items-center">
//                     {/* Left Button */}
//                     <button
//                       className="absolute left-0 bg-gray-300 hover:bg-gray-400 p-2 rounded-full z-10"
//                       onClick={prevAlternativeSlide}
//                     >
//                       <ChevronLeft size={20} />
//                     </button>

//                     {/* Product Cards Container */}
//                     <div className="flex overflow-hidden w-full justify-center">
//                       <div
//                         className="flex transition-transform duration-300 ease-in-out"
//                         style={{
//                           transform: `translateX(-${
//                             currentAlternativeIndex *
//                             (100 / visibleAlternativeSlides)
//                           }%)`,
//                         }}
//                       >
//                         {productsAlternative.map((product, index) => (
//                           <div
//                             key={index}
//                             className="bg-white shadow-md rounded-lg p-4 w-64 flex items-center transition-transform duration-300 mx-2"
//                           >
//                             {/* Left Side - Logo */}
//                             <img
//                               src={product.logo}
//                               alt={product.name}
//                               className="h-12 w-12 object-contain mr-4"
//                             />

//                             {/* Right Side - Details */}
//                             <div className="flex flex-col flex-grow">
//                               {/* Product Name */}
//                               <p className="text-blue-600 font-semibold">
//                                 {product.name}
//                               </p>

//                               {/* Tekpon Score */}
//                               <div className="flex justify-between items-center w-full mt-1 text-gray-600 text-sm">
//                                 <p>Tekpon Score</p>
//                                 <p className="font-semibold">{product.score}</p>
//                               </div>

//                               {/* Score Progress Bar */}
//                               <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full mt-1">
//                                 <div
//                                   className="absolute h-full rounded-full"
//                                   style={{
//                                     width: `${(product.score / 10) * 100}%`,
//                                     background:
//                                       "linear-gradient(to right, #FFA500, #FF4500)",
//                                   }}
//                                 ></div>
//                                 <div
//                                   className="absolute bg-red-500 rounded-full shadow-md"
//                                   style={{
//                                     width: "10px",
//                                     height: "10px",
//                                     top: "-4px",
//                                     left: `${(product.score / 10) * 100}%`,
//                                     transform: "translateX(-50%)",
//                                   }}
//                                 ></div>
//                               </div>

//                               {/* Compare Checkbox */}
//                               <div className="flex items-center space-x-1 mt-2">
//                                 <input
//                                   type="checkbox"
//                                   className="accent-purple-600"
//                                 />
//                                 <p className="text-purple-600 text-sm font-medium">
//                                   COMPARE
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Right Button */}
//                     <button
//                       className="absolute right-0 bg-gray-300 hover:bg-gray-400 p-2 rounded-full z-10"
//                       onClick={nextAlternativeSlide}
//                     >
//                       <ChevronRight size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         {/* Tenth Section */}
//         <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
//           <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
//             {/* Header Section */}
//             <button
//               className="w-full flex items-center justify-between font-semibold text-gray-800 text-lg focus:outline-none"
//               onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
//             >
//               <div className="flex items-center space-x-2">
//                 {isCategoriesOpen ? (
//                   <ChevronUp size={20} />
//                 ) : (
//                   <ChevronDown size={20} />
//                 )}
//                 <p>PartnerStack is Found in these Categories</p>
//               </div>
//             </button>

//             {/* Categories List */}
//             {isCategoriesOpen && (
//               <div className="mt-3">
//                 <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-700 text-sm">
//                   {categories.map((category, index) => (
//                     <p key={index} className="whitespace-nowrap">
//                       {category}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AssetInsider;





















import { useState, useRef } from "react";
import Award from "../../assets/Award.webp";
import Profile from "../../assets/Profile.jpg";
import IntegrationImg from "../../assets/Insights.webp";
import {
  ChevronRight,
  ChevronLeft,
  List,
  ChevronUp,
  ChevronDown,
  Info,
} from "lucide-react";
import { FaFacebook, FaTumblr, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const faqs = [
  {
    question: "How does PartnerStack work?",
    answer:
      "PartnerStack works by providing a seamless platform for managing affiliate and referral programs.",
  },
  {
    question: "What does PartnerStack do?",
    answer:
      "PartnerStack helps businesses grow through partnerships, enabling automated partner onboarding, engagement, and payments.",
  },
  {
    question: "How much does PartnerStack cost?",
    answer:
      "Pricing for PartnerStack varies based on the business needs and chosen subscription plan.",
  },
  {
    question: "How to make money with PartnerStack?",
    answer:
      "You can earn money through PartnerStack by becoming an affiliate partner and generating commissions.",
  },
];

const authors = [
  {
    id: 1,
    name: "Cristian Dina",
    role: "Co-Founder & Managing",
    designation: "Managing Partner & SaaS Podcast Host @ Tekpon",
    description:
      "As one of the founding members of Tekpon, Cristian has worn many hats within the company, but perhaps none shines brighter than his role as the charismatic host of the Tekpon SaaS Podcast. Cristian is a community builder at heart, being the Bucharest city leader for SaaStock Local and the author of the best-selling book King of Networking.",
    image: Profile, // Replace with actual image
    type: "Writer",
    socialLinks: [FaTumblr, FaLinkedin, FaFacebook, FaXTwitter],
  },
  {
    id: 2,
    name: "Alina Maria Stan",
    role: "COO & Co-Founder @ Tekpon",
    designation: "Lead Generation Master & Affiliation Strategist",
    description:
      "Alina Maria Stan is the COO and Co-Founder of Tekpon, where she has utilized her expertise in SaaS, software promotion, and lead generation since July 2020. Her role involves media buying and extensive software branding, contributing significantly to Tekpon's market presence.",
    image: Profile, // Replace with actual image
    type: "Expert",
    socialLinks: [FaTumblr, FaLinkedin],
  },
];

const categories = [
  "Affiliate Software",
  "Influencer Marketing Software",
  "Lead Generation Software",
  "Sales Acceleration Software",
];

const alternativeProducts = [
  { name: "Reditus", score: "9.2", logo: IntegrationImg },
  { name: "impact.com", score: "9.3", logo: IntegrationImg },
  { name: "Target Circle", score: "8.6", logo: IntegrationImg },
  { name: "SEMrush", score: "9.1", logo: IntegrationImg },
  { name: "Ahrefs", score: "8.9", logo: IntegrationImg },
  { name: "Moz Pro", score: "8.4", logo: IntegrationImg },
];

const products = [
  {
    name: "Reditus",
    score: "9.2",
    logo: IntegrationImg,
  },
  {
    name: "impact.com",
    score: "9.3",
    logo: IntegrationImg,
  },
  {
    name: "Target Circle",
    score: "8.6",
    logo: IntegrationImg,
  },
  {
    name: "Reditus",
    score: "9.2",
    logo: IntegrationImg,
  },
  {
    name: "impact.com",
    score: "9.3",
    logo: IntegrationImg,
  },
  {
    name: "Target Circle",
    score: "8.6",
    logo: IntegrationImg,
  },
];

const integrations = [
  { name: "Salesforce CRM", category: "CRM Software", logo: IntegrationImg },
  { name: "HubSpot CRM", category: "CRM Software", logo: IntegrationImg },
  {
    name: "WooCommerce",
    category: "eCommerce Software",
    logo: IntegrationImg,
  },
  { name: "Unbounce", category: "Marketing Software", logo: IntegrationImg },
  {
    name: "Chargebee",
    category: "Subscription Management",
    logo: IntegrationImg,
  },
];

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

const productsAlternative = [
  {
    name: "Reditus",
    score: "9.2",
    logo: IntegrationImg,
  },
  {
    name: "impact.com",
    score: "9.3",
    logo: IntegrationImg,
  },
  {
    name: "Target Circle",
    score: "8.6",
    logo: IntegrationImg,
  },
  {
    name: "Reditus",
    score: "9.2",
    logo: IntegrationImg,
  },
  {
    name: "impact.com",
    score: "9.3",
    logo: IntegrationImg,
  },
  {
    name: "Target Circle",
    score: "8.6",
    logo: IntegrationImg,
  },
];

const AssetInsider = () => {
  const location = useLocation();
  const software = location.state?.software;

  const sectionsRef = {
    overview: useRef(null),
    pricing: useRef(null),
    features: useRef(null),
    globalBuzz: useRef(null),
    compare: useRef(null),
    reviews: useRef(null),
    editorsReview: useRef(null),
  };

  const scrollToSection = (section) => {
    sectionsRef[section].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const { categoryName } = location.state || {};

  const tabContainerRef = useRef(null);

  const scrollTabs = (direction) => {
    if (tabContainerRef.current) {
      const scrollAmount = 150; // Adjust scroll speed
      tabContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isAdditionalFeaturesOpen, setIsAdditionalFeaturesOpen] =
    useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredComparison = {
    logo1: IntegrationImg,
    logo2: IntegrationImg,
    name: "PartnerStack vs impact.com",
  };

  const totalSlides = products.length;
  const visibleSlides = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleSlides >= totalSlides ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - visibleSlides : prevIndex - 1
    );
  };

  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  const [isTOCOpen, setIsTOCOpen] = useState(false);

  const questionRefs = useRef({}); // Store references to each question section

  // Function to smoothly scroll to the selected question without shifting it to the top
  const scrollToQuestion = (id) => {
    if (questionRefs.current[id]) {
      questionRefs.current[id].scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Ensures scrolling without shifting content to top
        inline: "nearest",
      });
    }
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [isOpenCategories, setIsOpenCategories] = useState(true);

  const [isAlternativeOpen, setIsAlternativeOpen] = useState(false);
  const [currentAlternativeIndex, setCurrentAlternativeIndex] = useState(0);

  const totalAlternativeSlides = products.length;
  const visibleAlternativeSlides = 3;

  const nextAlternativeSlide = () => {
    setCurrentAlternativeIndex((prevAlternativeIndex) =>
      prevAlternativeIndex + visibleAlternativeSlides >= totalAlternativeSlides
        ? 0
        : prevAlternativeIndex + 1
    );
  };

  const prevAlternativeSlide = () => {
    setCurrentAlternativeIndex((prevAlternativeIndex) =>
      prevAlternativeIndex === 0
        ? totalAlternativeSlides - visibleAlternativeSlides
        : prevAlternativeIndex - 1
    );
  };

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  if (!software) {
    return (
      <h3 className="text-center text-red-500">Software data not found</h3>
    );
  }

  return (
    <>
      <div className="bg-gray-100 pt-8">
        <div className="w-full max-w-3xl mx-auto px-4">
          {categoryName && (
            <p className="flex flex-wrap items-center space-x-1 text-gray-700 text-sm sm:text-base">
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {categoryName && (
                <>
                  <span>
                    {categoryName.charAt(0).toUpperCase() +
                      categoryName.slice(1)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </>
              )}
              <span>{software.name}</span>
            </p>
          )}
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-7 w-full max-w-3xl mt-4 mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Software Image */}
            <div className="flex items-center justify-center bg-white shadow-md rounded-xl w-32 h-32 sm:w-36 sm:h-36">
              <img
                src={software.imageUrl?.url || "/noimage.png"}
                alt={software.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
              />
            </div>

            {/* Software Details */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#20D3B4] pt-1">
                {software.name}
              </h2>
              <div className="flex flex-col sm:flex-row sm:gap-12 mt-2 text-sm sm:text-base text-gray-600">
                <span>Tekpon Score</span>
                <span>{software.score || "N/A"}</span>
              </div>

              {/* Score Bar */}
              <div className="flex items-center mt-2 space-x-3">
                <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full">
                  <div
                    className="absolute h-full rounded-full"
                    style={{
                      width: `${(software.score / 10) * 100}%`,
                      background: "linear-gradient(to right, #FFA500, #FF4500)",
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
              <button className="flex items-center justify-center sm:justify-start mt-4 space-x-2 px-4 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-teal-500 to-teal-800 hover:from-teal-600 hover:to-teal-400 shadow-md">
                <span>PREMIUM SELLER</span>
                <Info size={18} />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col w-full sm:w-auto gap-4">
              <button
                style={{ textDecoration: "none" }}
                target="_blank"
                className="bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md px-6 py-2 cursor-pointer w-full sm:w-auto text-center"
              >
                Free Demo
              </button>
              <a
                href={software.visitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-red-500 hover:text-white text-red-500 border-red-500 border-2 rounded-md px-6 py-2 w-full sm:w-auto text-center"
              >
                Contact Software
              </a>
            </div>
          </div>

          {/* Name-based Tabs */}
          <div className="relative w-full mt-6">
            {/* Left Scroll Button */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-1 z-10 hidden sm:flex"
              onClick={() => scrollTabs("left")}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Scrollable Tabs */}
            <div
              ref={tabContainerRef}
              className="flex overflow-x-auto space-x-4 ps-4 py-3 border-b scrollbar-hide"
            >
              {[
                "Overview",
                "Pricing",
                "Features",
                "Global Buzz",
                "Compare",
                "Reviews",
                "Editor's Review",
                "Overview",
                "Pricing",
                "Features",
                "Global Buzz",
                "Compare",
                "Reviews",
                "Editor's Review",
              ].map((tab, index) => (
                <button
                  key={index}
                  onClick={() =>
                    scrollToSection(tab.toLowerCase().replace(" ", ""))
                  }
                  className="text-sm font-medium px-3 py-2 cursor-pointer hover:text-blue-500 whitespace-nowrap"
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-1 z-10 hidden sm:flex"
              onClick={() => scrollTabs("right")}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* First Section */}
        <div className="flex justify-center items-center bg-gray-100 p-4">
          <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
                PartnerStack Reviews & <br className="hidden sm:block" />
                Product Details
              </h2>

              {/* Tekpon Awards Section */}
              <div className="flex flex-col items-center sm:items-end">
                <span className="text-gray-600 font-semibold">
                  Tekpon Awards
                </span>
                <img
                  src={Award}
                  alt="Tekpon Award Badge"
                  className="w-14 sm:w-16 mt-2"
                />
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
                What is PartnerStack?
              </h3>
              <p className="text-gray-700 mt-2 text-center sm:text-left">
                PartnerStack is a comprehensive platform designed to empower
                businesses to grow through partnerships. It offers a unique
                blend of tools tailored for both companies and their partners,
                ensuring a seamless collaboration experience.
              </p>
              {isExpanded && (
                <p className="text-gray-700 mt-2 text-center sm:text-left">
                  The platform's core functionality revolves around automating
                  partner management, from onboarding to payouts, making it
                  easier for businesses to scale.
                </p>
              )}
              <div className="text-center sm:text-left">
                <button
                  className="text-blue-600 font-medium mt-2 focus:outline-none hover:underline"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Read less ⬆" : "Read more ⬇"}
                </button>
              </div>
            </div>

            {/* Best For Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
                Best For
              </h3>
              <p className="text-gray-700 text-center sm:text-left">
                Partner ecosystem platform of B2B SaaS.
              </p>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div
          ref={sectionsRef.pricing}
          className="flex flex-col items-center justify-center bg-gray-100 p-4 space-y-4"
        >
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4">
            {/* Pricing Header with Expand/Collapse */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setIsPricingOpen(!isPricingOpen)}
            >
              <span
                className={`transform transition-transform ${
                  isPricingOpen ? "rotate-90" : ""
                }`}
              >
                <ChevronRight />
              </span>
              <h3 className="font-bold text-lg sm:text-xl">
                PartnerStack Pricing
              </h3>
            </div>

            {/* Pricing Content (Shown when expanded) */}
            {isPricingOpen && (
              <div className="mt-4 text-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left Section: Pricing Model */}
                  <div className="text-center sm:text-left">
                    <p className="text-gray-600 font-semibold">
                      Starting from:
                    </p>
                    <p className="text-black font-bold">Custom</p>
                    <p className="text-gray-600 font-semibold mt-2">
                      Pricing Model: Subscription
                    </p>
                    <p className="flex justify-center sm:justify-start items-center text-gray-600 mt-2">
                      ❌ Free Trial
                    </p>
                    <p className="flex justify-center sm:justify-start items-center text-gray-600">
                      ❌ Free Version
                    </p>
                  </div>

                  {/* Right Section: Pricing Details */}
                  <div className="text-center sm:text-left">
                    <p className="text-gray-600 font-semibold">
                      Pricing Details:
                    </p>
                    <p className="text-sm sm:text-base">
                      PartnerStack pricing is fully customizable based on every
                      business need. You will need to fill out a form and wait
                      for them to contact you with a personalized quote. All
                      plans include access to B2B-focused partners, automated
                      partner payments, partner journey automation, and partner
                      analytics.
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-4 flex justify-center">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition">
                    See All Pricing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center bg-gray-100 p-4 space-y-4"
          ref={sectionsRef.features}
        >
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4">
            {/* Features Header with Expand/Collapse */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
            >
              <span
                className={`transform transition-transform ${
                  isFeaturesOpen ? "rotate-90" : ""
                }`}
              >
                <ChevronRight />
              </span>
              <h3 className="font-bold text-lg sm:text-xl">
                PartnerStack Features
              </h3>
            </div>

            {/* Features Content (Shown when expanded) */}
            {isFeaturesOpen && (
              <>
                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-gray-700">
                  <ul className="space-y-2">
                    <li>Advocate Management</li>
                    <li>Fraud Detection</li>
                    <li>Conversion Tracking</li>
                    <li>Banner Management</li>
                    <li>Customer Segmentation</li>
                    <li>Email Marketing</li>
                    <li>Lead Management</li>
                    <li>Performance Metrics</li>
                    <li>Reporting & Statistics</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>Affiliate Coupon Tracking</li>
                    <li>Lead Engagement</li>
                    <li>Analytics & Reporting</li>
                    <li>Channel Management</li>
                    <li>Customizable Reports</li>
                    <li>Engagement Tracking</li>
                    <li>Multi-Campaign</li>
                    <li>ROI Tracking</li>
                    <li>Social Media Integration</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>Campaign Management</li>
                    <li>Custom Links</li>
                    <li>Rewards Management</li>
                    <li>Commission Management</li>
                    <li>Document Management</li>
                    <li>Incentive Management</li>
                    <li>Multi-Channel Marketing</li>
                    <li>Referral Tracking</li>
                    <li>Social Promotion</li>
                  </ul>
                </div>

                {/* Show More / Less Button */}
                <div className="text-center mt-4">
                  <button
                    className="text-blue-600 font-medium focus:outline-none hover:underline"
                    onClick={() =>
                      setIsAdditionalFeaturesOpen(!isAdditionalFeaturesOpen)
                    }
                  >
                    {isAdditionalFeaturesOpen
                      ? "Show Less Features ⬆"
                      : "Additional Features ⬇"}
                  </button>
                </div>

                {/* Additional Features (Shown when expanded) */}
                {isAdditionalFeaturesOpen && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-gray-700">
                    <ul className="space-y-2">
                      <li>Customizable Branding</li>
                      <li>Campaign Segmentation</li>
                      <li>Contact Management</li>
                      <li>Access Controls/Permissions</li>
                      <li>Deal Management</li>
                      <li>Lead Capture</li>
                      <li>Alerts/Notifications</li>
                      <li>Social Engagement</li>
                      <li>Electronic Payments</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>Referral Management</li>
                      <li>Activity Tracking</li>
                      <li>Customizable Templates</li>
                      <li>Campaign Analytics</li>
                      <li>Opportunity Management</li>
                      <li>Partner Portal</li>
                      <li>Real-Time Data</li>
                      <li>Training Management</li>
                      <li>Real-Time Monitoring</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>API</li>
                      <li>Employee Referral Management</li>
                      <li>Fund Management</li>
                      <li>Visual Analytics</li>
                      <li>Gamification</li>
                      <li>For Customer Referrals</li>
                      <li>Content Management</li>
                      <li>Third-Party Integrations</li>
                      <li>Goal Setting/Tracking</li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Third Section */}
        <div
          className="flex flex-col items-center justify-center bg-gray-100 p-4"
          ref={sectionsRef.globalBuzz}
        >
          {/* Main Card */}
          <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
            {/* Header Section */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center space-x-2">
                <ChevronRight
                  size={20}
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
                <h3 className="font-bold text-lg sm:text-xl">
                  Global Buzz: PartnerStack at a glance
                </h3>
              </div>
            </div>

            {/* Expanded Content */}
            {isOpen && (
              <div className="mt-4">
                {/* Score Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 h-12 bg-purple-600 text-white flex items-center justify-center rounded-full text-xl font-bold shadow-md">
                    4.7
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-gray-600 font-semibold">
                      Global Average Score
                    </p>
                    <p className="text-sm text-gray-500">⭐ Score: 4.7/5</p>
                    <p className="text-sm text-gray-500">📝 Reviews: 2,423</p>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  {/* Left Column (Positives) */}
                  <div className="space-y-4">
                    {[
                      {
                        title: "✔ Effective Partner Management",
                        description:
                          "PartnerStack streamlines collaboration with affiliates, making it easier to manage partner relationships.",
                      },
                      {
                        title: "✔ User-Friendly Interface",
                        description:
                          "Users appreciate the intuitive design of PartnerStack, allowing quick setup and navigation.",
                      },
                      {
                        title: "✔ Enhanced Revenue Opportunities",
                        description:
                          "PartnerStack boosts revenue streams by connecting businesses with potential partners.",
                      },
                      {
                        title: "✔ Automation and Scalability",
                        description:
                          "PartnerStack automates repetitive tasks, saving time for businesses and partners.",
                        highlight: true,
                      },
                      {
                        title: "✔ Excellent Customer Support",
                        description:
                          "Users report positive experiences with PartnerStack's support team, with timely assistance.",
                      },
                    ].map((item, index) => (
                      <div key={index}>
                        <p
                          className={`font-semibold ${
                            item.highlight ? "text-blue-600 underline" : ""
                          }`}
                        >
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Right Column (Issues) */}
                  <div className="space-y-4">
                    {[
                      {
                        title: "⚠ Account-Related Issues",
                        description:
                          "A few users encountered account setup issues, requiring additional documentation.",
                      },
                      {
                        title: "⚠ Learning Curve for New Users",
                        description:
                          "The interface is user-friendly, but onboarding guidance could improve the experience.",
                      },
                      {
                        title: "⚠ Limited Customization Options",
                        description:
                          "PartnerStack’s customization is great, but highly tailored partner programs may face limitations.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-4 rounded-md shadow-sm"
                      >
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer Section */}
                <div className="mt-6 text-xs text-gray-500 border-t pt-2 text-center sm:text-left">
                  📌 Disclaimer: These are aggregated user insights and may not
                  reflect every experience.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fourth Section */}
        <div
          className="flex flex-col items-center justify-center bg-gray-100 p-4"
          ref={sectionsRef.compare}
        >
          {/* Main Card */}
          <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
            {/* Header Section */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsIntegrationsOpen(!isIntegrationsOpen)}
            >
              <div className="flex items-center space-x-2">
                <ChevronRight
                  size={20}
                  className={`transition-transform duration-200 ${
                    isIntegrationsOpen ? "rotate-90" : ""
                  }`}
                />
                <h3 className="font-bold text-lg sm:text-xl">
                  PartnerStack Integrations
                </h3>
              </div>
            </div>

            {/* Expanded Content */}
            {isIntegrationsOpen && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {integrations
                    .slice(0, showMore ? integrations.length : 3)
                    .map((integration, index) => (
                      <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
                      >
                        <img
                          src={integration.logo}
                          alt={integration.name}
                          className="h-10 mb-2"
                        />
                        <p className="text-blue-600 font-semibold">
                          {integration.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {integration.category}
                        </p>
                      </div>
                    ))}
                </div>

                {/* Show More / Show Less Button */}
                <div className="text-center mt-4">
                  <button
                    className="text-purple-600 font-medium focus:outline-none hover:underline"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Read less ⬆" : "Read more ⬇"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Fifth Section */}
        <div
          className="flex flex-col items-center justify-center bg-gray-100 p-4"
          ref={sectionsRef.reviews}
        >
          {/* Main Card */}
          <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
            {/* Header Section */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsComparisonOpen(!isComparisonOpen)}
            >
              <div className="flex items-center space-x-2">
                <ChevronRight
                  size={20}
                  className={`transition-transform duration-200 ${
                    isComparisonOpen ? "rotate-90" : ""
                  }`}
                />
                <h3 className="font-bold text-lg sm:text-xl">
                  PartnerStack vs. Similar Products
                </h3>
              </div>
            </div>

            {/* Expanded Content */}
            {isComparisonOpen && (
              <>
                {/* Carousel Section */}
                <div className="relative w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                  {/* Slider Section */}
                  <div className="relative flex items-center">
                    {/* Left Button */}
                    <button
                      className="absolute left-0 bg-gray-300 hover:bg-gray-400 p-2 rounded-full z-10"
                      onClick={prevSlide}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* Product Cards Container */}
                    <div className="flex overflow-hidden w-full justify-center">
                      <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                          transform: `translateX(-${
                            currentIndex * (100 / visibleSlides)
                          }%)`,
                        }}
                      >
                        {products.map((product, index) => (
                          <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-4 w-64 flex flex-col items-center sm:flex-row transition-transform duration-300 mx-2"
                          >
                            {/* Logo */}
                            <img
                              src={product.logo}
                              alt={product.name}
                              className="h-12 w-12 object-contain sm:mr-4"
                            />

                            {/* Product Details */}
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-grow">
                              {/* Product Name */}
                              <p className="text-blue-600 font-semibold">
                                {product.name}
                              </p>

                              {/* Tekpon Score */}
                              <div className="flex justify-between items-center w-full mt-1 text-gray-600 text-sm">
                                <p>Tekpon Score</p>
                                <p className="font-semibold">{product.score}</p>
                              </div>

                              {/* Score Progress Bar */}
                              <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full mt-1">
                                <div
                                  className="absolute h-full rounded-full"
                                  style={{
                                    width: `${(product.score / 10) * 100}%`,
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
                                    left: `${(product.score / 10) * 100}%`,
                                    transform: "translateX(-50%)",
                                  }}
                                ></div>
                              </div>

                              {/* Compare Checkbox */}
                              <div className="flex items-center space-x-1 mt-2">
                                <input
                                  type="checkbox"
                                  className="accent-purple-600"
                                />
                                <p className="text-purple-600 text-sm font-medium">
                                  COMPARE
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Button */}
                    <button
                      className="absolute right-0 bg-gray-300 hover:bg-gray-400 p-2 rounded-full z-10"
                      onClick={nextSlide}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Featured Comparisons */}
                <div className="mt-6 text-center sm:text-left">
                  <h3 className="font-semibold text-lg sm:text-xl">
                    PartnerStack Featured Comparisons
                  </h3>
                  <div className="bg-white shadow-md inline-block rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-center sm:justify-start space-x-4">
                      <img
                        src={featuredComparison.logo1}
                        alt="PartnerStack"
                        className="h-12 w-12"
                      />
                      <p className="text-gray-700 font-semibold text-xl">VS</p>
                      <img
                        src={featuredComparison.logo2}
                        alt="impact.com"
                        className="h-12 w-12"
                      />
                    </div>
                    <p className="pt-3 text-blue-600 font-medium">
                      {featuredComparison.name}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sixth Section */}
        <div
          className="flex flex-col items-center justify-center bg-gray-100 p-4"
          ref={sectionsRef.editorsReview}
        >
          {/* Main Card */}
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
            {/* Header Section */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsReviewsOpen(!isReviewsOpen)}
            >
              <div className="flex items-center space-x-2">
                <ChevronRight
                  size={20}
                  className={`transition-transform duration-200 ${
                    isReviewsOpen ? "rotate-90" : ""
                  }`}
                />
                <h3 className="font-bold text-lg sm:text-xl">
                  PartnerStack Reviews
                </h3>
              </div>
            </div>

            {/* Expanded Content */}
            {isReviewsOpen && (
              <div className="mt-4 text-center sm:text-left">
                <p className="text-gray-600">
                  Tell us your opinion about
                  <span className="font-semibold">PartnerStack</span> and help
                  others.
                </p>
                <div className="flex justify-center sm:justify-start mt-4">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition">
                    Write a Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Seven Section */}
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
            {/* Reviewer Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-3 text-gray-700 text-sm text-center sm:text-left">
              {/* Reviewer Image */}
              <img
                src={Profile}
                alt="Reviewer"
                className="w-10 h-10 rounded-full object-cover mx-auto sm:mx-0"
              />

              {/* Reviewer Details */}
              <p>
                Reviewed by
                <span className="font-semibold">Ana Maria Stanciuc</span> &
                <span className="font-semibold">Alina Maria Stan</span>
                <span className="text-gray-500">(Editor)</span> on
                <span className="font-semibold">Jan 1st, ‘25</span>
              </p>
            </div>

            <div className="mx-auto mt-4">
              {/* Table of Contents */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsTOCOpen(!isTOCOpen)}
                >
                  <div className="flex items-center space-x-2">
                    <List size={20} />
                    <h3 className="font-semibold text-lg sm:text-xl">
                      Table of Contents
                    </h3>
                  </div>
                  {isTOCOpen ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </div>

                {isTOCOpen && (
                  <ul className="space-y-2 mt-3 text-center sm:text-left">
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
                    <h2 className="text-xl font-semibold text-center sm:text-left">
                      {item.question}
                    </h2>
                    <div
                      className="mt-1 mb-2 mx-auto sm:mx-0"
                      style={{
                        width: "60%",
                        height: "2px",
                        background:
                          "linear-gradient(to right, #20D3B4 0, #20D3B4 50%, transparent 100%)",
                      }}
                    ></div>
                    <p className="text-gray-700 text-center sm:text-left">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="w-full mx-auto bg-white shadow-lg mt-10 rounded-lg p-6">
              {/* Header */}
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center sm:text-left">
                PartnerStack Frequently Asked Questions (FAQs)
              </h2>
              <div
                className="mt-1 mb-2 mx-auto sm:mx-0"
                style={{
                  width: "60%",
                  height: "2px",
                  background:
                    "linear-gradient(to right, #20D3B4 0, #20D3B4 50%, transparent 100%)",
                }}
              ></div>

              {/* FAQ List */}
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg">
                    <button
                      className="w-full flex justify-between items-center p-4 font-medium text-gray-800 text-left focus:outline-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      {faq.question}
                      {openIndex === index ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                    {openIndex === index && (
                      <div className="p-4 text-gray-600 border-t border-gray-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Eight Section */}
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
          <div className="w-full max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
              Authors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {authors.map((author, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center sm:items-start"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-6">
                    {/* Profile Image */}
                    <img
                      src={author.image}
                      alt={author.name}
                      className="w-28 h-28 rounded-full object-cover shadow-lg"
                    />

                    {/* Text Content */}
                    <div className="flex flex-col text-center sm:text-left">
                      <p className="text-sm text-gray-600 font-semibold">
                        {author.type}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold">
                        {author.name}
                      </h3>
                      <p className="text-gray-600 text-md font-medium">
                        {author.role}
                      </p>

                      {/* Social Media Icons */}
                      <div className="flex justify-center sm:justify-start space-x-3 mt-3">
                        {author.socialLinks.map((Icon, index) => (
                          <Icon
                            key={index}
                            className="text-gray-700 bg-gray-200 text-3xl sm:text-4xl p-2 rounded-md hover:bg-gray-300 cursor-pointer"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-md font-semibold text-gray-800 mt-4 text-center sm:text-left">
                    {author.designation}
                  </p>
                  <p className="text-gray-600 mt-2 text-center sm:text-left">
                    {author.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nineth Section */}
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
          {/* Main Card */}
          <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
            {/* Header Section */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsAlternativeOpen(!isAlternativeOpen)}
            >
              <div className="flex items-center space-x-2">
                <ChevronRight
                  size={20}
                  className={`transition-transform duration-200 ${
                    isAlternativeOpen ? "rotate-90" : ""
                  }`}
                />
                <h3 className="font-bold text-lg sm:text-xl">
                  PartnerStack vs. Similar Products
                </h3>
              </div>
            </div>

            {/* Expanded Content */}
            {isAlternativeOpen && (
              <>
                {/* Carousel Section */}
                <div className="relative w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                  {/* Slider Section */}
                  <div className="relative flex items-center">
                    {/* Left Button */}
                    <button
                      className="absolute left-0 bg-gray-300 hover:bg-gray-400 p-2 rounded-full z-10"
                      onClick={prevAlternativeSlide}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* Product Cards Container */}
                    <div className="flex overflow-hidden w-full justify-center">
                      <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                          transform: `translateX(-${
                            currentAlternativeIndex *
                            (100 / visibleAlternativeSlides)
                          }%)`,
                        }}
                      >
                        {productsAlternative.map((product, index) => (
                          <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-4 w-64 flex flex-col sm:flex-row items-center sm:items-start transition-transform duration-300 mx-2"
                          >
                            {/* Logo */}
                            <img
                              src={product.logo}
                              alt={product.name}
                              className="h-12 w-12 object-contain sm:mr-4"
                            />

                            {/* Product Details */}
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-grow">
                              {/* Product Name */}
                              <p className="text-blue-600 font-semibold">
                                {product.name}
                              </p>

                              {/* Tekpon Score */}
                              <div className="flex justify-between items-center w-full mt-1 text-gray-600 text-sm">
                                <p>Tekpon Score</p>
                                <p className="font-semibold">{product.score}</p>
                              </div>

                              {/* Score Progress Bar */}
                              <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full mt-1">
                                <div
                                  className="absolute h-full rounded-full"
                                  style={{
                                    width: `${(product.score / 10) * 100}%`,
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
                                    left: `${(product.score / 10) * 100}%`,
                                    transform: "translateX(-50%)",
                                  }}
                                ></div>
                              </div>

                              {/* Compare Checkbox */}
                              <div className="flex items-center space-x-1 mt-2">
                                <input
                                  type="checkbox"
                                  className="accent-purple-600"
                                />
                                <p className="text-purple-600 text-sm font-medium">
                                  COMPARE
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Button */}
                    <button
                      className="absolute right-0 bg-gray-300 hover:bg-gray-400 p-2 rounded-full z-10"
                      onClick={nextAlternativeSlide}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tenth Section */}
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
            {/* Header Section */}
            <button
              className="w-full flex items-center justify-between font-semibold text-gray-800 text-lg focus:outline-none"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              <div className="flex items-center space-x-2">
                {isCategoriesOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
                <p className="text-center sm:text-left">
                  PartnerStack is Found in these Categories
                </p>
              </div>
            </button>

            {/* Categories List */}
            {isCategoriesOpen && (
              <div className="mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-gray-700 text-sm text-center sm:text-left">
                  {categories.map((category, index) => (
                    <p
                      key={index}
                      className="whitespace-normal break-words px-2"
                    >
                      {category}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetInsider;
