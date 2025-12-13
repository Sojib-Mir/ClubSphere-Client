import useAuth from "./../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";
import ManagerRequestsDataRow from "../../../components/Dashboard/TableRows/ManagerRequestsDataRow";

const ManagerRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manager-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/manager-requests`);
      return res.data;
    },
  });

  console.log(requests);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="border p-2">
                  {/* email */}
                  <th
                    scope="col"
                    className="px-5 py-3 border border-gray-200 text-left text-sm uppercase font-normal"
                  >
                    Email
                  </th>

                  {/* action */}
                  <th
                    scope="col"
                    className="px-5 py-3 border border-gray-200 text-left text-sm uppercase font-normal"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <ManagerRequestsDataRow
                    key={req._id}
                    req={req}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerRequests;
