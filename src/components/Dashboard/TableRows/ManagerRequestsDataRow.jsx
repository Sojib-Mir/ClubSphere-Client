import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagerRequestsDataRow = ({ req, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch("/update-role", {
        email: req?.email,
        role: "manager",
      });
      toast.success("Manager Request Approved!");
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleRoleRemove = async () => {
    try {
      await axiosSecure.patch("/update-role", {
        email: req?.email,
        role: "customer",
      });
      toast.error("Manager Request Rejected Successful!");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <tr className="">
      <td className="px-5 py-5 border border-gray-200 text-sm">
        <p className=" ">{req?.email}</p>
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
