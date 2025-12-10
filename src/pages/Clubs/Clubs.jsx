import React from "react";
import ClubCard from "./ClubCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Clubs = () => {
  
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/clubs`);
      return result.data;
    },
  });

  console.log(clubs);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-center py-5">
        All <span className="text-pink-500">Clubs</span>{" "}
      </h1>

      <div className="flex flex-row justify-between items-center py-4 px-4 mb-px">
        {/* Search Bar */}
        <div className="w-full md:w-3/12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by clubs name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 transition duration-150 shadow-sm"
            />
            {/* search icon */}
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

        {/* filter by category */}
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 w-5/12 md:w-auto ms-2">
          {/* dropdown */}
          <select
            className="w-full sm:w-40 py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 bg-white 
                     dark:bg-[#1D232A] dark:text-white dark:border-gray-700"
          >
            <option value="">Filter by Category</option>
            <option value="photography">Photography</option>
            <option value="sports">Sports</option>
            <option value="tech">Tech</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2 pb-5">
        {clubs.map((club) => (
          <ClubCard key={club._id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default Clubs;
