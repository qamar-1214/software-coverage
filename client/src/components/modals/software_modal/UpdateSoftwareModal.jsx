// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { fetchSubCategoriesByCategoryId } from "../../../api/subcategory_api/subcatgegory";
// import { fetchCategories } from "../../../api/category_api/category";
// import { BASE_URL } from "../../../url";
// import Select from "react-select";
// import axios from "axios";

// const UpdateProductModal = ({ isOpen, onClose, productData, onUpdate }) => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);
//   const [features, setFeatures] = useState([]);
//   const [selectedFeatures, setSelectedFeatures] = useState([]);

//   const [deployments, setDeployments] = useState([]);
//   const [selectedDeployments, setSelectedDeployments] = useState([]);

//   const [pricingOptions, setPricingOptions] = useState([]);
//   const [selectedPricingOptions, setSelectedPricingOptions] = useState([]);

//   const [bestFor, setBestFor] = useState([]);
//   const [selectedBestFor, setSelectedBestFor] = useState([]);

//   const [error, setError] = useState(null);

//   const selectedCategory = watch("category");

//   useEffect(() => {
//     if (!isOpen || !productData) return;

//     reset({
//       name: productData.name,
//       description: productData.description,
//       score: productData.score,
//       category: productData.category._id,
//       subCategory: productData.subCategory._id,
//     });
//     setSelectedFeatures(productData.features || []);
//     setBestFor(productData.bestfor || []);
//     setDeployments(productData.deployments || []);
//     setPricingOptions(productData.pricingOptions || []);
//   }, [isOpen, productData, reset]);

//   useEffect(() => {
//     if (!isOpen || !productData) return;

//     const loadData = async () => {
//       try {
//         const categoriesData = await fetchCategories();
//         setCategories(categoriesData);

//         setSubCategoriesLoading(true);
//         const subCategoriesData = await fetchSubCategoriesByCategoryId(
//           productData.category._id
//         );
//         setSubCategories(subCategoriesData);
//         setSubCategoriesLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setSubCategoriesLoading(false);
//       }
//     };

//     loadData();
//   }, [isOpen, productData]);

//   useEffect(() => {
//     if (!selectedCategory || !isOpen) return;

//     if (selectedCategory === productData?.category._id) return;

//     const loadSubCategories = async () => {
//       try {
//         setSubCategoriesLoading(true);
//         const subCategoriesData = await fetchSubCategoriesByCategoryId(
//           selectedCategory
//         );
//         setSubCategories(subCategoriesData);
//         setValue("subCategory", "");
//         setSubCategoriesLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setSubCategories([]);
//         setSubCategoriesLoading(false);
//       }
//     };

//     loadSubCategories();
//   }, [selectedCategory, productData, setValue, isOpen]);

//   useEffect(() => {
//     const loadSubCategories = async () => {
//       try {
//         setSubCategoriesLoading(true);
//         const subCategoriesData = await fetchSubCategoriesByCategoryId(
//           selectedCategory || productData.category._id
//         );
//         setSubCategories(subCategoriesData);

//         if (productData?.subCategory._id) {
//           setValue("subCategory", productData.subCategory._id);
//         }
//         setFeatures([
//           {
//             value: "Access Controls/Permissions",
//             label: "Access Controls/Permissions",
//           },
//           { value: "Accounting", label: "Accounting" },
//           {
//             value: "Approval Process Control",
//             label: "Approval Process Control",
//           },
//           { value: "API", label: "API" },
//           { value: "Audit Trail", label: "Audit Trail" },
//           { value: "Billing & Invoicing", label: "Billing & Invoicing" },
//         ]);

//         setDeployments([
//           { value: "Cloud, SaaS, Web-Based", label: "Cloud, SaaS, Web-Based" },
//           { value: "Mobile - Android", label: "Mobile - Android" },
//           { value: "Mobile - iPhone", label: "Mobile - iPhone" },
//           { value: "Mobile - iPad", label: "Mobile - iPad" },
//           { value: "Desktop - Mac", label: "Desktop - Mac" },
//           { value: "Desktop - Windows", label: "Desktop - Windows" },
//         ]);

