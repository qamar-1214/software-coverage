import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }
  cb(new Error("Only image files are allowed."), false);
};

// Function to create multer middleware for a specific field name
const createUploadMiddleware = (fieldName) => {
  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter,
  }).single(fieldName);
};

export { createUploadMiddleware };
