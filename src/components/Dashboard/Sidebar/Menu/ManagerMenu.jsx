import { BsFillHouseAddFill } from "react-icons/bs";
import { MdEventRepeat } from "react-icons/md";
import MenuItem from "./MenuItem";
import { HiUserGroup } from "react-icons/hi";
import { FaCcDinersClub, FaHouseUser } from "react-icons/fa";

const ManagerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Event"
        address="add-event"
      />
      <MenuItem icon={FaCcDinersClub} label="My Clubs" address="my-clubs" />

      <MenuItem
        icon={HiUserGroup}
        label="Club Members"
        address="club-members"
      />

      <MenuItem
        icon={MdEventRepeat}
        label="Manage Events"
        address="manage-events"
      />

      <MenuItem
        icon={FaHouseUser}
        label="Ragister Events"
        address="ragister-events"
      />
    </>
  );
};

export default ManagerMenu;
