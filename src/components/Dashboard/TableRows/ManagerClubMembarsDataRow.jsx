import LoadingSpinner from "../../Shared/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { dateBDFormet } from "../../../utils";

const ManagerClubMembarsDataRow = ({ membar, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { clubName, userName, userEmail, clubId, _id } = membar || {};

  const eventDateISO = membar.joinedAt;
  const formattedDate = dateBDFormet(eventDateISO);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/manage-memberships/${id}`);
      return response.data;
    },
    onSuccess: () => {
      Swal.close();
      Swal.fire({
        title: "Deleted!",
        text: "Your Member Ships has been deleted successfully.",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["manage-memberships"] });
      refetch();
    },
    retry: 3,
  });

  const handleDeleteEvents = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAsync(id);
      }
    });
  };

  if (isPending) return <LoadingSpinner />;

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-[12px]">
        Club ID : <span className="text-sm">{clubId}</span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{userName}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{userEmail}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{clubName}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{formattedDate}</p>
      </td>

      {/* Delete */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleDeleteEvents(_id)}
          className="bg-green-200 rounded-full cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ManagerClubMembarsDataRow;
