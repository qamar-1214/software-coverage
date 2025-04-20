import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import connectDB from "./Config/dbConfig.js";
import router from "./Routes/indexRoutes.js";
import cors from "cors";
import path from "path";
import cloudinary from "cloudinary";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// Connect to MongoDB and initialize admin
const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Startup error:", error.message);
    process.exit(1);
  }
};
startServer();

app.use(router);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`I am running on ${port}`);
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error";
  res.status(statusCode).json({
    success: false,
    error: true,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
