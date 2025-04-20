// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { X, ChevronDown, ChevronRight } from "lucide-react";

// const ComparisonPage = () => {
//   const location = useLocation();
//   const [selectedSoftware, setSelectedSoftware] = useState([]);
//   const [isPricingOpen, setIsPricingOpen] = useState(true);
//   const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
//   const [isBestForOpen, setIsBestForOpen] = useState(false);
//   const [isDeploymentOpen, setIsDeploymentOpen] = useState(false);

//   useEffect(() => {
//     if (location.state?.selectedSoftware?.length > 0) {
//       setSelectedSoftware(location.state.selectedSoftware);
//       return;
//     }

//     const searchParams = new URLSearchParams(location.search);
//     const softwareNames =
//       searchParams.get("filter[software]")?.split(",") || [];

//     if (softwareNames.length > 0) {
//       fetch("/api/get-sub-category-admin")
//         .then((res) => res.json())
//         .then((data) => {
//           const filteredSoftware = data.filter((software) =>
//             softwareNames.includes(
//               software.name.replace(/\s+/g, "-").toLowerCase()
//             )
//           );
//           setSelectedSoftware(filteredSoftware);
//         });
//     }
//   }, [location.state, location.search]);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div>
//         <h1 className="text-3xl font-bold text-center mb-6">
//           Software Comparison
//         </h1>
//         <div
//           id="Usman"
//           className="bg-white shadow-xl rounded-xl p-7 w-full max-w-4xl mx-auto flex flex-wrap justify-between gap-6"
//         >
//           {selectedSoftware.length > 0 ? (
//             selectedSoftware.map((software, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col justify-center items-center space-y-2"
//               >
//                 <div className="flex items-center justify-center bg-white shadow-md rounded-xl w-36 h-36 mx-auto sm:mx-0">
//                   <img
//                     src={software.imageUrl?.url || "/noimage.png"}
//                     alt={software.name}
//                     className="w-28 h-28"
//                   />
//                 </div>

//                 <div className="flex-1 mt-4 sm:mt-0 sm:ml-4 text-left">
//                   <h2 className="text-2xl font-semibold text-center pt-1">
//                     {software.name}
//                   </h2>
//                   <div className="flex flex-col sm:flex-row sm:gap-12 mt-2">
//                     <span className="text-gray-600 text-sm">Tekpon Score</span>
//                     <span className="text-gray-600 text-sm">
//                       {software.score}
//                     </span>
//                   </div>
//                   <div className="flex items-center mt-2 space-x-3">
//                     <div className="relative w-full max-w-[150px] h-[2px] bg-gray-200 rounded-full">
//                       <div
//                         className="absolute h-full rounded-full"
//                         style={{
//                           width: `${(software.score / 10) * 100}%`,
//                           background:
//                             "linear-gradient(to right, #FFA500, #FF4500)",
//                         }}
//                       ></div>
//                       <div
//                         className="absolute bg-red-500 rounded-full shadow-md"
//                         style={{
//                           width: "10px",
//                           height: "10px",
//                           top: "-4px",
//                           left: `${(software.score / 10) * 100}%`,
//                           transform: "translateX(-50%)",
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col space-y-6">
//                   <button
//                     onClick={() =>
//                       navigate(`/software/${softwareSlug}/reviews/`, {
//                         state: { software, categoryName: slug },
//                       })
//                     }
//                     style={{ textDecoration: "none" }}
//                     target="_blank"
//                     className="mt-4  bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md px-8 py-2.5 cursor-pointer w-full sm:w-auto text-center"
//                   >
//                     Visit Profile
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 mt-4">
//               Please select at least two software for comparison.
//             </p>
//           )}
//         </div>
//       </div>

//       <Section
//         title="Pricing"
//         isOpen={isPricingOpen}
//         setIsOpen={setIsPricingOpen}
//         data={selectedSoftware.map((s) => s.pricingoption)}
//       />
//       <Section
//         title="Features"
//         isOpen={isFeaturesOpen}
//         setIsOpen={setIsFeaturesOpen}
//         data={selectedSoftware.map((s) => s.features)}
//       />
//       <Section
//         title="Best For"
//         isOpen={isBestForOpen}
//         setIsOpen={setIsBestForOpen}
//         data={selectedSoftware.map((s) => s.bestfor)}
//       />
//       <Section
//         title="Deployment"
//         isOpen={isDeploymentOpen}
//         setIsOpen={setIsDeploymentOpen}
//         data={selectedSoftware.map((s) => s.deployment)}
//       />
//     </div>
//   );
// };

