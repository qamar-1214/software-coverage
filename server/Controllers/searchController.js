import SubCategory from "../Models/subCategoryModel.js";
import Software from "../Models/softwareModel.js";

export const searchItems = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Query parameter is required",
    });
  }

  try {
    // Fetch matching subcategories and softwares
    const [subCategories, softwares] = await Promise.all([
      SubCategory.find({ name: { $regex: query, $options: "i" } }).select(
        "_id name"
      ),
      Software.find({ name: { $regex: query, $options: "i" } }).select(
        "_id name"
      ),
    ]);

    res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      data: { subCategories, softwares },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch search results!",
      error: error.message,
    });
  }
};

export const searchSoftwareAndCategByName = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Query parameter is required",
    });
  }

  try {
    // Search for matching software
    const softwares = await Software.find({
      name: { $regex: query, $options: "i" },
    })
      .select("_id name imageUrl")
      .limit(10);

    // Search for matching subcategories
    const subcategories = await SubCategory.find({
      name: { $regex: query, $options: "i" },
    })
      .select("_id name")
      .limit(10);

    res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      data: {
        softwares,
        subcategories,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch search results!",
      error: error.message,
    });
  }
};

export const searchSubCategories = async (req, res) => {
  const { keyword, page = 1 } = req.query;
  const limit = 24;

  try {
    // Build regex for partial, case-insensitive matches
    const regex = new RegExp(keyword, "i");

    const subCategories = await SubCategory.find({ name: regex })
      .select("_id name")
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const subCategoryWithSoftwares = await Promise.all(
      subCategories.map(async (subCategory) => {
        const topSoftwares = await Software.find({
          subCategory: subCategory._id,
        })
          .select("_id imageUrl") // Fetch only id and imageUrl
          .sort({ score: -1 })
          .limit(4)
          .lean();

        return {
          name: subCategory.name,
          topSoftwares,
        };
      })
    );

    const totalCount = await SubCategory.countDocuments({ name: regex });

    res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      data: {
        subCategories: subCategoryWithSoftwares,
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
      message: "Failed to fetch search results!",
      error: error.message,
    });
  }
};

export const getSortedSubCategories = async (req, res) => {
  const { page = 1, sort = "asc" } = req.query;
  const limit = 24; // Subcategories per page
  const sortOrder = sort === "desc" ? -1 : 1; // Determine sorting order

  try {
    // Fetch subcategories with pagination and sorting
    const subCategories = await SubCategory.find()
      .select("_id name")
      .sort({ name: sortOrder }) // Dynamic sorting based on query
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Fetch top 4 software for each subcategory
    const subCategoryWithSoftwares = await Promise.all(
      subCategories.map(async (subCategory) => {
        const topSoftwares = await Software.find({
          subCategory: subCategory._id,
        })
          .select("_id imageUrl")
          .sort({ score: -1 }) // Sort by score descending
          .limit(4)
          .lean();

        return { name: subCategory.name, topSoftwares };
      })
    );

    // Count total subcategories for pagination
    const totalCount = await SubCategory.countDocuments();

    res.status(200).json({
      success: true,
      message: `Subcategories fetched successfully (${
        sort === "desc" ? "Z to A" : "A to Z"
      })`,
      data: {
        subCategories: subCategoryWithSoftwares,
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

export const getStaticSearchResults = async (req, res) => {
  try {
    // Fetch 3 software items
    const staticSoftwares = await Software.find({})
      .select("_id name imageUrl")
      .limit(3); // Limit to 3 results

    // Fetch 3 subcategories
    const staticSubcategories = await SubCategory.find({})
      .select("_id name")
      .limit(3); // Limit to 3 results

    res.status(200).json({
      success: true,
      message: "Static search results fetched successfully",
      data: {
        softwares: staticSoftwares,
        subcategories: staticSubcategories,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch static search results!",
      error: error.message,
    });
  }
};

export const searchByOptions = async (req, res) => {
  try {
    const { searchQuery, options } = req.query;

    const sanitizedSearchQuery = searchQuery;

    const search_options = options ? options.split(",") : ["all"];

    const Query = {
      $or: [
        { name: { $regex: sanitizedSearchQuery, $options: "i" } },
        { description: { $regex: sanitizedSearchQuery, $options: "i" } },
      ],
    };

    // Initialize arrays for each category
    let categoryResults = [];
    let softwareResults = [];

    // Perform searches based on options
    if (
      search_options.includes("all") ||
      search_options.includes("categories")
    ) {
      categoryResults = await SubCategory.find(Query);
    }

    if (search_options.includes("all") || search_options.includes("software")) {
      softwareResults = await Software.find(Query);
    }

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: {
        categories: categoryResults,
        software: softwareResults,
        totalResults: categoryResults.length + softwareResults.length,
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
