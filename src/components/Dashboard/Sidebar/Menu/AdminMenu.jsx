import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { GrTransaction } from "react-icons/gr";
import { HiUserGroup } from "react-icons/hi";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />

      <MenuItem
        icon={HiUserGroup}
        label="Manage Clubs"
        address="manage-clubs"
      />

      <MenuItem
        icon={GrTransaction}
        label="Transactions"
        address="transactions-history"
      />
    </>
  );
};

export default AdminMenu;
