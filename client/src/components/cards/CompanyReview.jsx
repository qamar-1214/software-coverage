import React from "react";

const CompanyReview = ({ data }) => {
  return (
    <div className="p-6 bg-white shadow-xl rounded-lg mx-4 flex flex-col">
      <div className="flex flex-col md:flex-row items-center justify-center space-x-4 ">
        <div>
          <img
            src={data.image}
            alt={data.name}
            className="w-16 h-16 rounded-full mb-2"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-center truncate">
            {data.name}
          </h3>
          <p className="text-sm text-gray-500 text-center ">{data.title}</p>
        </div>
      </div>
      <div>
        <p className="text-gray-700 text-left mt-4 ">{data.quote}</p>
      </div>
    </div>
  );
};

export default CompanyReview;
