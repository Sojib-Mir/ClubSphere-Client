import React from "react";
import { Link } from "react-router";

const RecentClubsCard = ({ club }) => {
  const feeText =
    club.membershipFee === 0 ? "Free" : `BDT ${club.membershipFee}/month`;

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
      {/* image + category */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-xl hover:scale-106 transition-transform duration-200"
          src={club.bannerImage}
          alt={club.clubName}
        />
        {/* category */}
        <span className="absolute top-3 left-3 px-3 py-1 text-sm font-semibold text-white bg-blue-700 rounded-md shadow-md">
          {club.category.toUpperCase()}
        </span>
      </div>

      {/* card details */}
      <div className="p-2">
        <h2 className="font-bold text-2xl text-gray-900 mb-2 truncate">
          {club.clubName}
        </h2>

        {/* Locaiton */}
        <p className="text-gray-600 text-sm flex items-center mb-1.5">
          <svg
            className="w-4 h-4 mr-1 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {club.location}
        </p>

        {/* description */}
        <p className="text-gray-700 text-base mb-1.5 overflow-hidden line-clamp-2">
          {club.description}
        </p>

        {/* fee */}
        <span className="text-gray-600 flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 20a10 10 0 110-20 10 10 0 010 20zm-2-12a1 1 0 000 2h4a1 1 0 000-2H8z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
          {feeText}
        </span>
      </div>

      {/* See Details */}
      <div className="px-2 pb-5 pt-0">
        <Link
          to={`/clubs/:id`}
          className="btn border-none w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-150"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default RecentClubsCard;
