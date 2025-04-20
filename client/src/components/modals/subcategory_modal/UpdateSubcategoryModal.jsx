// import React, { useEffect, useState } from "react";
// import { X, Upload } from "lucide-react";
// import { useForm } from "react-hook-form";

// const UpdateSubcategoryModal = ({
// 	isOpen = false,
// 	onClose = () => {},
// 	onSubmit = async (data) => console.log(data),
// 	initialData = {
// 		name: "",
// 		description: "",
// 		category: {},
// 		IsPopCateg: false,
// 		imageUrl: { url: "" },
// 	},
// 	fetchCategories = async () => [],
// }) => {
// 	const [categories, setCategories] = useState([]);
// 	const [isLoadingCategories, setIsLoadingCategories] = useState(false);
// 	const [previewImage, setPreviewImage] = useState(null);

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors, isSubmitting },
// 		reset,
// 		setValue,
// 		watch,
// 	} = useForm({
// 		defaultValues: {
// 			name: initialData.name,
// 			description: initialData.description,
// 			categoryId: initialData.category?._id,
// 			IsPopCateg: initialData.IsPopCateg,
// 			imageUrl: null,
// 		},
// 	});

// 	const formValues = watch();

// 	useEffect(() => {
// 		if (isOpen) {
// 			reset({
// 				name: initialData.name,
// 				description: initialData.description,
// 				categoryId: initialData.category?._id || "",
// 				IsPopCateg: initialData.IsPopCateg,
// 				imageUrl: null,
// 			});
// 			setPreviewImage(initialData.imageUrl?.url || null);
// 		}
// 	}, [initialData, isOpen, reset]);

// 	useEffect(() => {
// 		if (isOpen) loadCategories();
// 	}, [isOpen]);

// 	const loadCategories = async () => {
// 		setIsLoadingCategories(true);
// 		try {
// 			const data = await fetchCategories();
// 			setCategories(data);
// 		} catch (error) {
// 			console.error("Error fetching categories:", error);
// 		} finally {
// 			setIsLoadingCategories(false);
// 		}
// 	};

// 	const handleImageChange = (e) => {
// 		const file = e.target.files[0];
// 		if (file) {
// 			setValue("imageUrl", file);
// 			setPreviewImage(URL.createObjectURL(file));
// 		}
// 	};

// 	const onSubmitForm = async (data) => {
// 		try {
// 			const formData = new FormData();
// 			formData.append("name", data.name.trim());
// 			formData.append("description", data.description.trim());
// 			formData.append("categoryId", data.categoryId);
// 			formData.append("IsPopCateg", data.IsPopCateg);

// 			if (data.imageUrl) {
// 				formData.append("imageUrl", data.imageUrl);
// 			}

// 			await onSubmit(formData);
// 			handleClose();
// 		} catch (error) {
// 			console.error("Error updating subcategory:", error);
// 		}
// 	};

// 	const handleClose = () => {
// 		reset();
// 		setPreviewImage(null);
// 		onClose();
// 	};

// 	if (!isOpen) return null;

// 	return (
// 		<div className="fixed inset-0 z-50 flex items-center justify-center">
// 			<div className="absolute inset-0 bg-black/50" onClick={handleClose} />

// 			<div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
// 				<div className="flex items-center justify-between p-4 border-b">
// 					<h2 className="text-lg font-semibold">Update Subcategory</h2>
// 					<button
// 						onClick={handleClose}
// 						className="p-1 hover:bg-gray-100 rounded-full"
// 						disabled={isSubmitting}
// 					>
// 						<X className="h-5 w-5 text-gray-500" />
// 					</button>
// 				</div>

// 				<form onSubmit={handleSubmit(onSubmitForm)} className="p-4 space-y-4">
// 					<div className="space-y-2">
// 						<label className="block text-sm font-medium text-gray-700">
// 							Image
// 						</label>
// 						<div className="flex items-center gap-4">
// 							{previewImage && (
// 								<img
// 									src={previewImage}
// 									alt="Preview"
// 									className="h-20 w-20 object-cover rounded-lg"
// 								/>
// 							)}
// 							<label className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
// 								<Upload className="h-5 w-5" />
// 								<span className="text-sm">Upload Image</span>
// 								<input
// 									type="file"
// 									{...register("imageUrl")}
// 									onChange={handleImageChange}
// 									accept="image/*"
// 									className="hidden"
// 								/>
// 							</label>
// 						</div>
// 					</div>

