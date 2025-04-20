// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers/rootReducer.js";

// const store = configureStore({
// 	reducer: rootReducer,
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/auth/auth.js";
import rootReducer from "./reducers/rootReducer.js";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
