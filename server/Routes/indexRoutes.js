import express from "express";
import softwareRouter from "./softwareRoutes.js";
import subCategoryRouter from "./subCategoryRoutes.js";
import categoryRouter from "./categoryRoutes.js";
import searchRouter from "./searchRoutes.js";
import adminRouter from "./adminRoutes.js";
import authRouter from "./authRoutes.js";
import reviewRouter from "./reviewRoutes.js";

const router = express.Router();

router.use("/api/v1/software", softwareRouter);
router.use("/api/v1/sub-category", subCategoryRouter);
router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/search", searchRouter);
router.use("/api/v1/admin", adminRouter);
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/review", reviewRouter);

export default router;
