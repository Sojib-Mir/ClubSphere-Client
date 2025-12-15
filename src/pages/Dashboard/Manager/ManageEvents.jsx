import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseTitle from "../../../hooks/useTitle";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ManagerEventDataRow from "./../../../components/Dashboard/TableRows/ManagerEventDataRow";

const ManageEvents = () => {
  UseTitle("Manage-Events");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: manageEvents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-events", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/manage-events?email=${user?.email}`
      );

      return result.data;
    },
  });

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <>
      {manageEvents.length === 0 ? (
        <div className="container mx-auto px-4 sm:px-8 py-10 md:py-30">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-lg text-center transform hover:scale-[1.02] transition duration-300 ease-in-out border-t-4 border-purple-500">
              <svg
                className="w-16 h-16 text-purple-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v5m-4 5h-4"
                ></path>
              </svg>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                No Event Added Yet!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                It appears you **have not added any event..
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Please add a new event to get started.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto sm:px-2">
          <div className="md:py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 md:py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Found({manageEvents.length})
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Event Name
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Event Date
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Event Id
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Update
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {manageEvents.map((event) => (
                      <ManagerEventDataRow
                        key={event._id}
                        event={event}
                        refetch={refetch}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageEvents;