// 					<div className="space-y-2">
// 						<label className="block text-sm font-medium text-gray-700">
// 							Name
// 						</label>
// 						<input
// 							{...register("name", {
// 								required: "Name is required",
// 								minLength: { value: 3, message: "Minimum 3 characters" },
// 								maxLength: { value: 50, message: "Maximum 50 characters" },
// 							})}
// 							className="w-full px-3 py-2 border rounded-lg"
// 						/>
// 						{errors.name && (
// 							<p className="text-sm text-red-500">{errors.name.message}</p>
// 						)}
// 					</div>

// 					<div className="space-y-2">
// 						<label className="block text-sm font-medium text-gray-700">
// 							Description
// 						</label>
// 						<textarea
// 							{...register("description", {
// 								required: "Description is required",
// 								minLength: { value: 10, message: "Minimum 10 characters" },
// 								maxLength: { value: 500, message: "Maximum 500 characters" },
// 							})}
// 							rows="4"
// 							className="w-full px-3 py-2 border rounded-lg"
// 						/>
// 						{errors.description && (
// 							<p className="text-sm text-red-500">
// 								{errors.description.message}
// 							</p>
// 						)}
// 					</div>

// 					<div className="space-y-2">
// 						<label className="block text-sm font-medium text-gray-700">
// 							Category
// 						</label>
// 						<select
// 							{...register("categoryId", { required: "Category is required" })}
// 							className="w-full px-3 py-2 border rounded-lg"
// 							disabled={isLoadingCategories}
// 						>
// 							<option value="">Select category</option>
// 							{categories.map((category) => (
// 								<option key={category._id} value={category._id}>
// 									{category.name}
// 								</option>
// 							))}
// 						</select>
// 						{errors.categoryId && (
// 							<p className="text-sm text-red-500">
// 								{errors.categoryId.message}
// 							</p>
// 						)}
// 					</div>

// 					<div className="flex items-center gap-2">
// 						<input
// 							type="checkbox"
// 							{...register("IsPopCateg")}
// 							id="IsPopCateg"
// 							className="rounded border-gray-300"
// 						/>
// 						<label htmlFor="IsPopCateg" className="text-sm text-gray-700">
// 							Popular Category
// 						</label>
// 					</div>

// 					<div className="flex justify-end gap-3 pt-4 border-t">
// 						<button
// 							type="button"
// 							onClick={handleClose}
// 							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
// 							disabled={isSubmitting}
// 						>
// 							Cancel
// 						</button>
// 						<button
// 							type="submit"
// 							disabled={isSubmitting}
// 							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
// 						>
// 							{isSubmitting ? "Updating..." : "Update"}
// 						</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default UpdateSubcategoryModal;

// import React, { useEffect, useState } from "react";
// import { X, Upload } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { fetchAllProducts } from "../../../api/software_api/softwareApi"; // Adjust the path if necessary

// const UpdateSubcategoryModal = ({
//   isOpen = false,
//   onClose = () => {},
//   onSubmit = async (data) => console.log(data),
//   initialData = {
//     name: "",
//     description: "",
//     category: {},
//     softwareId: "",
//     IsPopCateg: false,
//     imageUrl: { url: "" },
//   },
//   fetchCategories = async () => [],
// }) => {
//   const [categories, setCategories] = useState([]);
//   const [softwares, setSoftwares] = useState([]);
//   const [isLoadingCategories, setIsLoadingCategories] = useState(false);
//   const [isLoadingSoftwares, setIsLoadingSoftwares] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     setValue,
//     watch,
//   } = useForm({
//     defaultValues: {
//       name: initialData.name,
//       description: initialData.description,
//       categoryId: initialData.category?._id,
//       softwareId: initialData.softwareId || "",
//       IsPopCateg: initialData.IsPopCateg,
//       imageUrl: null,
//     },
//   });

//   const formValues = watch();

