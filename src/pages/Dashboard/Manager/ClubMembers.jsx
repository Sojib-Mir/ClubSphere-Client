import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseTitle from "../../../hooks/useTitle";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ManagerClubMembarsDataRow from "../../../components/Dashboard/TableRows/ManagerClubMembarsDataRow";

const ClubMembers = () => {
  UseTitle("Manage-Club-Membars");
  const axiosSecure = useAxiosSecure();

  const {
    data: manageMemberShips = {},
    isLoading: manageMemberShipsLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-memberships"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/manage-memberships`
      );
      return result.data;
    },
  });

  if (manageMemberShipsLoading) return <LoadingSpinner />;

  return (
    <>
      {manageMemberShips.length === 0 ? (
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
                No Members Yet!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                There are currently **It looks like **no users have joined your club yet.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                You're all caught up with club management!
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
                        Found({manageMemberShips.length})
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        User Name
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
                        Club Name
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Joined Club
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
                    {manageMemberShips.map((membar) => (
                      <ManagerClubMembarsDataRow
                        key={membar._id}
                        membar={membar}
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

export default ClubMembers;
