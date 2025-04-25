import Category from "../Models/categoryModel.js";
import SubCategory from "../Models/subCategoryModel.js";
import Software from "../Models/softwareModel.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
export const getSubCategoriesForNav = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const subCategories = await SubCategory.find({
      category: categoryId,
      IsNavItem: true,
    })
      .select("_id name")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      message: "Subcategories fetched successfully",
      data: {
        subCategories,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch the subcategories!",
      error: error.message,
    });
  }
};

// Usman
export const getSubCategoryBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const subCategory = await SubCategory.findOne({ slug })
      .populate("category", "name")
      .populate("software");

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found." });
    }

    res.status(200).json({
      success: true,
      message: "SubCategory fetched successfully.",
      data: subCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch SubCategory.",
      error: error.message,
    });
  }
};

export const getSubCategoriesByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const subCategories = await SubCategory.find({
      category: categoryId,
    })
      .select("_id name")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      message: "Subcategories fetched successfully",
      data: {
        subCategories,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch the subcategories!",
      error: error.message,
    });
  }
};

export const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).select(
      "_id name"
    );
    res.status(200).json({
      success: true,
      message: "Subcategories fetched successfully",
      data: {
        subCategory,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategories!",
      error: error.message,
    });
  }
};
export const getAllSubCategories = async (req, res) => {
  const { page = 1 } = req.query; // Default to page 1 if no page is provided
  const limit = 24; // Subcategories per page

  try {
    // Fetch paginated subcategories
    const subCategories = await SubCategory.find()
      .select("name imageUrl") // Fetch only the name of the subcategories
      .sort({ name: 1 })
      .skip((page - 1) * limit) // Skip records for previous pages
      .limit(limit);

    // Count the total number of subcategories for pagination metadata
    const totalCount = await SubCategory.countDocuments();

    // Construct and send the response
    res.status(200).json({
      success: true,
      message: "Subcategories fetched successfully",
      data: {
        subCategories: subCategories,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategories!",
      error: error.message,
    });
  }
};

export const getAllSubCategoriesWithDescription = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .select("name imageUrl description category softwares")
      .populate("category", "name") // Populate category name
      .populate("softwares"); // Populate software names

    res.status(200).json({
      success: true,
      message: "Subcategories fetched successfully",
      data: {
        subCategories,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategories!",
      error: error.message,
    });
  }
};

export const addSubCategory = async (req, res) => {
  const { name, description, categoryId, softwareIds, IsNavItem, IsPopCateg } =
    req.body;

  try {
    if (!name || !description || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, description, categoryId) are required.",
      });
    }

    // Validate file presence
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    const category = await Category.findById(categoryId).lean();
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Check for duplicate subcategory (name within category)

    const existingSubCategory = await SubCategory.findOne({
      name: name.trim(),
      category: categoryId,
    }).lean();
    if (existingSubCategory) {
      return res.status(409).json({
        success: false,
        message:
          "Subcategory with the same name already exists in this category.",
      });
    }

    // Upload to Cloudinary using buffer

    const cloudinaryResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "subcategories",
          public_id: `subcategory_${uuidv4()}_${Date.now()}`,
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

    // Parse software IDs

    let softwareIdsArray = [];
    if (softwareIds) {
      try {
        softwareIdsArray = Array.isArray(softwareIds)
          ? softwareIds
          : JSON.parse(softwareIds);
      } catch (parseError) {
        console.error("Error parsing softwareIds:", parseError);
        return res.status(400).json({
          success: false,
          message: "Invalid softwareIds format.",
        });
      }
    }

    // Create new subcategory

    const newSubCategory = new SubCategory({
      name: name.trim(),
      description: description.trim(),
      category: categoryId,
      softwares: softwareIdsArray,
      imageUrl: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      IsNavItem: IsNavItem === "true" || IsNavItem === true,
      IsPopCateg: IsPopCateg === "true" || IsPopCateg === true,
    });

    await newSubCategory.save();

    res.status(201).json({
      success: true,
      message: "Subcategory added successfully.",
      data: newSubCategory,
    });
  } catch (error) {
    console.error("Error adding subcategory:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add subcategory.",
      error: true,
    });
  }
};
export const getTopSubCategories = async (req, res) => {
  try {
    const popularSubCategories = await SubCategory.find({ IsPopCateg: true })
      .sort({ name: 1 }) // Sort by name in ascending order (a, b, c...)
      .select("_id name"); // Only select necessary fields

    res.status(200).json({
      success: true,
      message: "Popular subcategories fetched successfully",
      data: {
        subCategories: popularSubCategories,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch the popular subcategories!",
      error: error.message,
    });
  }
};

export const deleteSubCategory = async (req, res) => {
  const { subCategoryId } = req.params;

  try {
    // Find the subcategory first
    const subCategory = await SubCategory.findOne({ _id: subCategoryId });

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
      });
    }

    // Delete associated image from Cloudinary if `imageUrl` exists
    if (subCategory.imageUrl && subCategory.imageUrl.public_id) {
      await cloudinary.v2.uploader.destroy(subCategory.imageUrl.public_id);
    }

    // Delete the subcategory
    await SubCategory.deleteOne({ _id: subCategoryId });

    res.status(200).json({
      success: true,
      message: "SubCategory and all related software deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete subcategory.",
      error: error.message,
    });
  }
};