//   useEffect(() => {
//     if (isOpen) {
//       reset({
//         name: initialData.name,
//         description: initialData.description,
//         categoryId: initialData.category?._id || "",
//         softwareIds: initialData.softwares
//           ? initialData.softwares.map((software) => software._id)
//           : [], // Map software IDs
//         IsPopCateg: initialData.IsPopCateg,
//         imageUrl: null,
//       });

//       setPreviewImage(initialData.imageUrl?.url || null);
//       loadCategories();
//       loadSoftwares();
//     }
//   }, [initialData, isOpen, reset]);

//   const loadCategories = async () => {
//     setIsLoadingCategories(true);
//     try {
//       const data = await fetchCategories();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     } finally {
//       setIsLoadingCategories(false);
//     }
//   };

//   const loadSoftwares = async () => {
//     setIsLoadingSoftwares(true);
//     try {
//       const data = await fetchAllProducts();
//       setSoftwares(data.softwares || []);
//     } catch (error) {
//       console.error("Error fetching softwares:", error);
//     } finally {
//       setIsLoadingSoftwares(false);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setValue("imageUrl", file);
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const onSubmitForm = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", data.name.trim());
//       formData.append("description", data.description.trim());
//       formData.append("categoryId", data.categoryId);

//       // Convert selected software IDs to a comma-separated string or array
//       formData.append("softwareIds", JSON.stringify(data.softwareIds));

//       formData.append("IsPopCateg", data.IsPopCateg);

//       if (data.imageUrl) {
//         formData.append("imageUrl", data.imageUrl);
//       }

//       await onSubmit(formData);
//       handleClose();
//     } catch (error) {
//       console.error("Error updating subcategory:", error);
//     }
//   };

