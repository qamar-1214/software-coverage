import axios from "axios";
import Swal from "sweetalert2";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers["x-auth-token"] = localStorage.getItem("token");
  }
  return req;
});

// Response interceptor to handle 401 errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Display an alert
      Swal.fire({
        title: "Session Expired",
        text: "Your session has expired. Please sign in again.",
        icon: "warning",
        confirmButtonText: "OK",
      });

      // Remove token from localStorage and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default API;
