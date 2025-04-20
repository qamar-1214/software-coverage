// src/components/modals/navbar_modal/AdminLoginModal.jsx
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignInMutation } from "../../../store/api/auth/auth";

const AdminLoginModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { isLoading: isSigningIn }] = useSignInMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(form).unwrap();
      if (response?.user?.isAdmin) {
        toast.success("Admin login successful");

        setIsOpen(false);
        setForm({ email: "", password: "" });
        navigate("/admin");
      } else {
        toast.error("Access denied. Admin credentials required.");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm bg-white/30 z-50">
      <div className="bg-white/90 rounded-lg shadow-xl w-full max-w-md p-4 sm:p-6 relative">
        <button
          onClick={() => {
            setIsOpen(false);
            navigate("/"); // Redirect to home
          }}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <div className="space-y-4 sm:space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="text-center flex flex-col items-center">
            <img
              src="/SoftwareCoverage.png"
              alt="SoftwareCoverage"
              className="h-16 sm:h-26 mb-2"
            />
            <h2 className="text-3xl font-[400] text-gray-800">Admin Login</h2>
            <p className="text-gray-600 mt-3 text-lg sm:text-base">
              Enter your admin credentials
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter admin email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full bg-white/90 rounded-lg shadow-sm border border-gray-300 focus:border-black focus:ring-0 px-3 py-2 text-sm sm:text-base"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-1 w-full bg-white/90 rounded-lg shadow-sm border border-gray-300 focus:border-black focus:ring-0 px-3 py-2 text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full bg-purple-600 text-white rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 hover:bg-purple-700 transition-colors text-sm sm:text-base"
            >
              {isSigningIn ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
