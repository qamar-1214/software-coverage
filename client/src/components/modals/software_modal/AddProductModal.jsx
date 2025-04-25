// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { X } from "lucide-react";
// import { fetchCategories } from "../../../api/category_api/category";
// import { fetchSubCategoriesByCategoryId } from "../../../api/subcategory_api/subcatgegory";
// import { toast } from "react-toastify";
// import { BASE_URL } from "../../../url";
// fetchSubCategoriesByCategoryId;
// const AddProductModal = ({ isOpen, onClose, onAdd }) => {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [subCategoriesLoading, setSubCategoriesLoading] = useState("");

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       description: "",
//       score: "",
//       category: "",
//       subCategory: "",
//       imageUrl: null,
//     },
//   });

//   // Watch category field for changes
//   const selectedCategory = watch("category");

//   // Fetch categories on modal open
//   useEffect(() => {
//     if (isOpen) {
//       loadCategories();
//     }
//   }, [isOpen]);

//   // Fetch subcategories when category changes
//   useEffect(() => {
//     if (selectedCategory) {
//       loadSubCategories(selectedCategory);
//       setValue("subCategory", ""); // Reset subcategory when category changes
//     } else {
//       setSubCategories([]);
//     }
//   }, [selectedCategory, setValue]);

//   const loadCategories = async () => {
//     try {
//       const categoriesData = await fetchCategories();
//       setCategories(categoriesData);
//     } catch (err) {
//       setError("Failed to load categories");
//     }
//   };

//   const loadSubCategories = async (categoryId) => {
//     try {
//       setSubCategoriesLoading(true); // Set loading state
//       const subCategoriesData = await fetchSubCategoriesByCategoryId(
//         categoryId
//       );
//       setSubCategories(subCategoriesData);
//     } catch (err) {
//       console.error("Error loading subcategories:", err);
//       setError("Failed to load subcategories: " + err.message);
//       setSubCategories([]);
//     } finally {
//       setSubCategoriesLoading(false); // Reset loading state
//     }
//   };

//   console.log(subCategories);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => {
//         if (key === "imageUrl") {
//           if (data.imageUrl[0]) {
//             formData.append("imageUrl", data.imageUrl[0]);
//           }
//         } else {
//           formData.append(key, data[key]);
//         }
//       });

//       const response = await fetch(`${BASE_URL}api/v1/software/add-software`, {
//         method: "POST",
//         body: formData,
//       });

//       const responseData = await response.json();

//       if (responseData.success) {
//         onAdd();
//         onClose();
//         reset();
//         toast.success(responseData.message);
//       } else {
//         setError(responseData.message || "Failed to add software");
//       }
//     } catch (err) {
//       setError("Failed to add software. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen p-4">
//         <div className="fixed inset-0 bg-black opacity-50"></div>

//         <div className="relative bg-white rounded-lg w-full max-w-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Add New Software
//             </h2>
//             <button
//               onClick={handleClose}
//               className="text-gray-400 hover:text-gray-500"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Software Name
//               </label>
//               <input
//                 {...register("name", {
//                   required: "Name is required",
//                   minLength: {
//                     value: 2,
//                     message: "Name must be at least 2 characters",
//                   },
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {errors.name && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 {...register("category", { required: "Category is required" })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.category && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.category.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Sub Category
//               </label>
//               <select
//                 {...register("subCategory", {
//                   required: "Sub Category is required",
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={!selectedCategory || subCategoriesLoading}
//               >
//                 <option value="">
//                   {subCategoriesLoading ? "Loading..." : "Select Sub Category"}
//                 </option>
//                 {subCategories.map((subCategory) => (
//                   <option key={subCategory._id} value={subCategory._id}>
//                     {subCategory.name}
//                   </option>
//                 ))}
//               </select>

//               {errors.subCategory && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.subCategory.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 {...register("description", {
//                   required: "Description is required",
//                   minLength: {
//                     value: 10,
//                     message: "Description must be at least 10 characters",
//                   },
//                 })}
//                 rows="3"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {errors.description && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.description.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Score
//               </label>
//               <input
//                 type="number"
//                 {...register("score", {
//                   required: "Score is required",
//                   min: { value: 0, message: "Score must be at least 0" },
//                   max: { value: 10, message: "Score must not exceed 10" },
//                 })}
//                 step="0.1"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {errors.score && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.score.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Image
//               </label>
//               <input
//                 type="file"
//                 accept="imageUrl/*"
//                 {...register("imageUrl", {
//                   required: "Image is required",
//                   validate: {
//                     fileSize: (files) =>
//                       !files[0] ||
//                       files[0].size <= 5000000 ||
//                       "Image must be less than 5MB",
//                   },
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {errors.imageUrl && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.imageUrl.message}
//                 </p>
//               )}
//             </div>

//             <div className="flex justify-end space-x-3 mt-6">
//               <button
//                 type="button"
//                 onClick={handleClose}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Adding..." : "Add Software"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductModal;
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { fetchCategories } from "../../../api/category_api/category";
import { fetchSubCategoriesByCategoryId } from "../../../api/subcategory_api/subcatgegory";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../url";

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      score: "",
      category: "",
      subCategory: "",
      imageUrl: null,
    },
  });

  const selectedCategory = watch("category");

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedCategory) {
      loadSubCategories(selectedCategory);
      setValue("subCategory", "");
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory, setValue]);

  const loadCategories = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load categories");
    }
  };

  const loadSubCategories = async (categoryId) => {
    try {
      setSubCategoriesLoading(true);
      const subCategoriesData = await fetchSubCategoriesByCategoryId(
        categoryId
      );
      setSubCategories(subCategoriesData);
    } catch (err) {
      console.error("Error loading subcategories:", err);
      setError("Failed to load subcategories: " + err.message);
      setSubCategories([]);
    } finally {
      setSubCategoriesLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "imageUrl") {
          if (data.imageUrl && data.imageUrl[0]) {
            formData.append("imageUrl", data.imageUrl[0]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });

      console.log("FormData fields:", [...formData.entries()]); // Debug

      const response = await fetch(`${BASE_URL}api/v1/software/add-software`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (responseData.success) {
        onAdd();
        onClose();
        reset();
        toast.success(responseData.message);
      } else {
        setError(responseData.message || "Failed to add software");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to add software. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Software
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Software Name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub Category
              </label>
              <select
                {...register("subCategory", {
                  required: "Sub Category is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!selectedCategory || subCategoriesLoading}
              >
                <option value="">
                  {subCategoriesLoading ? "Loading..." : "Select Sub Category"}
                </option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
              {errors.subCategory && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subCategory.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Score
              </label>
              <input
                type="number"
                {...register("score", {
                  required: "Score is required",
                  min: { value: 0, message: "Score must be at least 0" },
                  max: { value: 10, message: "Score must not exceed 10" },
                })}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.score && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.score.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("imageUrl", {
                  required: "Image is required",
                  validate: {
                    fileSize: (files) =>
                      !files[0] ||
                      files[0].size <= 5000000 ||
                      "Image must be less than 5MB",
                    fileType: (files) =>
                      !files[0] ||
                      files[0].type.startsWith("image/") ||
                      "File must be an image",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.imageUrl && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding..." : "Add Software"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
