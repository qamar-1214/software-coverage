import React from "react";
import Banner from "../../components/home/Banner";
import TrustedOrganizations from "../../components/home/TrustedOrganizaitons";
import PopularSoftwareCategories from "../../components/home/PopularSoftwareCategories";
import CompaniesTestimonial from "../../components/home/CompaniesTestomonial";
import AllSoftwareCategories from "../../components/home/AllSoftwareCategories";
import FAQ from "../../components/home/FAQ";
import Awards from "../../components/home/Awards";

const Home = () => {
  return (
    <>
      <Banner />
      <TrustedOrganizations />
      <PopularSoftwareCategories />
      <CompaniesTestimonial />
      <Awards />
      <AllSoftwareCategories />
      <FAQ />
    </>
  );
};

export default Home;
