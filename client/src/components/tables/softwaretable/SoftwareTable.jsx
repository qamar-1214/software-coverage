// import React, { useState, useEffect } from "react";
// import { Pen, Trash2 } from "lucide-react";
// import { toast } from "react-toastify";
// import {
//   fetchAllSoftwareAdmin,
//   deleteSoftware,
// } from "../../../api/software_api/softwareApi";
// import AddProductModal from "../../modals/software_modal/AddProductModal";
// import UpdateProductModal from "../../modals/software_modal/UpdateSoftwareModal";
// import TableShimmer from "../../common/TableShimmer";

// const SoftwareTable = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [softwares, setSoftwares] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

//   const fetchSoftwares = async () => {
//     setLoading(true);
//     try {
//       const response = await fetchAllSoftwareAdmin();
//       setSoftwares(response.softwares);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSoftwares();
//   }, []);

//   const handleEditClick = (software) => {
//     setSelectedProduct(software);
//     setIsUpdateModalOpen(true);
//   };

//   const filteredSoftwares = softwares.filter((software) =>
//     software.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleUpdateProduct = () => {
//     fetchSoftwares();
//   };

//   const handleAddProduct = () => {
//     fetchSoftwares();
//   };

//   const handleDelete = async (softwareId) => {
//     try {
//       await deleteSoftware(softwareId);
//       setSoftwares((prevSoftwares) =>
//         prevSoftwares.filter((soft) => soft._id !== softwareId)
//       );
//       toast.success("Software deleted successfully");
//     } catch (error) {
//       toast.error("Failed to delete software. Please try again later.");
//     }
//   };

//   if (loading) {
//     return <TableShimmer />;
//   }

//   if (error) {
//     return (
//       <div className="w-full h-64 flex items-center justify-center">
//         <div className="text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="w-full bg-white rounded-lg shadow-sm">
//         <div className="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-gray-100">
//           <div className="mb-2">
//             <h2 className="text-2xl font-semibold text-gray-800">Softwares</h2>
//             <p className="text-center sm:text-left text-sm text-gray-600 mt-1">
//               Total Software {softwares.length}
//             </p>
//           </div>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
//           >
//             + Add Software
//           </button>
//         </div>

//         <div className="p-6 pb-0">
//           <input
//             type="text"
//             placeholder="Search software..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="p-6 pt-4 overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Software Image
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Software Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Description
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Subcategory
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Score
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Features
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Deployment
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Pricing Option
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Best For
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredSoftwares.map((software) => (
//                 <tr
//                   key={software._id}
//                   className="hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <img
//                       src={software.imageUrl.url}
//                       alt={software.name}
//                       className="w-12 h-12 object-cover rounded-md"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                     {software.name}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {software.description}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {software.category.name}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {software.subCategory.name}
//                   </td>
//                   <td className="px-6 py-4 text-center text-sm">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold
//                       ${
//                         software.score >= 8
//                           ? "bg-green-100 text-green-800"
//                           : software.score >= 7
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {software.score}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {software.features && software.features.length > 0
//                       ? software.features.join(", ")
//                       : "No Features"}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {software.deployment && software.deployment.length > 0
//                       ? software.deployment.join(", ")
//                       : "No Deployment"}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {software.pricingoption && software.pricingoption.length > 0
//                       ? software.pricingoption.join(", ")
//                       : "No Pricing Option"}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {software.bestfor && software.bestfor.length > 0
//                       ? software.bestfor.join(", ")
//                       : "No Best For"}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <button
//                       className="text-blue-600 hover:text-blue-900 mr-3"
//                       aria-label="Edit software"
//                       onClick={() => handleEditClick(software)}
//                     >
//                       <Pen size={18} />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-900"
//                       aria-label="Delete software"
//                       onClick={() => handleDelete(software._id)}
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {filteredSoftwares.length === 0 && (
//             <div className="text-center py-4 text-gray-500">
//               No products found
//             </div>
//           )}
//         </div>
//       </div>

//       <AddProductModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAdd={handleAddProduct}
//       />
//       <UpdateProductModal
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         productData={selectedProduct}
//         onUpdate={handleUpdateProduct}
//       />
//     </>
//   );
// };

// export default SoftwareTable;

import React, { useState, useEffect } from "react";
import { Pen, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  fetchAllSoftwareAdmin,
  deleteSoftware,
} from "../../../api/software_api/softwareApi";
import AddProductModal from "../../modals/software_modal/AddProductModal";
import UpdateProductModal from "../../modals/software_modal/UpdateSoftwareModal";
import TableShimmer from "../../common/TableShimmer";

const SoftwareTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [softwares, setSoftwares] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const fetchSoftwares = async () => {
    setLoading(true);
    try {
      const response = await fetchAllSoftwareAdmin();
      setSoftwares(response.softwares);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoftwares();
  }, []);

  const handleEditClick = (software) => {
    setSelectedProduct(software);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateProduct = () => {
    fetchSoftwares();
  };

  const handleAddProduct = () => {
    fetchSoftwares();
  };

  const handleDelete = async (softwareId) => {
    try {
      await deleteSoftware(softwareId);
      setSoftwares((prevSoftwares) =>
        prevSoftwares.filter((soft) => soft._id !== softwareId)
      );
      toast.success("Software deleted successfully");
    } catch (error) {
      toast.error("Failed to delete software. Please try again later.");
    }
  };

  const filteredSoftwares = softwares.filter((software) =>
    software.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredSoftwares.length / ITEMS_PER_PAGE);
  const displayedSoftwares = filteredSoftwares.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <TableShimmer />;
  }

  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-gray-100">
          <div className="mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">Softwares</h2>
            <p className="text-center sm:text-left text-sm text-gray-600 mt-1">
              Total Software {softwares.length}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            + Add Software
          </button>
        </div>

        <div className="p-6 pb-0">
          <input
            type="text"
            placeholder="Search software..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="p-6 pt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Software Image
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Software Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Subcategory
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Deployment
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pricing Option
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Best For
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedSoftwares.map((software) => (
                  <tr
                    key={software._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">
                      <img
                        src={software.imageUrl.url}
                        alt={software.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-700">
                      {software.name}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">
                      {software.description}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">
                      {software.category.name}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">
                      {software.subCategory.name}
                    </td>
                    <td className="px-4 py-2 text-center text-xs sm:text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold 
                ${
                  software.score >= 8
                    ? "bg-green-100 text-green-800"
                    : software.score >= 7
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
                      >
                        {software.score}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">
                      {software.features?.length > 0
                        ? software.features.join(", ")
                        : "No Features"}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">
                      {software.deployment?.length > 0
                        ? software.deployment.join(", ")
                        : "No Deployment"}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">
                      {software.pricingoption?.length > 0
                        ? software.pricingoption.join(", ")
                        : "No Pricing Option"}
                    </td>
                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-500">
                      {software.bestfor?.length > 0
                        ? software.bestfor.join(", ")
                        : "No Best For"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        aria-label="Edit software"
                        onClick={() => handleEditClick(software)}
                      >
                        <Pen size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        aria-label="Delete software"
                        onClick={() => handleDelete(software._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSoftwares.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No products found
              </div>
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="p-6 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProduct}
      />
      <UpdateProductModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        productData={selectedProduct}
        onUpdate={handleUpdateProduct}
      />
    </>
  );
};

export default SoftwareTable;
