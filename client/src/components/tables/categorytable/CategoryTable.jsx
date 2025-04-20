import React, { useState, useEffect } from "react";
import { Pen, Trash2 } from "lucide-react";
import {
	addCategory,
	fetchCategoriesWithDescription,
	updateCategory,
	deleteCategory,
	fetchCategories,
} from "../../../api/category_api/category";
import TableShimmer from "../../common/TableShimmer";
import CreateCategoryModal from "../../modals/category_modal/CreateCategoryModal";
import UpdateCategoryModal from "../../modals/category_modal/UpdateCategoryModal";
import { toast } from "react-toastify";
const CategoryTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		const getCategories = async () => {
			setLoading(true);
			try {
				const data = await fetchCategoriesWithDescription();
				setCategories(data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			} finally {
				setLoading(false);
			}
		};

		getCategories();
	}, []);
	const filteredCategories = categories.filter((category) =>
		category.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
	if (loading) {
		return <TableShimmer />;
	}

	const handleSubmit = async (data) => {
		try {
			const newCategory = await addCategory(data);

			if (newCategory.success) {
				console.log(newCategory.messgae);
				const updatedData = await fetchCategoriesWithDescription();
				setCategories(updatedData);
				toast.success(newCategory.message);
			}

			// const newCategory = await createCategory(data);

			setIsAddModalOpen(false);
		} catch (error) {
			console.error("Error creating category:", error);
			toast.error("Error Deleting Category");
		}
	};

	const handleUpdateCategory = async (data) => {
		try {
			// Ensure both name and description are included
			const updatedData = {
				name: data.name,
				description: data.description,
			};

			// Call the API using the reusable fetch function
			// Pass both categoryId and updatedData
			const response = await updateCategory(selectedCategory._id, updatedData);

			// Success message and handling
			console.log("Category updated successfully:", response.data);

			// Show a success toast message
			toast.success(response.message || "Category updated successfully!");

			// Update the categories state with the new data
			setCategories((prev) =>
				prev.map((cat) => (cat._id === response.data._id ? response.data : cat))
			);
			setIsUpdateModalOpen(false);
		} catch (error) {
			console.error("Error updating category:", error.message);

			// Show an error toast message
			toast.error(error.message || "Failed to update category.");
		}
	};
	const openUpdateModal = (category) => {
		setSelectedCategory(category);
		setIsUpdateModalOpen(true);
	};

	const handleDeleteCategory = async (categoryId) => {
		try {
			console.log("Deleting category:", categoryId);
			await deleteCategory(categoryId);
			// Remove the deleted category from the state
			setCategories((prevCategories) =>
				prevCategories.filter((cat) => cat._id !== categoryId)
			);
			toast.success("Category deleted successfully");
		} catch (error) {
			toast.error("Failed to delete category. Please try again later.");
		}
	};

	return (
		<div className="w-full bg-white rounded-lg shadow-sm">
			<div className="flex flex-col sm:flex-row justify-between items-center p-6 border-b border-gray-100">
				<div className="mb-2">
					<h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
					<p className="text-center sm:text-left text-sm text-gray-600 mt-1">
						Total {categories.length} products
					</p>
				</div>

				<button
					onClick={() => setIsAddModalOpen(true)}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                     transition-colors duration-200 text-sm font-medium"
				>
					+ Add Category
				</button>
			</div>
			<div className="p-6 pb-0">
				<input
					type="text"
					placeholder="Search categories..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="p-6 overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="bg-gray-50">
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Category Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Category Description
							</th>

							<th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredCategories.map((category) => (
							<tr
								key={category._id}
								className="hover:bg-gray-50 transition-colors duration-200"
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
									{category.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
									{category.description}
								</td>

								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<button
										onClick={() => openUpdateModal(category)}
										className="text-blue-600 hover:text-blue-900 mr-3"
										aria-label="Edit category"
									>
										<Pen size={18} />
									</button>
									<button
										onClick={() => handleDeleteCategory(category._id)}
										className="text-red-600 hover:text-red-900"
										aria-label="Delete category"
									>
										<Trash2 size={18} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Create Category Modal */}
			<CreateCategoryModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onSubmit={handleSubmit}
			/>

			{/* Update Category Modal */}
			{selectedCategory && (
				<UpdateCategoryModal
					isOpen={isUpdateModalOpen}
					onClose={() => setIsUpdateModalOpen(false)}
					onSubmit={handleUpdateCategory}
					initialData={{
						name: selectedCategory.name,
						description: selectedCategory.description || "",
					}}
				/>
			)}
		</div>
	);
};

export default CategoryTable;
