import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  // Allow all image MIME types
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }
  cb(new Error("Only image files are allowed."), false);
};

fs.mkdir("Uploads", { recursive: true }).catch((err) => {
  console.error("Failed to create Uploads/ folder:", err.message);
});

const uploadFields = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
}).single("profileImage");

export default uploadFields;
