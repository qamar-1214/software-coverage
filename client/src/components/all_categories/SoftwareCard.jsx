import React from "react";
import { Link } from "react-router-dom";
import slugify from "slugify"; 

const SoftwareCard = ({ name, image }) => {
  const slug = slugify(name, { lower: true, strict: true });

  return (
    <Link to={`/categories/${slug}`}>
      <div className="flex flex-col drop-shadow-xl">
        <div className="bg-white rounded-xl p-2 hover:shadow-lg transition-shadow">
          <div className="w-full p-2">
            <div className="space-y-2">
              <div className="rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center h-auto">
                <img
                  src={image || "/noimage.png"}
                  alt={`${name} software`}
                  className="object-contain h-32 w-32"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-left">
          <h3 className="text-xl pl-2 pt-2 font-medium text-gray-800">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default SoftwareCard;