//   const handleClose = () => {
//     reset();
//     setPreviewImage(null);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-lg font-semibold">Update Subcategory</h2>
//           <button
//             onClick={handleClose}
//             className="p-1 hover:bg-gray-100 rounded-full"
//             disabled={isSubmitting}
//           >
//             <X className="h-5 w-5 text-gray-500" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(onSubmitForm)} className="p-4 space-y-4">
//           {/* Image Upload */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Image
//             </label>
//             <div className="flex items-center gap-4">
//               {previewImage && (
//                 <img
//                   src={previewImage}
//                   alt="Preview"
//                   className="h-20 w-20 object-cover rounded-lg"
//                 />
//               )}
//               <label className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
//                 <Upload className="h-5 w-5" />
//                 <span className="text-sm">Upload Image</span>
//                 <input
//                   type="file"
//                   {...register("imageUrl")}
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="hidden"
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Name */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               {...register("name", {
//                 required: "Name is required",
//                 minLength: { value: 3, message: "Minimum 3 characters" },
//                 maxLength: { value: 50, message: "Maximum 50 characters" },
//               })}
//               className="w-full px-3 py-2 border rounded-lg"
//             />
//             {errors.name && (
//               <p className="text-sm text-red-500">{errors.name.message}</p>
//             )}
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               {...register("description", {
//                 required: "Description is required",
//                 minLength: { value: 10, message: "Minimum 10 characters" },
//                 maxLength: { value: 500, message: "Maximum 500 characters" },
//               })}
//               rows="4"
//               className="w-full px-3 py-2 border rounded-lg"
//             />
//             {errors.description && (
//               <p className="text-sm text-red-500">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           {/* Category Dropdown */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Category
//             </label>
//             <select
//               {...register("categoryId", { required: "Category is required" })}
//               className="w-full px-3 py-2 border rounded-lg"
//               disabled={isLoadingCategories}
//             >
//               <option value="">Select category</option>
//               {categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//             {errors.categoryId && (
//               <p className="text-sm text-red-500">
//                 {errors.categoryId.message}
//               </p>
//             )}
//           </div>

//           {/* Software Dropdown */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Software
//             </label>
//             <div
//               className="border px-3 py-2 rounded-lg overflow-y-auto"
//               style={{ maxHeight: "100px" }} // Set maximum height and enable scrolling
//             >
//               {softwares.map((software) => (
//                 <div key={software._id} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     value={software._id}
//                     {...register("softwareIds")} // Update to handle multiple values
//                     className="form-checkbox"
//                   />
//                   <label>{software.name}</label>
//                 </div>
//               ))}
//             </div>
//             {errors.softwareIds && (
//               <p className="text-sm text-red-500">
//                 {errors.softwareIds.message}
//               </p>
//             )}
//           </div>

//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//             >
//               {isSubmitting ? "Updating..." : "Update"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateSubcategoryModal;















import React, { useEffect, useState } from "react";
import { X, Upload, Trash2, PlusCircle } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { fetchAllProducts } from "../../../api/software_api/softwareApi"; // Adjust path if necessary

const UpdateSubcategoryModal = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = async (data) => console.log(data),
  initialData = {
    name: "",
    description: "",
    authors: [],
    category: {},
    softwares: [],
    IsPopCateg: false,
    imageUrl: { url: "" },
  },
  fetchCategories = async () => [],
}) => {
  const [categories, setCategories] = useState([]);
  const [softwares, setSoftwares] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    control,
    watch,
  } = useForm({
    defaultValues: {
      name: initialData.name,
      description: initialData.description,
      authors: initialData.authors || [
        {
          name: "",
          role: "",
          workRole: "",
          socialLinks: [{ platform: "", url: "" }],
          title: "",
          paragraph: "",
          questionsAnswers: [{ question: "", answer: "" }],
        },
      ],
      categoryId: initialData.category?._id || "",
      softwareIds: initialData.softwares
        ? initialData.softwares.map((s) => s._id)
        : [],
      IsPopCateg: initialData.IsPopCateg,
      imageUrl: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "authors",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: initialData.name,
        description: initialData.description,
        authors: initialData.authors || [
          {
            name: "",
            role: "",
            workRole: "",
            socialLinks: [{ platform: "", url: "" }],
            title: "",
            paragraph: "",
            questionsAnswers: [{ question: "", answer: "" }],
          },
        ],
        categoryId: initialData.category?._id || "",
        softwareIds: initialData.softwares
          ? initialData.softwares.map((s) => s._id)
          : [],
        IsPopCateg: initialData.IsPopCateg,
        imageUrl: null,
      });

      setPreviewImage(initialData.imageUrl?.url || null);
      loadCategories();
      loadSoftwares();
    }
  }, [initialData, isOpen, reset]);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const loadSoftwares = async () => {
    try {
      const data = await fetchAllProducts();
      setSoftwares(data.softwares || []);
    } catch (error) {
      console.error("Error fetching softwares:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("imageUrl", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmitForm = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      formData.append("categoryId", data.categoryId);
      formData.append("softwareIds", JSON.stringify(data.softwareIds));
      formData.append("IsPopCateg", data.IsPopCateg);

      // Format authors correctly
      const authorsFormatted = data.authors.map((author) => ({
        name: author.name,
        role: author.role,
        workRole: author.workRole,
        title: author.title,
        paragraph: author.paragraph,
        socialLinks: author.socialLinks || [{ platform: "", url: "" }],
        questionsAnswers: author.questionsAnswers || [
          { question: "", answer: "" },
        ],
      }));

      formData.append("authors", JSON.stringify(authorsFormatted));

      if (data.imageUrl) {
        formData.append("imageUrl", data.imageUrl);
      }

      await onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const handleClose = () => {
    reset();
    setPreviewImage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Update Subcategory</h2>
          <button onClick={handleClose} className="p-1">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="p-4 space-y-4 overflow-y-auto"
          style={{ maxHeight: "600px" }}
        >
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Image</label>
            <div className="flex items-center gap-4">
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-lg"
                />
              )}
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-lg cursor-pointer">
                <Upload className="h-5 w-5" />
                <span className="text-sm">Upload Image</span>
                <input
                  type="file"
                  {...register("imageUrl")}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Name & Description */}
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className="w-full p-3 border rounded-lg"
          ></textarea>

          {/* Category Selection */}
          <label>Category:</label>
          <select
            {...register("categoryId")}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Software Selection */}
          <label>Software:</label>
          <div
            className="border p-3 rounded-lg overflow-y-auto"
            style={{ maxHeight: "100px" }}
          >
            {softwares.map((software) => (
              <div key={software._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={software._id}
                  {...register("softwareIds")}
                  className="form-checkbox"
                />
                <label>{software.name}</label>
              </div>
            ))}
          </div>

          {/* Authors Section */}
          <label className="block text-lg font-semibold">Authors</label>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-4 rounded-lg bg-gray-100 mb-4"
            >
              {/* Author Profile Image Upload */}
              {/* <label className="block text-sm font-medium">Profile Image</label>
              <input
                type="file"
                {...register(`authors.${index}.profileImage`)}
                className="w-full p-2 border rounded-lg"
              /> */}

              {/* Author Name */}
              <label className="block text-sm font-medium">Name</label>
              <input
                {...register(`authors.${index}.name`)}
                placeholder="Author Name"
                className="w-full p-2 border rounded-lg mb-2"
              />

              {/* Author Role */}
              <label className="block text-sm font-medium">Role</label>
              <input
                {...register(`authors.${index}.role`)}
                placeholder="Role"
                className="w-full p-2 border rounded-lg mb-2"
              />

              {/* Author Work Role */}
              <label className="block text-sm font-medium">Work Role</label>
              <input
                {...register(`authors.${index}.workRole`)}
                placeholder="Work Role"
                className="w-full p-2 border rounded-lg mb-2"
              />

              {/* Author Title */}
              <label className="block text-sm font-medium">Title</label>
              <input
                {...register(`authors.${index}.title`)}
                placeholder="Title"
                className="w-full p-2 border rounded-lg mb-2"
              />

              {/* Author Paragraph */}
              <label className="block text-sm font-medium">Paragraph</label>
              <textarea
                {...register(`authors.${index}.paragraph`)}
                placeholder="Write a paragraph about the author..."
                className="w-full p-2 border rounded-lg mb-2"
                rows="3"
              />

              {/* Social Links */}
              <label className="block text-sm font-medium">Social Links</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  {...register(`authors.${index}.socialLinks.0.platform`)}
                  placeholder="Platform (e.g. Twitter)"
                  className="p-2 border rounded-lg"
                />
                <input
                  {...register(`authors.${index}.socialLinks.0.url`)}
                  placeholder="URL"
                  className="p-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  {...register(`authors.${index}.socialLinks.1.platform`)}
                  placeholder="Platform (e.g. LinkedIn)"
                  className="p-2 border rounded-lg"
                />
                <input
                  {...register(`authors.${index}.socialLinks.1.url`)}
                  placeholder="URL"
                  className="p-2 border rounded-lg"
                />
              </div>

              {/* Questions & Answers */}
              <label className="block text-sm font-medium mt-2">
                Questions & Answers
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  {...register(`authors.${index}.questionsAnswers.0.question`)}
                  placeholder="Question 1"
                  className="p-2 border rounded-lg"
                />
                <input
                  {...register(`authors.${index}.questionsAnswers.0.answer`)}
                  placeholder="Answer 1"
                  className="p-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  {...register(`authors.${index}.questionsAnswers.1.question`)}
                  placeholder="Question 2"
                  className="p-2 border rounded-lg"
                />
                <input
                  {...register(`authors.${index}.questionsAnswers.1.answer`)}
                  placeholder="Answer 2"
                  className="p-2 border rounded-lg"
                />
              </div>

              {/* Remove Author Button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className="w-full p-2 text-white bg-red-600 rounded-lg flex items-center justify-center gap-2 mt-3"
              >
                <Trash2 className="h-5 w-5" />
                Remove Author
              </button>
            </div>
          ))}

          {/* Add New Author Button */}
          <button
            type="button"
            onClick={() =>
              append({
                name: "",
                role: "",
                workRole: "",
                title: "",
                paragraph: "",
                socialLinks: [{ platform: "", url: "" }],
                questionsAnswers: [{ question: "", answer: "" }],
                // profileImage: null,
              })
            }
            className="w-full p-3 border rounded-lg bg-blue-600 text-white flex items-center justify-center gap-2 mt-3"
          >
            <PlusCircle className="h-5 w-5" />
            Add Author
          </button>

          <button
            type="submit"
            className="w-full p-3 text-white bg-green-600 rounded-lg"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubcategoryModal;
