import { GrTransaction, GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import { FaCcDinersClub } from "react-icons/fa";
import { PiUserGearFill } from "react-icons/pi";
import { MdEventRepeat } from "react-icons/md";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CustomerMenu = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleRequestManager = () => {
    Swal.fire({
      title: "Confirm Application?",
      text: "By confirming, you submit your formal request to become a manager. This action cannot be easily withdrawn.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit Request!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await axiosSecure.post("/become-manager");
            Swal.fire({
              title: "Request Submitted!",
              text: "Your Manager Position Request has been successfully. Please wait for admin approval!",
              icon: "success",
            });
          } catch (error) {
            console.error("Submission Error:", error);
            const errorMessage =
              error?.response?.data?.message || "An unexpected error occurred.";
            Swal.fire({
              title: "Submission Failed",
              text: errorMessage,
              icon: "error",
            });
          }
        })();
      }
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <MenuItem icon={FaCcDinersClub} label="My Clubs" address="my-clubs" />
      <MenuItem icon={MdEventRepeat} label="My Events" address="my-events" />
      <MenuItem
        icon={GrTransaction}
        label="Payment History"
        address="payment-history"
      />
      {/* Manager Request */}
      <div
        onClick={handleRequestManager}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <PiUserGearFill className="w-5 h-5" />
        <span className="mx-4 font-medium">Become A Manager</span>
      </div>
    </>
  );
};

export default CustomerMenu;
