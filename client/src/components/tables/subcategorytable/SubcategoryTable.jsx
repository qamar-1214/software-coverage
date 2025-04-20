import React, { useState, useEffect } from "react";
import { Pen, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { fetchSubcategoriesWithDescription } from "../../../api/subcategory_api/subcatgegory";
import TableShimmer from "../../common/TableShimmer";
import Pagination from "../../common/Pagination";
import CreateSubcategoryModal from "../../modals/subcategory_modal/CreateSubcategoryModal";
import { fetchCategories } from "../../../api/category_api/category";
import {
  addSubCategory,
  updateSubcategory,
  deleteSubCategory,
} from "../../../api/subcategory_api/subcatgegory";
import UpdateSubcategoryModal from "../../modals/subcategory_modal/UpdateSubcategoryModal";

const SubcategoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getSubCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchSubcategoriesWithDescription(currentPage);
        console.log("Fetched subcategories:", data);
        setSubCategories(data.subCategories);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getSubCategories();
  }, [currentPage]);
  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (data) => {
    try {
      const newSubcategory = await addSubCategory(data);
      if (newSubcategory.success) {
        console.log(newSubcategory.message);
        const updatedData = await fetchSubcategoriesWithDescription(
          currentPage
        );
        setSubCategories(updatedData.subCategories);
        setTotalPages(updatedData.totalPages);
        setTotal(updatedData.total);
      }
      setIsAddModalOpen(false);
      toast.success("Sub-Category added successfully");
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };

  const handleUpdate = async (updatedData) => {
    if (selectedSubcategory) {
      try {
        const response = await updateSubcategory(
          selectedSubcategory._id,
          updatedData
        );
        if (response.success) {
          const updatedData = await fetchSubcategoriesWithDescription(
            currentPage
          );
          setSubCategories(updatedData.subCategories);
          setTotalPages(updatedData.totalPages);
          setTotal(updatedData.total);
          setIsUpdateModalOpen(false);
          setSelectedSubcategory(null);
          toast.success("Sub-Category Updated successfully");
        }
      } catch (error) {
        console.error("Error updating subcategory:", error);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (subcategoryId) => {
    try {
      console.log("Deleting category:", subcategoryId);
      await deleteSubCategory(subcategoryId);
      setSubCategories((prevsubCategories) =>
        prevsubCategories.filter((cat) => cat._id !== subcategoryId)
      );
      toast.success("Sub-Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete subcategory. Please try again later.");
    }
  };

  console.log(subCategories);

  if (loading) {
    return <TableShimmer />;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-gray-100">
        <div className="mb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Subcategories
          </h2>
          <p className="text-sm text-center sm:text-left  text-gray-600 mt-1">
            Total subcategories {subCategories.length}
          </p>
        </div>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Subcategory
        </button>
      </div>
      <div className="p-6 pb-0">
        <input
          type="text"
          placeholder="Search subcategories..."
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subcategory Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subcategory Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subcategory Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Parent Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Software
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubCategories.map((subCategory) => (
                <tr
                  key={subCategory._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className=" flex justify-center ">
                    <img
                      src={subCategory?.imageUrl?.url || "/noimage.png"}
                      alt=""
                      className="w-10  h-10 object-contain"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {subCategory.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subCategory.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subCategory?.category?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subCategory.softwares &&
                      subCategory.softwares
                        .map((software) => software.name)
                        .join(", ")}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      aria-label="Edit subcategory"
                      onClick={() => handleEdit(subCategory)}
                    >
                      <Pen size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      aria-label="Delete subcategory"
                      onClick={() => handleDelete(subCategory._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Subcategory Modal */}
      <CreateSubcategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmit}
        fetchCategories={fetchCategories}
      />

      {/* Update Subcategory Modal */}
      <UpdateSubcategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={selectedSubcategory || {}}
        fetchCategories={fetchCategories}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SubcategoryTable;
