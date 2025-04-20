import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CompanyReview from "../cards/CompanyReview";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { compantTestomonialdata } from "../../text/homePageText/homeText";

const CompaniesTestimonial = () => {
  const slider = React.useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        <h2 className="text-4xl font-medium mb-8 text-center">
          See why thousands of <br />
          companies love Software Coverage
        </h2>
        <Slider ref={slider} {...settings}>
          {compantTestomonialdata.map((review, index) => (
            <div key={index}>
              <CompanyReview data={review} />
            </div>
          ))}
        </Slider>
        <div className="flex flex-row items-center justify-center mt-6">
          <button
            onClick={() => slider?.current?.slickPrev()}
            className="btn py-1 px-3 rounded-lg  bg-white border border-gray-300"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className="btn py-1 px-3 rounded-lg ml-5 bg-white border border-gray-300"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesTestimonial;
