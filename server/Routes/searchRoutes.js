import express, { Router } from "express";
import {
  searchItems,
  searchSoftwareAndCategByName,
  searchSubCategories,
  getSortedSubCategories,
  getStaticSearchResults,
  searchByOptions,
} from "../Controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/nav-search", searchItems);
searchRouter.get("/banner-search", searchSoftwareAndCategByName);
searchRouter.get("/categ-search", searchSubCategories);
searchRouter.get("/sort-sub-categories", getSortedSubCategories);
searchRouter.get("/get-static-searchitems", getStaticSearchResults);
searchRouter.get("/search-by-options", searchByOptions);

export default searchRouter;
