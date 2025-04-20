import Software from "../Models/softwareModel.js";
import SubCategory from "../Models/subCategoryModel.js";
import cloudinary from "cloudinary";

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
    if (!req.files || !req.files.imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    const imageFile = req.files.imageUrl;

    // Parse score and validate
    const parsedScore = parseFloat(score);
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 10) {
      return res.status(400).json({
        success: false,
        message: "Score must be a number between 0 and 10.",
      });
    }

    // Check if software with the same name and subCategory already exists
    const existingSoftware = await Software.findOne({
      name: name,
      subCategory: subCategory,
    });

    if (existingSoftware) {
      return res.status(400).json({
        success: false,
        message: "Software with this name already exists in the subcategory.",
      });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
      imageFile.tempFilePath
    );

    if (!cloudinaryResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary.",
      });
    }

    // Create a new software entry
    const newSoftware = new Software({
      name,
      description,
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add software.",
      error: error.message,
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

// export const updateSoftware = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, subCategory, category, score, features } = req.body;
//   const imageFile = req.files?.imageUrl;

//   try {
//     const updates = {};

//     if (name) updates.name = name;
//     if (description) updates.description = description;
//     if (subCategory) updates.subCategory = subCategory;
//     if (category) updates.category = category;
//     if (score) updates.score = score;

//     if (features) {
//       // Ensure the features are in the correct format (array of strings)
//       const parsedFeatures = Array.isArray(features)
//         ? features
//         : JSON.parse(features); // If it's passed as a string, parse it
//       updates.features = parsedFeatures;
//     }

//     if (imageFile) {
//       const cloudinaryResponse = await cloudinary.v2.uploader.upload(imageFile.tempFilePath);
//       updates.imageUrl = { public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url };
//     }

//     const updatedSoftware = await Software.findByIdAndUpdate(id, updates, { new: true });

//     if (!updatedSoftware) {
//       return res.status(404).json({ success: false, message: "Software not found" });
//     }

//     res.status(200).json({ success: true, message: "Software updated successfully", data: updatedSoftware });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to update software", error: err.message });
//   }
// };

// Usman
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
  const imageFile = req.files?.imageUrl;

  try {
    const updates = {};

    // Update basic fields
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (subCategory) updates.subCategory = subCategory;
    if (category) updates.category = category;
    if (score) updates.score = score;

    // Handle features field
    if (features) {
      // Ensure the features are in the correct format (array of strings)
      const parsedFeatures = Array.isArray(features)
        ? features
        : JSON.parse(features); // If it's passed as a string, parse it
      updates.features = parsedFeatures;
    }

    // Handle deployment field
    if (deployment) {
      // Ensure the deployment is in the correct format (array of strings)
      const parsedDeployment = Array.isArray(deployment)
        ? deployment
        : JSON.parse(deployment); // If it's passed as a string, parse it
      updates.deployment = parsedDeployment;
    }

    // Handle pricingoption field
    if (pricingoption) {
      // Ensure the pricingoption is in the correct format (array of strings)
      const parsedPricingoption = Array.isArray(pricingoption)
        ? pricingoption
        : JSON.parse(pricingoption); // If it's passed as a string, parse it
      updates.pricingoption = parsedPricingoption;
    }

    // Handle bestfor field
    if (bestfor) {
      // Ensure the bestfor is in the correct format (array of strings)
      const parsedBestfor = Array.isArray(bestfor)
        ? bestfor
        : JSON.parse(bestfor); // If it's passed as a string, parse it
      updates.bestfor = parsedBestfor;
    }

    // Handle image upload
    if (imageFile) {
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(
        imageFile.tempFilePath
      );
      updates.imageUrl = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    // Update the software document
    const updatedSoftware = await Software.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedSoftware) {
      return res
        .status(404)
        .json({ success: false, message: "Software not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Software updated successfully",
        data: updatedSoftware,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update software",
        error: err.message,
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

// export const getAllSoftwaresAdmin = async (req, res) => {
//   try {
//     // Fetch all softwares and populate category and subCategory with their id and name
//     const softwares = await Software.find()
//       .select("_id name description score category subCategory imageUrl features") // Include 'features' field in the response
//       .sort({ name: 1 })
//       .populate("category", "_id name")
//       .populate("subCategory", "_id name");

//     res.status(200).json({
//       success: true,
//       message: "Software fetched successfully",
//       data: {
//         softwares,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Software!",
//       error: error.message,
//     });
//   }
// };

// export const getAllSoftwaresAdmin = async (req, res) => {
//   try {
//     const { features } = req.query; // get features filter from query params

//     const query = {};

//     if (features) {
//       query.features = { $in: features.split(",") }; // Filter based on features array
//     }

//     const softwares = await Software.find(query)
//       .select("_id name description score category subCategory imageUrl features")
//       .populate("category", "_id name")
//       .populate("subCategory", "_id name")
//       .sort({ name: 1 });

//     res.status(200).json({
//       success: true,
//       message: "Software fetched successfully",
//       data: {
//         softwares,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Software!",
//       error: error.message,
//     });
//   }
// };

// Usman
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
