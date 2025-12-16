import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import RecentClubsCard from "./RecentClubsCard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Link } from "react-router";

const RecentClubs = () => {
  const axiosSecure = useAxiosSecure();
  const currentStatus = "approved";

  const { data: clubsData = {}, isLoading } = useQuery({
    queryKey: ["recent-clubs", currentStatus],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/recent-clubs?status=${currentStatus}`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-5xl font-bold text-center py-5">
        Recent <span className="text-pink-500">Clubs</span>{" "}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2 pb-5">
        {clubsData.map((club,i) => (
          <RecentClubsCard key={club._id} club={club} i={i} />
        ))}
      </div>

      <button className="flex mx-auto">
        <Link
          to={"/clubs"}
          className="btn btn-sm hover:bg-blue-500 text-lg bg-pink-500 p-5 my-5 border-none"
        >
          More Clubs
        </Link>
      </button>
    </div>
  );
};

export default RecentClubs;
