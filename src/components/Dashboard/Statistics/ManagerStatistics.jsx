import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { Link } from "react-router";
import UseTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const ManagerStatistics = () => {
  UseTitle("Manager-Statistics");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  // Manage Club Get
  const { data: manageClubs = [], isLoading } = useQuery({
    queryKey: ["manage-clubs", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/manage-clubs?email=${user?.email}`
      );
      return result.data;
    },
  });

  // Manage Event Get
  const { data: manageEvents = [], isLoading: eventLoading } = useQuery({
    queryKey: ["manage-events", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/manage-events?email=${user?.email}`
      );

      return result.data;
    },
  });

  // Manage MemberShip Get
  const { data: manageMemberShips = {}, isLoading: manageMemberShipsLoading } =
    useQuery({
      queryKey: ["manage-memberships"],
      queryFn: async () => {
        const result = await axiosSecure(
          `${import.meta.env.VITE_API_URL}/manage-memberships`
        );
        return result.data;
      },
    });

  //Manage Event Register Get
  const { data: eventRegister = [], isLoading: eventRegisterLoading } =
    useQuery({
      queryKey: ["event-register", user?.email],
      enabled: !!user?.email && !loading,
      queryFn: async () => {
        const result = await axiosSecure(
          `${import.meta.env.VITE_API_URL}/event-register?email=${user?.email}`
        );
        return result.data;
      },
    });

  if (
    isLoading &&
    loading &&
    eventLoading &&
    eventRegisterLoading &&
    manageMemberShipsLoading
  )
    return <LoadingSpinner />;

  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 grow">
          {/* My Total Clubs */}
          <div className="h-30 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-300">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-3xl font-semibold leading-normal text-blue-gray-600">
                Total Clubs
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={"/dashboard/manager-clubs"}
                  className="ml-40  bg-pink-500/20 md:ml-80 font-semibold md:text-[12px] rounded text-center text-black px-1 mt-2"
                >
                  View All
                </Link>

                <h4 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 text-green-500">
                  Found ({manageClubs.length})
                </h4>
              </div>
            </div>
          </div>

          {/* My Total Events */}
          <div className="h-30 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-300">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              <BsFillCartPlusFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-3xl font-semibold leading-normal text-blue-gray-600">
                Total Events
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={"/dashboard/manage-events"}
                  className="ml-40 md:ml-80 bg-sky-500/20 font-semibold md:text-[12px] rounded text-center text-black px-1 mt-2"
                >
                  View All
                </Link>

                <h4 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 text-green-500">
                  Found ({manageEvents.length})
                </h4>
              </div>
            </div>
          </div>

          {/* My Total Club MemberShip */}
          <div className="h-30 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-300">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
            >
              <BsFillHouseDoorFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-3xl font-semibold leading-normal  text-blue-gray-600">
                Total Club Members
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={"/dashboard/club-members"}
                  className="ml-40 md:ml-80 bg-lime-500/30 font-semibold md:text-[12px] rounded text-center text-black px-1 mt-2"
                >
                  View All
                </Link>

                <h4 className="block antialiased tracking-normal font-sans text-xl md:text-2xl font-semibold leading-snug text-blue-gray-900 text-green-500">
                  Found ({manageMemberShips.length})
                </h4>
              </div>
            </div>
          </div>

          {/* My Event Total Register Members  */}
          <div className="h-30 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-gray-300">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <FaUserAlt className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-xl md:text-3xl leading-normal font-semibold text-blue-gray-600">
                Total Event Register Members
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={"/dashboard/ragister-events"}
                  className="ml-40  bg-amber-500/30 md:ml-80 font-semibold md:text-[12px] rounded text-center text-black px-1 mt-2"
                >
                  View All
                </Link>

                <h4 className="block antialiased tracking-normal font-sans text-xl md:text-2xl font-semibold leading-snug text-blue-gray-900 text-green-500">
                  Found ({eventRegister.length})
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/*Sales Bar Chart */}
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

export default ManagerStatistics;
