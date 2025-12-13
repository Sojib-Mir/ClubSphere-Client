import { useState } from "react";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UpdateClubeModal from "../../Modal/UpdateClubeModal";

const ManagerMyClubsDataRow = ({ club, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { bannerImage, clubName, category, membershipFee, location, clubId } =
    club || {};

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/clubs/${id}`);
      return response.data;
    },
    onSuccess: () => {
      Swal.close();
      Swal.fire({
        title: "Deleted!",
        text: "Your club has been deleted successfully.",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      refetch();
    },
    retry: 3,
  });

  const handleDeleteclubs = (id) => {
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
        Clib ID : <span className="text-sm">{clubId}</span>
      </td>
      
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt={clubName}
                src={bannerImage}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{clubName}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{category}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{membershipFee} (BDT)</p>
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
        <UpdateClubeModal
          club={club}
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          refetch={refetch}
        />
      </td>

      {/* Delete */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleDeleteclubs(club._id)}
          className="bg-green-200 rounded-full cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ManagerMyClubsDataRow;
