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
    </>
  );
};

export default ClubMembers;
