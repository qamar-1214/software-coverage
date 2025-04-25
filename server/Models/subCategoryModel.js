// import mongoose from "mongoose";

// const SubCategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//     required: true,
//   }, // Referenced to Category
//   IsNavItem: { type: Boolean, default: false },
//   IsPopCateg: { type: Boolean, default: false },
//   imageUrl: {
//     public_id: { type: String, required: true },
//     url: { type: String, required: true },
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// SubCategorySchema.pre(
//   "deleteOne",
//   { document: false, query: true },
//   async function (next) {
//     const Software = mongoose.model("Software");

//     // Get the subcategory ID from the query conditions
//     const subCategoryId = this.getQuery()._id;

//     try {
//       // Check if the subcategory exists before deleting related software
//       const subCategory = await this.model.findOne({ _id: subCategoryId });

//       if (!subCategory) {
//         // If the subcategory does not exist, skip the software deletion
//         return next();
//       }

//       // Delete software linked to this subcategory
//       await Software.deleteMany({ subCategory: subCategoryId });

//       next();
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// SubCategorySchema.index({ name: 1, category: 1 }, { unique: true });
// SubCategorySchema.index({ category: 1 });
// SubCategorySchema.index({ name: "text", description: "text" });

// const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

// export default SubCategory;

// import mongoose from "mongoose";
// import slugify from "slugify";

// const SubCategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   slug: { type: String, unique: true }, // New field for slug
//   description: { type: String, required: true },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//     required: true,
//   },
//   softwares: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Software",
//     },
//   ],

//   IsNavItem: { type: Boolean, default: false },
//   IsPopCateg: { type: Boolean, default: false },
//   imageUrl: {
//     public_id: { type: String, required: true },
//     url: { type: String, required: true },
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// // Generate slug before saving
// SubCategorySchema.pre("save", function (next) {
//   if (this.isModified("name")) {
//     this.slug = slugify(this.name, { lower: true, strict: true });
//   }
//   next();
// });

// SubCategorySchema.index({ name: 1, category: 1 }, { unique: true });
// SubCategorySchema.index({ category: 1 });
// SubCategorySchema.index({ name: "text", description: "text" });

// const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

// export default SubCategory;

import mongoose from "mongoose";
import slugify from "slugify";

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  workRole: { type: String },
  socialLinks: [
    {
      platform: String,
      url: String,
    },
  ],
  title: { type: String },
  paragraph: { type: String },
  questionsAnswers: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
});

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  softwares: [{ type: mongoose.Schema.Types.ObjectId, ref: "Software" }],
  authors: [AuthorSchema], // Embedded authors array
  imageUrl: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },

  createdAt: { type: Date, default: Date.now },
});

// Generate slug before saving
SubCategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

SubCategorySchema.index({ name: 1, category: 1 }, { unique: true });
SubCategorySchema.index({ category: 1 });
SubCategorySchema.index({ name: "text", description: "text" });

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

export default SubCategory;
