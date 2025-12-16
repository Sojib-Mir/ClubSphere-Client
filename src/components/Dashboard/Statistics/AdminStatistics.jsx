import { FaUserAlt, FaUsers } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
import UseTitle from "../../../hooks/useTitle";
import AdminChart from "../../../pages/Dashboard/Admin/AdminChart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { MdManageAccounts, MdOutlinePendingActions } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { Link } from "react-router";

const AdminStatistics = () => {
  UseTitle("Admin-Statistics");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const currentStatus = "pending";

  // user get api
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });

  // manager request get api
  const { data: requests = [], isLoading: mqLoading } = useQuery({
    queryKey: ["manager-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/manager-requests`);
      return res.data;
    },
  });

  // clubs get api
  const { data: clubs = [], isLoading: clubLoading } = useQuery({
    queryKey: ["clubs", currentStatus],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/clubs?status=${currentStatus}`
      );
      return result.data;
    },
  });

  // transaction history get apis
  const { data: transactionsHistory = [], isLoading: tranLoading } = useQuery({
    queryKey: ["transactions-history"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/payment-history`
      );
      return result.data;
    },
  });

  if (isLoading && mqLoading && clubLoading & tranLoading)
    return <LoadingSpinner />;

  return (
    <>
      <div>
        <div className="mt-12">
          {/* small cards */}
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow">
            {/* Total Users */}
            <Link
              to={"/dashboard/manage-users"}
              className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-100"
            >
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
              >
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans leading-normal font-bold">
                  Total Users
                </p>
                <h4 className="block antialiased tracking-normal font-sans font-semibold leading-snug text-orange-400">
                  Found ({users.length})
                </h4>
              </div>
            </Link>

            {/* Total Manager Request */}
            <Link
              to={"/dashboard/manager-requests"}
              className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-100"
            >
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
              >
                <MdManageAccounts className="w-6 h-6 text-white" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans leading-normal font-semibold">
                  Manager Requests
                </p>
                <h4 className="block antialiased tracking-normal font-sans font-semibold leading-snug text-blue-600">
                  Found ({requests.length})
                </h4>
              </div>
            </Link>

            {/* Total Pending Clubs */}
            <Link
              to={"/dashboard/manage-clubs"}
              className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-100"
            >
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
              >
                <MdOutlinePendingActions className="w-6 h-6 text-white" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-lg leading-normal font-semibold text-blue-gray-600">
                  Pending Clubs
                </p>
                <h4 className="block antialiased tracking-normal font-sans  font-semibold leading-snug text-pink-600">
                  Found ({clubs.length})
                </h4>
              </div>
            </Link>

            {/* Total Transactions History */}
            <Link
              to={"/dashboard/transactions-history"}
              className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-100"
            >
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
              >
                <GrTransaction className="w-6 h-6 text-white" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans leading-normal font-semibold text-blue-gray-600">
                  Transactions History
                </p>
                <h4 className="block antialiased tracking-normal font-sans  font-semibold leading-snug text-green-600">
                  Found({transactionsHistory.length})
                </h4>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <AdminChart
          stats={{
            users: users.length,
            requests: requests.length,
            clubs: clubs.length,
            transactions: transactionsHistory.length,
          }}
        />
      </div>
    </>
  );
};

export default AdminStatistics;