//         setPricingOptions([
//           { value: "Subscription", label: "Subscription" },
//           { value: "Lifetime License", label: "Lifetime License" },
//           { value: "Free Trial", label: "Free Trial" },
//           { value: "Free Version", label: "Free Version" },
//         ]);

//         setBestFor([
//           { value: "StartUps", label: "StartUps" },
//           { value: "Freelancers", label: "Freelancers" },
//           { value: "Small Business", label: "Small Business" },
//           { value: "Medium Business", label: "Medium Business" },
//           { value: "Large Enterprise", label: "Large Enterprise" },
//           {
//             value: "Non-profit Organization",
//             label: "Non-profit Organization",
//           },
//         ]);
//       } catch (err) {
//         setError("Failed to load subcategories: " + err.message);
//         setSubCategories([]);
//       } finally {
//         setSubCategoriesLoading(false);
//       }
//     };

//     if (selectedCategory || productData) {
//       loadSubCategories();
//     }
//   }, [selectedCategory, productData, setValue]);

//   const onSubmit = async (data) => {
//     try {
//       const updatedData = new FormData();
//       updatedData.append("name", data.name);
//       updatedData.append("description", data.description);
//       updatedData.append("score", data.score);
//       updatedData.append("category", data.category);
//       updatedData.append("subCategory", data.subCategory);

//       updatedData.append(
//         "features",
//         JSON.stringify(selectedFeatures.map((f) => f.value))
//       );
//       updatedData.append(
//         "pricingoption",
//         JSON.stringify(selectedPricingOptions.map((f) => f.value))
//       );
//       updatedData.append(
//         "deployment",
//         JSON.stringify(selectedDeployments.map((f) => f.value))
//       );
//       updatedData.append(
//         "bestfor",
//         JSON.stringify(selectedBestFor.map((f) => f.value))
//       );

//       if (data.image[0]) {
//         updatedData.append("image", data.image[0]);
//       }

