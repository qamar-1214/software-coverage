import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import router from "./components/routes/Routes.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        transition={Bounce}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
