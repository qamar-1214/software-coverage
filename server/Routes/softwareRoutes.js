import express from "express";
import {
  getAllSoftware,
  getTopSoftwareByCategory,
  addSoftware,
  getAllSoftwareByCategoryWithPagination,
  deleteSoftware,
  updateSoftware,
  getAllSoftwaresAdmin,
} from "../Controllers/softwareController.js";
import { createUploadMiddleware } from "../Middlewares/multer.js";

const softwareRouter = express.Router();

softwareRouter.post(
  "/add-software",
  createUploadMiddleware("imageUrl"),
  addSoftware
);
//to get top 6 softwares by category
softwareRouter.get(
  "/:subcategoryId/get-top-software",
  getTopSoftwareByCategory
);
//to get all softwares with pagination by category (20 per page)
softwareRouter.get(
  "/:subcategoryId/get-all-softwares",
  getAllSoftwareByCategoryWithPagination
);

softwareRouter.get("/get-all-softwares", getAllSoftware);
softwareRouter.get("/get-all-softwares-admin", getAllSoftwaresAdmin);

softwareRouter.put(
  "/update-software/:id",
  createUploadMiddleware("imageUrl"),
  updateSoftware
);
softwareRouter.delete("/delete-software/:id", deleteSoftware);
export default softwareRouter;