//       const response = await axios.put(
//         `${BASE_URL}api/v1/software/update-software/${productData._id}`,
//         updatedData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Update successful:", response.data);
//       onUpdate();
//       onClose();
//     } catch (err) {
//       console.error("Error updating software:", err.message);
//       setError("Failed to update software. Please try again.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 max-h-[580px] overflow-y-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Update Product
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               {...register("name", { required: "Name is required" })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//             {errors.name && (
//               <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               {...register("description", {
//                 required: "Description is required",
//               })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             ></textarea>
//             {errors.description && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Score
//             </label>
//             <input
//               type="number"
//               {...register("score", { required: "Score is required" })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//             {errors.score && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.score.message}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Category
//             </label>
//             <select
//               {...register("category", { required: "Category is required" })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Category</option>
//               {categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//             {errors.category && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.category.message}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Sub Category
//             </label>
//             <select
//               {...register("subCategory", {
//                 required: "Sub Category is required",
//               })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={!selectedCategory || subCategoriesLoading}
//             >
//               <option value="">
//                 {subCategoriesLoading ? "Loading..." : "Select Sub Category"}
//               </option>
//               {subCategories.map((subCategory) => (
//                 <option key={subCategory._id} value={subCategory._id}>
//                   {subCategory.name}
//                 </option>
//               ))}
//             </select>
//             {errors.subCategory && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.subCategory.message}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Features
//             </label>
//             <Select
//               isMulti
//               name="features"
//               options={features}
//               value={selectedFeatures}
//               onChange={setSelectedFeatures}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Pricing Options
//             </label>
//             <Select
//               isMulti
//               name="pricingOptions"
//               options={pricingOptions}
//               value={selectedPricingOptions}
//               onChange={setSelectedPricingOptions}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Deployment
//             </label>
//             <Select
//               isMulti
//               name="Deployments"
//               options={deployments}
//               value={selectedDeployments}
//               onChange={setSelectedDeployments}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Best For
//             </label>
//             <Select
//               isMulti
//               name="bestfor"
//               options={bestFor}
//               value={selectedBestFor}
//               onChange={setSelectedBestFor}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Product Image
//             </label>
//             {productData.imageUrl && (
//               <img
//                 src={productData.imageUrl.url}
//                 alt={productData.name}
//                 className="w-24 h-24 object-cover mb-2 rounded-md"
//               />
//             )}
//             <input
//               type="file"
//               {...register("image")}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               accept="image/*"
//             />
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded-md mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProductModal;
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react"; // Added for close button icon
import { fetchSubCategoriesByCategoryId } from "../../../api/subcategory_api/subcatgegory";
import { fetchCategories } from "../../../api/category_api/category";
import { BASE_URL } from "../../../url";
import Select from "react-select";
import { toast } from "react-toastify"; // Added for success/error notifications
import axios from "axios";

const UpdateProductModal = ({ isOpen, onClose, productData, onUpdate }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
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

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [selectedDeployments, setSelectedDeployments] = useState([]);
  const [pricingOptions, setPricingOptions] = useState([]);
  const [selectedPricingOptions, setSelectedPricingOptions] = useState([]);
  const [bestFor, setBestFor] = useState([]);
  const [selectedBestFor, setSelectedBestFor] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added for loading state

  const selectedCategory = watch("category");

  // Initialize form with product data
  useEffect(() => {
    if (!isOpen || !productData) return;

    console.time("resetForm"); // Debug
    reset({
      name: productData.name || "",
      description: productData.description || "",
      score: productData.score || "",
      category: productData.category?._id || "",
      subCategory: productData.subCategory?._id || "",
      imageUrl: null,
    });
    setSelectedFeatures(
      (productData.features || []).map((f) => ({ value: f, label: f }))
    );
    setSelectedDeployments(
      (productData.deployment || []).map((d) => ({ value: d, label: d }))
    );
    setSelectedPricingOptions(
      (productData.pricingoption || []).map((p) => ({ value: p, label: p }))
    );
    setSelectedBestFor(
      (productData.bestfor || []).map((b) => ({ value: b, label: b }))
    );
    console.timeEnd("resetForm");
  }, [isOpen, productData, reset]);

  // Load categories and subcategories
  useEffect(() => {
    if (!isOpen || !productData) return;

    const loadData = async () => {
      try {
        console.time("loadCategories"); // Debug
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        console.timeEnd("loadCategories");

        console.time("loadSubCategoriesInitial"); // Debug
        setSubCategoriesLoading(true);
        const subCategoriesData = await fetchSubCategoriesByCategoryId(
          productData.category?._id
        );
        setSubCategories(subCategoriesData);
        setSubCategoriesLoading(false);
        console.timeEnd("loadSubCategoriesInitial");
      } catch (err) {
        setError("Failed to load categories or subcategories: " + err.message);
        setSubCategoriesLoading(false);
      }
    };

    loadData();
  }, [isOpen, productData]);

  // Load subcategories when category changes
  useEffect(() => {
    if (
      !selectedCategory ||
      !isOpen ||
      selectedCategory === productData?.category?._id
    )
      return;

    const loadSubCategories = async () => {
      try {
        console.time("loadSubCategories"); // Debug
        setSubCategoriesLoading(true);
        const subCategoriesData = await fetchSubCategoriesByCategoryId(
          selectedCategory
        );
        setSubCategories(subCategoriesData);
        setValue("subCategory", "");
        setSubCategoriesLoading(false);
        console.timeEnd("loadSubCategories");
      } catch (err) {
        setError("Failed to load subcategories: " + err.message);
        setSubCategories([]);
        setSubCategoriesLoading(false);
      }
    };

    loadSubCategories();
  }, [selectedCategory, productData, setValue, isOpen]);

  // Load select options for features, deployments, pricing, and bestFor
  useEffect(() => {
    if (!isOpen) return;

    console.time("loadSelectOptions"); // Debug
    setFeatures([
      {
        value: "Access Controls/Permissions",
        label: "Access Controls/Permissions",
      },
      { value: "Accounting", label: "Accounting" },
      { value: "Approval Process Control", label: "Approval Process Control" },
      { value: "API", label: "API" },
      { value: "Audit Trail", label: "Audit Trail" },
      { value: "Billing & Invoicing", label: "Billing & Invoicing" },
    ]);

    setDeployments([
      { value: "Cloud, SaaS, Web-Based", label: "Cloud, SaaS, Web-Based" },
      { value: "Mobile - Android", label: "Mobile - Android" },
      { value: "Mobile - iPhone", label: "Mobile - iPhone" },
      { value: "Mobile - iPad", label: "Mobile - iPad" },
      { value: "Desktop - Mac", label: "Desktop - Mac" },
      { value: "Desktop - Windows", label: "Desktop - Windows" },
    ]);

    setPricingOptions([
      { value: "Subscription", label: "Subscription" },
      { value: "Lifetime License", label: "Lifetime License" },
      { value: "Free Trial", label: "Free Trial" },
      { value: "Free Version", label: "Free Version" },
    ]);

    setBestFor([
      { value: "StartUps", label: "StartUps" },
      { value: "Freelancers", label: "Freelancers" },
      { value: "Small Business", label: "Small Business" },
      { value: "Medium Business", label: "Medium Business" },
      { value: "Large Enterprise", label: "Large Enterprise" },
      { value: "Non-profit Organization", label: "Non-profit Organization" },
    ]);
    console.timeEnd("loadSelectOptions");
  }, [isOpen]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    console.time("submitUpdateSoftware"); // Debug

    try {
      console.time("constructFormData"); // Debug
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      formData.append("score", data.score);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append(
        "features",
        JSON.stringify(selectedFeatures.map((f) => f.value))
      );
      formData.append(
        "deployment",
        JSON.stringify(selectedDeployments.map((d) => d.value))
      );
      formData.append(
        "pricingoption",
        JSON.stringify(selectedPricingOptions.map((p) => p.value))
      );
      formData.append(
        "bestfor",
        JSON.stringify(selectedBestFor.map((b) => b.value))
      );

      if (data.imageUrl?.[0]) {
        formData.append("imageUrl", data.imageUrl[0]);
      }

      console.log("FormData fields:", [...formData.entries()]);
      console.timeEnd("constructFormData");

      console.time("updateRequest"); // Debug
      const response = await axios.put(
        `${BASE_URL}api/v1/software/update-software/${productData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.timeEnd("updateRequest");

      if (response.data.success) {
        toast.success(response.data.message);
        onUpdate();
        onClose();
        reset();
      } else {
        setError(response.data.message || "Failed to update software");
      }
    } catch (err) {
      console.error("Error updating software:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update software. Please try again."
      );
    } finally {
      setLoading(false);
      console.timeEnd("submitUpdateSoftware");
    }
  };

  const handleClose = () => {
    reset();
    setError(null);
    setSelectedFeatures([]);
    setSelectedDeployments([]);
    setSelectedPricingOptions([]);
    setSelectedBestFor([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Update Product
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Score
            </label>
            <input
              type="number"
              step="0.1"
              {...register("score", {
                required: "Score is required",
                min: { value: 0, message: "Score must be at least 0" },
                max: { value: 10, message: "Score must not exceed 10" },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.score && (
              <p className="mt-1 text-sm text-red-600">
                {errors.score.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700">
              Sub Category
            </label>
            <select
              {...register("subCategory", {
                required: "Sub Category is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            <Select
              isMulti
              name="features"
              options={features}
              value={selectedFeatures}
              onChange={setSelectedFeatures}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deployment
            </label>
            <Select
              isMulti
              name="deployment"
              options={deployments}
              value={selectedDeployments}
              onChange={setSelectedDeployments}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pricing Options
            </label>
            <Select
              isMulti
              name="pricingoption"
              options={pricingOptions}
              value={selectedPricingOptions}
              onChange={setSelectedPricingOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Best For
            </label>
            <Select
              isMulti
              name="bestfor"
              options={bestFor}
              value={selectedBestFor}
              onChange={setSelectedBestFor}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            {productData.imageUrl?.url && (
              <img
                src={productData.imageUrl.url}
                alt={productData.name}
                className="w-24 h-24 object-cover mb-2 rounded-md"
              />
            )}
            <input
              type="file"
              {...register("imageUrl", {
                validate: {
                  fileSize: (files) =>
                    !files?.[0] ||
                    files[0].size <= 2000000 ||
                    "Image must be less than 2MB",
                  fileType: (files) =>
                    !files?.[0] ||
                    files[0].type.startsWith("image/") ||
                    "File must be an image",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              accept="image/*"
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
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
