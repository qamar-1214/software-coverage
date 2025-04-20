import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/navigation/User/navbar/Navbar";
import Footer from "./components/navigation/User/footer/Footer";
import Banner from "./components/home/Banner";
import Awards from "./components/home/Awards";
import TrustedOrganizations from "./components/home/TrustedOrganizaitons";
import PopularSoftwareCategories from "./components/home/PopularSoftwareCategories";
import CompaniesTestomonial from "./components/home/CompaniesTestomonial";
import AllSoftwareCategories from "./components/home/AllSoftwareCategories";
import FAQ from "./components/home/FAQ";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Banner />
      <TrustedOrganizations />
      <PopularSoftwareCategories />
      <CompaniesTestomonial />
      <AllSoftwareCategories />
      <FAQ />
      <Awards />
      <Footer />
    </>
  );
}

export default App;
