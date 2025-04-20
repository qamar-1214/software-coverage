import React from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

const CreateCategoryModal = ({
	isOpen = false,
	onClose = () => {},
	onSubmit = async (data) => console.log(data),
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		defaultValues: {
			name: "",
			description: "",
		},
	});

	// Form submission handler
	const onSubmitForm = async (data) => {
		try {
			await onSubmit(data);
			handleClose();
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	// Handle modal close
	const handleClose = () => {
		reset();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/50" onClick={handleClose} />

			{/* Modal */}
			<div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 animate-fadeIn">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b">
					<h2 className="text-lg font-semibold text-gray-900">
						Create New Category
					</h2>
					<button
						onClick={handleClose}
						className="p-1 hover:bg-gray-100 rounded-full transition-colors"
						disabled={isSubmitting}
					>
						<X className="h-5 w-5 text-gray-500" />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit(onSubmitForm)} className="p-4 space-y-4">
					{/* Name Field */}
					<div className="space-y-2">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							id="name"
							{...register("name", {
								required: "Name is required",
								minLength: {
									value: 3,
									message: "Name must be at least 3 characters",
								},
								maxLength: {
									value: 50,
									message: "Name must be less than 50 characters",
								},
							})}
							type="text"
							placeholder="Enter category name"
							className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                ${errors.name ? "border-red-500" : "border-gray-300"}`}
							disabled={isSubmitting}
						/>
						{errors.name && (
							<p className="text-sm text-red-500">{errors.name.message}</p>
						)}
					</div>

					{/* Description Field */}
					<div className="space-y-2">
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700"
						>
							Description
						</label>
						<textarea
							id="description"
							{...register("description", {
								required: "Description is required",
								minLength: {
									value: 10,
									message: "Description must be at least 10 characters",
								},
								maxLength: {
									value: 500,
									message: "Description must be less than 500 characters",
								},
							})}
							placeholder="Enter category description"
							rows="4"
							className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                ${errors.description ? "border-red-500" : "border-gray-300"}`}
							disabled={isSubmitting}
						/>
						{errors.description && (
							<p className="text-sm text-red-500">
								{errors.description.message}
							</p>
						)}
					</div>

					{/* Footer */}
					<div className="flex justify-end gap-3 pt-4 border-t">
						<button
							type="button"
							onClick={handleClose}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
							disabled={isSubmitting}
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? "Creating..." : "Create Category"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateCategoryModal;