// function Section({ title, isOpen, setIsOpen, data }) {
//   return (
//     <div className="p-6 shadow-md rounded-lg max-w-4xl mx-auto bg-white mt-6">
//     <h2
//       className="text-lg font-semibold flex items-center space-x-2 cursor-pointer"
//       onClick={() => setIsOpen(!isOpen)}
//     >
//       {isOpen ? (
//         <ChevronDown className="w-5 h-5" />
//       ) : (
//         <ChevronRight className="w-5 h-5" />
//       )}
//       <span>{title}</span>
//     </h2>
  
//     {isOpen && (
//       <div className="flex flex-wrap justify-between gap-6 mt-4">
//         {data.map((items, index) => (
//           <div key={index} className="w-full sm:w-1/5 space-y-2">
//             {items && items.length > 0 ? (
//               items.map((item, i) => (
//                 <div key={i} className="flex items-center space-x-2 text-gray-600">
//                   <X className="w-4 h-4 text-gray-500" />
//                   <span>{item}</span>
//                 </div>
//               ))
//             ) : (
//               <p>No Data Available</p>
//             )}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
  
//   );
// }

// export default ComparisonPage;





import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X, ChevronDown, ChevronRight } from "lucide-react";

const ComparisonPage = () => {
  const location = useLocation();
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [isPricingOpen, setIsPricingOpen] = useState(true);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isBestForOpen, setIsBestForOpen] = useState(false);
  const [isDeploymentOpen, setIsDeploymentOpen] = useState(false);

  useEffect(() => {
    if (location.state?.selectedSoftware?.length > 0) {
      setSelectedSoftware(location.state.selectedSoftware);
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const softwareNames =
      searchParams.get("filter[software]")?.split(",") || [];

    if (softwareNames.length > 0) {
      fetch("/api/get-sub-category-admin")
        .then((res) => res.json())
        .then((data) => {
          const filteredSoftware = data.filter((software) =>
            softwareNames.includes(
              software.name.replace(/\s+/g, "-").toLowerCase()
            )
          );
          setSelectedSoftware(filteredSoftware);
        });
    }
  }, [location.state, location.search]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Software Comparison
        </h1>
        <div
          id="Usman"
          className="bg-white shadow-xl rounded-xl p-7 w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-6"
        >
          {selectedSoftware.length > 0 ? (
            selectedSoftware.map((software, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center space-y-4 w-full sm:w-1/2 lg:w-1/3 text-center"
              >
                {/* Software Image */}
                <div className="flex items-center justify-center bg-white shadow-md rounded-xl w-32 h-32 sm:w-36 sm:h-36 mx-auto">
                  <img
                    src={software.imageUrl?.url || "/noimage.png"}
                    alt={software.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                  />
                </div>

                {/* Software Details */}
                <div className="flex-1 mt-2">
                  <h2 className="text-lg sm:text-2xl font-semibold">
                    {software.name}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:gap-6 mt-2 text-sm">
                    <span className="text-gray-600">Tekpon Score:</span>
                    <span className="text-gray-700 font-medium">
                      {software.score}
                    </span>
                  </div>

                  {/* Score Progress Bar */}
                  <div className="flex items-center mt-2 space-x-3">
                    <div className="relative w-full max-w-[120px] sm:max-w-[150px] h-[2px] bg-gray-200 rounded-full">
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
                </div>

                {/* Buttons */}
                <div className="w-full">
                  <button
                    onClick={() =>
                      navigate(`/software/${softwareSlug}/reviews/`, {
                        state: { software, categoryName: slug },
                      })
                    }
                    className="mt-4 bg-[#20D3B4] hover:bg-teal-500 text-white rounded-md px-6 py-2 cursor-pointer w-full"
                  >
                    Visit Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 mt-4">
              Please select at least two software for comparison.
            </p>
          )}
        </div>
      </div>

      {/* Sections */}
      <Section
        title="Pricing"
        isOpen={isPricingOpen}
        setIsOpen={setIsPricingOpen}
        data={selectedSoftware.map((s) => s.pricingoption)}
      />
      <Section
        title="Features"
        isOpen={isFeaturesOpen}
        setIsOpen={setIsFeaturesOpen}
        data={selectedSoftware.map((s) => s.features)}
      />
      <Section
        title="Best For"
        isOpen={isBestForOpen}
        setIsOpen={setIsBestForOpen}
        data={selectedSoftware.map((s) => s.bestfor)}
      />
      <Section
        title="Deployment"
        isOpen={isDeploymentOpen}
        setIsOpen={setIsDeploymentOpen}
        data={selectedSoftware.map((s) => s.deployment)}
      />
    </div>
  );
};

function Section({ title, isOpen, setIsOpen, data }) {
  return (
    <div className="p-6 shadow-md rounded-lg max-w-4xl mx-auto bg-white mt-6">
      <h2
        className="text-lg font-semibold flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
        <span>{title}</span>
      </h2>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {data.map((items, index) => (
            <div key={index} className="w-full">
              {items && items.length > 0 ? (
                items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                    <span className="break-words">{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No Data Available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComparisonPage;
