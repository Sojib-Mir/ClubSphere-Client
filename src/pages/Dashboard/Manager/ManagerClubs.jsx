import { useQuery } from "@tanstack/react-query";
import ManagerMyClubsDataRow from "../../../components/Dashboard/TableRows/ManagerMyClubsDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseTitle from "../../../hooks/useTitle";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManagerClubs = () => {
  UseTitle("Manage-Clubs");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // const { data: manageClubs = [], isLoading } = useQuery({
  //   queryKey: ["manage-clubs", user?.email],
  //   enabled: !!user?.email && !loading,

  //   queryFn: async () => {
  //     const result = await axiosSecure(
  //       `${import.meta.env.VITE_API_URL}/manage-clubs?email=${user?.email}`
  //     );
  //     return result.data;
  //   },
  // });

  // console.log(manageClubs);

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

  console.log(manageClubs);

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-2">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Location
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Delete
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {manageClubs.map((club) => (
                    <ManagerMyClubsDataRow key={club._id} club={club} />
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

export default ManagerClubs;
