import { useState } from "react";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UpdateEventModal from "../../Modal/UpdateEventModal";
import { dateBDFormet } from "../../../utils";

const ManagerEventDataRow = ({ event, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { title, category, location, clubId, _id } = event || {};

  const eventDateISO = event.eventDate;
  const formattedDate = dateBDFormet(eventDateISO);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/events/${id}`);
      return response.data;
    },
    onSuccess: () => {
      Swal.close();
      Swal.fire({
        title: "Deleted!",
        text: "Your event has been deleted successfully.",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
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
      <td className="px-5 py-5 border-b text-gray-900 border-gray-200 bg-white text-[12px]">
        Club ID : <span className="text-sm text-gray-900">{clubId}</span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{title}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{formattedDate}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{category}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{_id}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{location}</p>
      </td>

      {/* Update */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
        <UpdateEventModal
          event={event}
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          refetch={refetch}
        />
      </td>

      {/* Delete */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleDeleteEvents(event._id)}
          className="bg-green-200 rounded-full cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ManagerEventDataRow;
