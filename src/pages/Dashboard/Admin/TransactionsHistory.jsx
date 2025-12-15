import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Link } from "react-router";
import UseTitle from "../../../hooks/useTitle";
import AdminTransactionsHistory from "../../../components/Dashboard/TableRows/AdminTransactionsHistory";

const TransactionsHistory = () => {
  UseTitle("Transactions-History");
  const axiosSecure = useAxiosSecure();

  const { data: transactionsHistory = [], isLoading } = useQuery({
    queryKey: ["transactions-history"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/payment-history`
      );
      return result.data;
    },
  });

  console.log(transactionsHistory);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {transactionsHistory.length === 0 ? (
        <div className="flex justify-center items-center mx-auto min-h-screen ">
          <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-xl max-w-lg mx-auto mt-10 border border-gray-100">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
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

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No Transaction History Found
            </h2>

            <p className="text-gray-600 text-center mb-6">
              It looks like you haven't joined any clubs or completed a
              transaction yet.
            </p>

            <Link
              to="/clubs"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Explore Clubs
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-2">
          <div className="py-2">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                      >
                        Club Name
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                      >
                        club Id
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                      >
                        Price
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                      >
                        Transaction Id
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                      >
                        Payment Date
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-sky-200 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-semibold"
                      >
                        User Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionsHistory.map((payment) => (
                      <AdminTransactionsHistory
                        key={payment._id}
                        payment={payment}
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

export default TransactionsHistory;