export const updateSubCategory = async (req, res) => {
  const { subCategoryId } = req.params;
  const {
    name,
    description,
    categoryId,
    softwareIds,
    authors,
    existingImageUrl,
    IsPopCateg,
  } = req.body;

  try {
    if (!name || !description || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, description, categoryId) are required.",
      });
    }

    const [category, subCategory, duplicateSubCategory] = await Promise.all([
      Category.findById(categoryId).lean(),
      SubCategory.findById(subCategoryId).lean(),
      SubCategory.findOne({
        name: name.trim(),
        category: categoryId,
        _id: { $ne: subCategoryId },
      }).lean(),
    ]);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
      });
    }
    if (duplicateSubCategory) {
      return res.status(409).json({
        success: false,
        message:
          "Subcategory with the same name already exists in this category.",
      });
    }

    const updates = {
      name: name.trim(),
      description: description.trim(),
      category: categoryId,
      IsPopCateg: IsPopCateg === "true" || IsPopCateg === true,
    };

    // Handle multiple software IDs
    if (softwareIds) {
      try {
        const softwareIdsArray = Array.isArray(softwareIds)
          ? softwareIds
          : JSON.parse(softwareIds);
        updates.softwares = softwareIdsArray;
      } catch (parseError) {
        console.error("Error parsing softwareIds:", parseError);
        return res.status(400).json({
          success: false,
          message: "Invalid softwareIds format.",
        });
      }
    }

    // Handle authors update
    if (authors) {
      try {
        const parsedAuthors = Array.isArray(authors)
          ? authors
          : JSON.parse(authors);
        updates.authors = parsedAuthors.map((author) => ({
          name: author.name || "",
          role: author.role || "",
          workRole: author.workRole || "",
          title: author.title || "",
          paragraph: author.paragraph || "",
          socialLinks: author.socialLinks || [],
          questionsAnswers: author.questionsAnswers || [],
        }));
      } catch (parseError) {
        console.error("Error parsing authors:", parseError);
        return res.status(400).json({
          success: false,
          message: "Invalid authors format.",
        });
      }
    }

    if (req.file) {
      // Upload new image to Cloudinary and delete old image concurrently
      const [cloudinaryResponse] = await Promise.all([
        new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            {
              folder: "subcategories",
              public_id: `subcategory_${subCategoryId}_${uuidv4()}_${Date.now()}`,
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
        subCategory.imageUrl?.public_id
          ? cloudinary.v2.uploader
              .destroy(subCategory.imageUrl.public_id)
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
    } else if (existingImageUrl && subCategory.imageUrl?.url) {
      // Retain existing image
      updates.imageUrl = subCategory.imageUrl;
    } else {
      return res.status(400).json({
        success: false,
        message: "Image is required if no existing image is provided.",
      });
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
    if (!updatedSubCategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "SubCategory updated successfully.",
      data: updatedSubCategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update subcategory.",
      error: true,
    });
  }
};

export const getAllSubCategoriesAdmin = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .select("name imageUrl description category softwares authors") // Include authors field
      .populate({
        path: "category",
        select: "_id name",
      })
      .populate({
        path: "softwares",
      })
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      message: "Subcategories fetched successfully",
      data: {
        subCategories: subCategories,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategories!",
      error: error.message,
    });
  }
};
