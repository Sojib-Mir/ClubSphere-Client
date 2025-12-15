import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const AdminManageClubsDataRow = ({ club, refetch }) => {
  const { managerEmail, membershipFee, clubName, status, clubId } = club || {};
  const axiosSecure = useAxiosSecure();

  const handleApproveClub = async () => {
    try {
      await axiosSecure.patch("/club-approved", {
        managerEmail: club?.managerEmail,
        status: "approved",
        clubId: club?.clubId,
      });
      toast.success("Club Request Approved!");
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleRejectClub = async () => {
    try {
      await axiosSecure.patch("/club-approved", {
        managerEmail: club?.managerEmail,
        status: "rejected",
        clubId: club?.clubId,
      });
      toast.success("Club Request Rejected!");
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{clubId}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{clubName}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{managerEmail}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{membershipFee} (BDT)</p>
      </td>

      <td className="px-8 py-2 border-b border-gray-200 text-center bg-white text-sm">
        <p className="bg-yellow-300 text-yellow-900 font-semibold rounded">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">
        <button
          onClick={handleApproveClub}
          type="button"
          className="cursor-pointer hover:bg-green-600 bg-green-500 font-semibold rounded-xl px-2"
        >
          Approve
        </button>
        <button
          onClick={handleRejectClub}
          type="button"
          className="cursor-pointer hover:bg-red-600 bg-red-500 text-white rounded-xl px-2"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default AdminManageClubsDataRow;
