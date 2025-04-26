import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/auth/auth.js";
import rootReducer from "./reducers/rootReducer.js";
import { reviewApi } from "./api/review/reviewApi.js";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(reviewApi.middleware),
});

setupListeners(store.dispatch);

export default store;
