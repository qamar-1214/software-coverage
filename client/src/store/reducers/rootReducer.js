// import { combineReducers } from "@reduxjs/toolkit";
// import categorySlice from "../slices/categorySlices.js";

// const rootReducer = combineReducers({
// 	category: categorySlice,
// 	// Add more slices here
// });

// export default rootReducer;
import { combineReducers } from "@reduxjs/toolkit";
import categorySlice from "../slices/categorySlices.js";
import { authApi } from "../api/auth/auth.js";
import authSlice from "../slices/auth/authSlice.js";
const rootReducer = combineReducers({
  category: categorySlice,
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
