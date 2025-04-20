import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

const CreateSubcategoryModal = ({
	isOpen = false,
	onClose = () => {},
	onSubmit = async (data) => console.log(data),
	fetchCategories = async () => [],
	isEditing = false,
	initialData = null,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setValue,
		watch,
	} = useForm({
		defaultValues: {
			name: "",
			description: "",
			categoryId: "",
			imageUrl: null,
			IsNavItem: false,
			IsPopCateg: false,
		},
	});

	const [categories, setCategories] = React.useState([]);
	const [isLoadingCategories, setIsLoadingCategories] = React.useState(false);
	const [imagePreview, setImagePreview] = React.useState(null);

	useEffect(() => {
		if (isOpen) {
			loadCategories();
			if (initialData) {
				Object.entries(initialData).forEach(([key, value]) => {
					setValue(key, value);
				});
				if (initialData.imageUrl?.url) {
					setImagePreview(initialData.imageUrl.url);
				}
			}
		}
	}, [isOpen, initialData, setValue]);

	const loadCategories = async () => {
		setIsLoadingCategories(true);
		try {
			const data = await fetchCategories();
			setCategories(data);
		} catch (error) {
			console.error("Error fetching categories:", error);
		} finally {
			setIsLoadingCategories(false);
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setValue("imageUrl", file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const onSubmitForm = async (data) => {
		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			if (key === "imageUrl" && data[key]) {
				formData.append("imageUrl", data[key]);
			} else if (data[key] !== "") {
				formData.append(key, data[key]);
			}
		});
		await onSubmit(formData);
		handleClose();
	};

	const handleClose = () => {
		reset();
		setImagePreview(null);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50" onClick={handleClose} />
			<div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-lg">
				<div className="flex items-center justify-between p-4 border-b">
					<h2 className="text-lg font-semibold text-gray-900">
						{isEditing ? "Update Subcategory" : "Create Subcategory"}
					</h2>
					<button
						onClick={handleClose}
						className="p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
						disabled={isSubmitting}
					>
						<X className="w-5 h-5 text-gray-500" />
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmitForm)} className="p-4 space-y-4">
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							{...register("name", {
								required: "Name is required",
								minLength: {
									value: 3,
									message: "Name must be at least 3 characters",
								},
							})}
							className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors disabled:opacity-50"
							disabled={isSubmitting}
						/>
						{errors.name && (
							<p className="text-sm text-red-500">{errors.name.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							{...register("description", {
								required: "Description is required",
								minLength: {
									value: 10,
									message: "Description must be at least 10 characters",
								},
							})}
							rows="4"
							className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors disabled:opacity-50"
							disabled={isSubmitting}
						/>
						{errors.description && (
							<p className="text-sm text-red-500">
								{errors.description.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Category
						</label>
						<select
							{...register("categoryId", { required: "Category is required" })}
							className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors disabled:opacity-50"
							disabled={isLoadingCategories || isSubmitting}
						>
							<option value="">Select a category</option>
							{categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							))}
						</select>
						{errors.categoryId && (
							<p className="text-sm text-red-500">
								{errors.categoryId.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Image
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
						/>
						{imagePreview && (
							<img
								src={imagePreview}
								alt="Preview"
								className="mt-2 h-32 object-contain"
							/>
						)}
						{errors.imageUrl && (
							<p className="text-sm text-red-500">{errors.imageUrl.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<label className="flex items-center space-x-2">
							<input
								type="checkbox"
								{...register("IsNavItem")}
								className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
							/>
							<span className="text-sm text-gray-700">Show in Navigation</span>
						</label>

						<label className="flex items-center space-x-2">
							<input
								type="checkbox"
								{...register("IsPopCateg")}
								className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
							/>
							<span className="text-sm text-gray-700">Popular Category</span>
						</label>
					</div>

					<div className="flex justify-end gap-3 pt-4 border-t">
						<button
							type="button"
							onClick={handleClose}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
							disabled={isSubmitting}
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
						>
							{isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateSubcategoryModal;
