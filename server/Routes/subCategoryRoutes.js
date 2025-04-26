import express from "express";
import {
  getSubCategoriesByCategory,
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  getTopSubCategories,
  deleteSubCategory,
  updateSubCategory,
  getAllSubCategoriesWithDescription,
  getSubCategoriesForNav,
  getAllSubCategoriesAdmin,
  getSubCategoryBySlug,
} from "../Controllers/subCategoryController.js";
import { createUploadMiddleware } from "../middlewares/multer.js";

const subCategoryRouter = express.Router();

// Route to get subcategories by category
subCategoryRouter.get(
  "/:categoryId/get-sub-categories",
  getSubCategoriesByCategory
);

subCategoryRouter.get(
  "/:categoryId/get-sub-categories-nav",
  getSubCategoriesForNav
);
subCategoryRouter.get("/get-sub-category-by-id/:id", getSubCategoryById);

//get subcategories with pagination (24 per page)
subCategoryRouter.get("/get-all-subcategories", getAllSubCategories);
subCategoryRouter.get(
  "/get-all-subcategories-with-description",
  getAllSubCategoriesWithDescription
);

subCategoryRouter.post(
  "/add-subcategory",
  createUploadMiddleware("imageUrl"),
  addSubCategory
);

subCategoryRouter.get("/get-popular-subcategories", getTopSubCategories);

subCategoryRouter.get("/get-sub-category-by-slug/:slug", getSubCategoryBySlug);

subCategoryRouter.delete(
  "/delete-subcategory/:subCategoryId",
  deleteSubCategory
);
subCategoryRouter.put(
  "/update-subcategory/:subCategoryId",
  createUploadMiddleware("imageUrl"),

  updateSubCategory
);

subCategoryRouter.get("/get-sub-category-admin", getAllSubCategoriesAdmin);

export default subCategoryRouter;
