import { GrTransaction, GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import { useState } from "react";
import BecomeManagerModal from "../../../Modal/BecomeManagerModal";
import { FaCcDinersClub } from "react-icons/fa";
import { PiUserGearFill } from "react-icons/pi";
import { MdEventRepeat } from "react-icons/md";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";

const CustomerMenu = () => {
  const { loading } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
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

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <PiUserGearFill className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Manager</span>
      </div>

      <BecomeManagerModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default CustomerMenu;
