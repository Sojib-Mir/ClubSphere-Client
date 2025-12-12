import { FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import UseTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Link } from "react-router";

const CustomerStatistics = () => {
  UseTitle("My-Statistics");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myclubs = [], isLoading } = useQuery({
    queryKey: ["my-clubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/my-clubs?email=${user?.email}`
      );
      return result.data;
    },
  });

  const { data: myEvents = [] } = useQuery({
    queryKey: ["my-event", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/my-events?email=${user?.email}`
      );
      return result.data;
    },
  });

  const { data: myPayments = [] } = useQuery({
    queryKey: ["/my-payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/my-payment-history?email=${
          user?.email
        }`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 grow">
          {/* Total Join Clubs */}
          <Link
            to={"/dashboard/my-clubs"}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-100"
          >
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Joined Clubs
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-lg font-semibold leading-snug text-blue-gray-900">
                Found ({myclubs.length})
              </h4>
            </div>
          </Link>

          {/* Total Registered Events */}
          <Link
            to={"/dashboard/my-events"}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-100"
          >
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              <BsFillCartPlusFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Registered Events
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-lg font-semibold leading-snug text-blue-gray-900">
                Found ({myEvents.length})
              </h4>
            </div>
          </Link>

          {/* Total Payment History */}
          <Link
            to={"/dashboard/payment-history"}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-100"
          >
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
            >
              <BsFillHouseDoorFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Payment History
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-lg font-semibold leading-snug text-blue-gray-900">
                Found ({myPayments.length})
              </h4>
            </div>
          </Link>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Sales Bar Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            {/* Chart goes here.. */}
          </div>
          {/* Calender */}
          <div className=" relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            {/* Calender */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatistics;
