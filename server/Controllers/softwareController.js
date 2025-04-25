import Software from "../Models/softwareModel.js";
import SubCategory from "../Models/subCategoryModel.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import Category from "../Models/categoryModel.js";

export const addSoftware = async (req, res) => {
  const { name, description, subCategory, category, score } = req.body;

  try {
    // Validate required fields
    if (
      !name ||
      !description ||
      !subCategory ||
      !category ||
      score === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (name, description, subCategory, category, and score) are required.",
      });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    // Parse score and validate
    const parsedScore = parseFloat(score);
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 10) {
      return res.status(400).json({
        success: false,
        message: "Score must be a number between 0 and 10.",
      });
    }

    // Validate category existence

    const categoryExists = await Category.findById(category).lean();
    console.timeEnd("checkCategory");
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Validate subcategory existence

    const subCategoryExists = await SubCategory.findById(subCategory).lean();
    console.timeEnd("checkSubCategory");
    if (!subCategoryExists) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
      });
    }

    // Check if software with the same name and subCategory already exists

    const existingSoftware = await Software.findOne({
      name: name.trim(),
      subCategory,
    }).lean();

    if (existingSoftware) {
      return res.status(409).json({
        success: false,
        message: "Software with this name already exists in the subcategory.",
      });
    }

    // Upload image to Cloudinary using buffer

    const cloudinaryResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "softwares",
          public_id: `software_${uuidv4()}_${Date.now()}`,
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer); // Upload buffer directly
    });

    if (!cloudinaryResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary.",
      });
    }

    // Create a new software entry
    const newSoftware = new Software({
      name: name.trim(),
      description: description.trim(),
      subCategory,
      category,
      score: parsedScore,
      imageUrl: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    // Save the software in the database

    await newSoftware.save();

    res.status(201).json({
      success: true,
      message: "Software added successfully.",
      data: newSoftware,
    });
  } catch (error) {
    console.error("Error adding software:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add software.",
      error: true,
    });
  }
};
export const getTopSoftwareByCategory = async (req, res) => {
  const { subcategoryId } = req.params;

  try {
    const category = await SubCategory.findById(subcategoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const topSoftwareByScore = await Software.find({
      subCategory: subcategoryId,
    })
      .select("name score imageUrl createdAt")
      .sort({ score: -1 })
      .limit(6);
    const sortedTopSoftware = topSoftwareByScore.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    res.status(200).json({
      success: true,
      message: "Software fetched successfully",
      data: {
        topSoftware: sortedTopSoftware,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch the software!",
      error: error.message,
    });
  }
};

export const getAllSoftware = async (req, res) => {
  try {
    // Fetch all categories, sorted alphabetically
    const softwares = await Software.find()
      .select("_id name description score category subCategory imageUrl")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      message: "Software fetched successfully",
      data: {
        softwares,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Software!",
      error: error.message,
    });
  }
};

export const getAllSoftwareByCategoryWithPagination = async (req, res) => {
  const { subcategoryId } = req.params;
  const { page = 1 } = req.query; // Default to page 1 if not provided

  try {
    const category = await SubCategory.findById(subcategoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Convert page to a number and calculate the number of items to skip
    const pageNumber = parseInt(page, 10);
    const limit = 20;
    const skip = (pageNumber - 1) * limit;

    const totalCount = await Software.countDocuments({
      subCategory: subcategoryId,
    });
    const softwareList = await Software.find({ subCategory: subcategoryId })
      .populate({
        path: "subCategory",
        select: "name",
      })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Software fetched successfully",
      data: {
        software: softwareList,
        pagination: {
          totalItems: totalCount,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalCount / limit),
          itemsPerPage: limit,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch the software!",
      error: error.message,
    });
  }
};

export const updateSoftware = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    subCategory,
    category,
    score,
    features,
    deployment,
    pricingoption,
    bestfor,
  } = req.body;

  try {
    // Validate required fields
    console.time("validateInput");
    if (
      !name ||
      !description ||
      !subCategory ||
      !category ||
      score === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (name, description, subCategory, category, score) are required.",
      });
    }

    // Parse and validate score
    const parsedScore = parseFloat(score);
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 10) {
      return res.status(400).json({
        success: false,
        message: "Score must be a number between 0 and 10.",
      });
    }

    const [
      categoryExists,
      subCategoryExists,
      existingSoftware,
      currentSoftware,
    ] = await Promise.all([
      Category.findById(category).lean(),
      SubCategory.findById(subCategory).lean(),
      Software.findOne({
        name: name.trim(),
        subCategory,
        _id: { $ne: id },
      }).lean(),
      Software.findById(id).select("imageUrl").lean(),
    ]);

    if (!categoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found." });
    }
    if (!subCategoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found." });
    }
    if (existingSoftware) {
      return res.status(409).json({
        success: false,
        message: "Software with this name already exists in the subcategory.",
      });
    }
    if (!currentSoftware) {
      return res
        .status(404)
        .json({ success: false, message: "Software not found." });
    }

    // Prepare updates

    const updates = {
      name: name.trim(),
      description: description.trim(),
      subCategory,
      category,
      score: parsedScore,
    };

    // Helper function to parse and validate array fields
    const parseArrayField = (field, fieldName) => {
      try {
        const parsed = Array.isArray(field) ? field : JSON.parse(field);
        if (
          !Array.isArray(parsed) ||
          !parsed.every((item) => typeof item === "string" && item.trim())
        ) {
          throw new Error(
            `${fieldName} must be an array of non-empty strings.`
          );
        }
        return parsed.map((item) => item.trim());
      } catch (error) {
        throw new Error(`Invalid ${fieldName} format: ${error.message}`);
      }
    };

    // Handle array fields
    if (features) updates.features = parseArrayField(features, "features");
    if (deployment)
      updates.deployment = parseArrayField(deployment, "deployment");
    if (pricingoption)
      updates.pricingoption = parseArrayField(pricingoption, "pricingoption");
    if (bestfor) updates.bestfor = parseArrayField(bestfor, "bestfor");

    // Handle image upload

    if (req.file) {
      // Upload new image to Cloudinary and delete old image concurrently
      const [cloudinaryResponse] = await Promise.all([
        new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            {
              folder: "softwares",
              public_id: `software_${id}_${uuidv4()}_${Date.now()}`,
              transformation: [{ quality: "auto", fetch_format: "auto" }],
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(req.file.buffer); // Upload buffer directly
        }),
        currentSoftware.imageUrl?.public_id
          ? cloudinary.v2.uploader
              .destroy(currentSoftware.imageUrl.public_id)
              .catch((e) =>
                console.warn("Failed to delete old image:", e.message)
              )
          : Promise.resolve(null),
      ]);

      if (!cloudinaryResponse) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to Cloudinary.",
        });
      }

      updates.imageUrl = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    const updatedSoftware = await Software.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updatedSoftware) {
      return res
        .status(404)
        .json({ success: false, message: "Software not found" });
    }

    res.status(200).json({
      success: true,
      message: "Software updated successfully",
      data: updatedSoftware,
    });
  } catch (error) {
    console.error("Error updating software:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update software",
      error: true,
    });
  }
};

