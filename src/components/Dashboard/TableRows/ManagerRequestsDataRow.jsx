import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

const ManagerRequestsDataRow = ({ req, refetch, queryKey }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const removeRowFromCache = () => {
    queryClient.setQueryData(queryKey, (oldData) => {
      if (!oldData) return [];

      return oldData.filter((item) => item.email !== req?.email);
    });
  };

  const handleRoleUpdate = async () => {
    try {
      removeRowFromCache();

      await axiosSecure.patch("/update-role", {
        email: req?.email,
        role: "manager",
      });

      toast.success("Manager Approved Successful!");
      refetch();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to approve request!"
      );
      refetch();
    }
  };

  const handleRoleRemove = async () => {
    try {
      removeRowFromCache();
      await axiosSecure.patch("/update-role", {
        email: req?.email,
        role: "customer",
      });
      toast.success("Manager Request Rejected!");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to reject request!");
      refetch();
    }
  };

  return (
    <tr className="">
      <td className="px-5 py-5 border border-gray-200 text-sm">
        <p className="text-gray-900">{req?.email}</p>
      </td>

      <td className="px-5 py-5 border border-gray-200 text-sm">
        <button
          onClick={handleRoleUpdate}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold hover:bg-pink-900 bg-pink-600 rounded-full text-white"
        >
          Approved Manager
        </button>

        <button
          onClick={handleRoleRemove}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold hover:bg-red-900 bg-red-600 rounded-full text-white ms-2"
        >
          Cancel Manager
        </button>
      </td>
    </tr>
  );
};

export default ManagerRequestsDataRow;
