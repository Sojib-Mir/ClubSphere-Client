import React, { useState } from "react";
import ClubCard from "./ClubCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Clubs = () => {
  const currentStatus = "approved";
  const [search, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const {
    data: clubs = [],
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["clubs", currentStatus, search, category],
    queryFn: async () => {
      const result = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/clubs?status=${currentStatus}&search=${search}&filter=${category}`
      );
      return result.data;
    },
  });

  const handleSelect = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("");
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center pt-8 py-10">
        Explore <span className="text-pink-500"> All </span>Clubs
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 px-4 mb-6">
        {/* Search Bar */}
        <div className="w-full md:w-4/12 relative">
          <input
            type="text"
            placeholder="Search by clubs name..."
            onChange={handleSearchChange}
            value={search}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 transition duration-150 shadow-sm dark:bg-[#1D232A] dark:text-white"
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

        {/* Filter Dropdown */}
        <div className="w-full md:w-auto">
          <select
            onChange={handleSelect}
            value={category}
            className="w-full md:w-60 py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 bg-white dark:bg-[#1D232A] dark:text-white dark:border-gray-700"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology & Coding</option>
            <option value="Art&Creative">Art & Creative Design</option>
            <option value="Sports&Fitness">Sports & Fitness</option>
            <option value="Education">Education & Academics</option>
            <option value="Health">Health & Wellness</option>
            <option value="Music">Music & Performance</option>
            <option value="Books&Reading">Books & Reading</option>
            <option value="Gaming">Gaming</option>
            <option value="Science">Science & Research</option>
            <option value="Arts&Culture">Arts & Culture</option>
            <option value="Career">Career & Business</option>
            <option value="Finance">Finance & Investing</option>
            <option value="Photography">Photography & Film</option>
            <option value="Nature&Gardening">Nature & Gardening</option>
            <option value="Food&Cooking">Food & Cooking</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2 pb-10">
          {clubs.length > 0 ? (
            clubs.map((club, i) => (
              <ClubCard key={club._id} club={club} i={i} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center mt-20">
              <p className="text-center text-red-500 text-4xl font-bold ">
                No clubs found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {isFetching && !isLoading && (
        <div className="fixed bottom-5 right-5">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500"></div>
        </div>
      )}
    </div>
  );
};

export default Clubs;
