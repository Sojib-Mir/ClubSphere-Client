import React from "react";
import { Link } from "react-router";

const EventCard = ({ event }) => {
  const formatToBDT = (dateString, includeTime = true) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    };
    if (includeTime) {
      options.hour = "2-digit";
      options.minute = "2-digit";
    }
    const datePart = date.toLocaleDateString("en-GB", options);
    const timePart = includeTime
      ? date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Dhaka",
        })
      : "";
    return `${datePart.split(",")[0]} | ${timePart.replace(",", "")}`;
  };

  const { _id, eventDate, title, description, image, location, clubName } =
    event || {};

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white border border-gray-300 dark:border-gray-700">
      {/* Image */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-xl hover:scale-106 transition-transform duration-200"
          src={image}
          alt={title}
        />
        {/* Club Name */}
        <span className="absolute bottom-1 right-8 px-3 py-1 text-sm font-semibold text-white bg-black/50 rounded-md shadow-md">
          Hosted by: {clubName}
        </span>
      </div>

      {/* body */}
      <div className="p-2">
        {/* event date */}
        <div className="text-sm font-semibold text-blue-600 mb-1.5">
          <span className="text-[16px]">Start Time:</span>{" "}
          <span className="bg-blue-100 px-px rounded-md">
            {formatToBDT(eventDate)} BDT
          </span>
        </div>

        {/* event name */}
        <h2 className="font-bold text-2xl text-gray-900 mb-1.5 truncate">
          {title}
        </h2>

        {/* location */}
        <p className="text-gray-600 text-sm flex items-center mb-1.5">
          <svg
            className="w-5 h-5 mr-1 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {location}
        </p>

        {/* description */}
        <p className="text-gray-700 text-base mb-1.5 overflow-hidden line-clamp-2">
          {description}
        </p>
      </div>

      {/* See Details */}
      <div className="px-2 pb-5 pt-0">
        <Link
          to={`/events/${_id}`}
          event={event}
          className="btn border-none w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-150"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
