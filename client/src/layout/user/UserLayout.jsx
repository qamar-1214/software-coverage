import React from "react";
import Navbar from "../../components/navigation/User/navbar/Navbar";
import Footer from "../../components/navigation/User/footer/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default UserLayout;
