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
      <div className="container mx-auto sm:px-2">
        <div className="md:py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 md:py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-sky-20 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      Found({manageEvents.length})
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Image
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
    </>
  );
};

export default ManageEvents;
