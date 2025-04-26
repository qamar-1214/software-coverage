import React, { useState, useEffect } from "react";
import Sidebar from "../sidebars/Sidebar";

const Coupons = () => {
  const [activeTab, setActiveTab] = useState("coupons");

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  // Listen for sidebar collapse changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsSidebarCollapsed(
        localStorage.getItem("sidebarCollapsed") === "true"
      );
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(() => {
      setIsSidebarCollapsed(
        localStorage.getItem("sidebarCollapsed") === "true"
      );
    }, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div
        className={`flex-1 flex justify-center items-start mt-10 p-6 ${
          isSidebarCollapsed ? "pl-20 sm:pl-24" : "pl-80"
        }`}
      >
        <div className="w-full px-4 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Coupons</h2>
            <p className="text-gray-700 text-center">
              Your coupons will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
