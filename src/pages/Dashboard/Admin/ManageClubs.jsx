import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseTitle from "../../../hooks/useTitle";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AdminManageClubsDataRow from "../../../components/Dashboard/TableRows/AdminManageClubsDataRow";

const ManageClubs = () => {
  UseTitle("Manage-Clubs");
  const axiosSecure = useAxiosSecure();
  const currentStatus = "pending";

  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["clubs", currentStatus],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/clubs?status=${currentStatus}`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {clubs.length === 0 ? (
        <div className="container mx-auto px-4 sm:px-8 py-10 md:py-30">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-lg text-center transform hover:scale-[1.02] transition duration-300 ease-in-out border-t-4 border-sky-500">
              <svg
                className="w-16 h-16 text-sky-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                All Clubs Reviewed!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                There are currently **No Pending Club Requests** requiring
                approval.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                You're all caught up with club management!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-2">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden border-t border-t-gray-100">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      {/* Table Headers */}
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                      >
                        Club Id
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                      >
                        Club Name
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                      >
                        Manager Email
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                      >
                        Membership Fee
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800 text-sm uppercase font-semibold"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {clubs.map((club) => (
                      <AdminManageClubsDataRow
                        key={club?._id}
                        club={club}
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

export default ManageClubs;