export const deleteSoftware = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the software to delete
    const software = await Software.findById(id);

    if (!software) {
      return res.status(404).json({
        success: false,
        message: "Software not found.",
      });
    }

    // Delete associated image from Cloudinary using the stored `public_id`
    const publicId = software.imageUrl.public_id; // Access `public_id` from the imageUrl object
    if (publicId) {
      await cloudinary.v2.uploader.destroy(publicId);
    }

    // Delete the software from the database
    await Software.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Software deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete software.",
      error: error.message,
    });
  }
};

export const getAllSoftwaresAdmin = async (req, res) => {
  try {
    const { features, deployment, pricingoption, bestfor } = req.query; // get filters from query params

    const query = {};

    // Filter by features
    if (features) {
      query.features = { $in: features.split(",") }; // Filter based on features array
    }

    // Filter by deployment options
    if (deployment) {
      query.deployment = { $in: deployment.split(",") }; // Filter based on deployment array
    }

    // Filter by pricing options
    if (pricingoption) {
      query.pricingoption = { $in: pricingoption.split(",") }; // Filter based on pricing option array
    }

    // Filter by best-for options
    if (bestfor) {
      query.bestfor = { $in: bestfor.split(",") }; // Filter based on best-for array
    }

    const softwares = await Software.find(query)
      .select(
        "_id name description score category subCategory imageUrl features deployment pricingoption bestfor"
      )
      .populate("category", "_id name")
      .populate("subCategory", "_id name")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      message: "Software fetched successfully",
      data: {
        softwares,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Software!",
      error: error.message,
    });
  }
};
