import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseTitle from "../../../hooks/useTitle";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ManagerRegisterEventsDataRow from "../../../components/Dashboard/TableRows/ManagerRegisterEventsDataRow";

const RagisterEvents = () => {
  UseTitle("Manage-Event-Register");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: registerEvent = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["register-event", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/register-event?email=${user?.email}`
      );
      return result.data;
    },
  });

  console.log(registerEvent);

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <>
      {registerEvent.length === 0 ? (
        <div className="container mx-auto px-4 sm:px-8 py-10 md:py-30">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-lg text-center transform hover:scale-[1.02] transition duration-300 ease-in-out border-t-4 border-green-500">
              {/* আইকন: তথ্য বা খালি তালিকার জন্য */}
              <svg
                className="w-16 h-16 text-green-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                No Registrations Yet!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                It appears that **no users have registered for this event** at
                the moment.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Please check back later or promote your event further.
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
                      <th className="px-5 py-3 bg-sky-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Found({registerEvent.length})
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        User Email
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Event Name
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Event Id
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Joined Event
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {registerEvent.map((register) => (
                      <ManagerRegisterEventsDataRow
                        key={register._id}
                        register={register}
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

export default RagisterEvents;
