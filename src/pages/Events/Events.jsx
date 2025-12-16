import React, { useState } from "react";
import EventCard from "./EventCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Events = () => {
  const [search, setSearchTerm] = useState("");

  const {
    data: events = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["events", search],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/events?&search=${search}`
      );
      return result.data;
    },
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-5">
        <h1 className="text-4xl md:text-6xl font-bold text-center pt-5">
          Amazing <span className="text-pink-500">Events</span>{" "}
        </h1>
        <p className="dark:text-gray-400 text-black/60 mt-2 text-xl md:text-2xl font-medium">
          Join exciting events happening in your favorite clubs.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end items-center py-4 mb-4">
        <div className="w-full md:w-3/12 relative">
          <input
            type="text"
            onChange={handleSearchChange}
            value={search}
            placeholder="Search by events name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 transition duration-150 shadow-sm"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Loading Logic */}
      {isLoading || isFetching ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 pb-5">
          {events.length > 0 ? (
            events.map((event, i) => (
              <EventCard key={event._id} event={event} i={i} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <p className="text-3xl text-red-500 font-semibold">
                No events found matching your criteria.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-blue-500 underline"
              >
                Clear Search Value
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
