import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import CustomerStatistics from "../../../components/Dashboard/Statistics/CustomerStatistics";
import ManagerStatistics from "../../../components/Dashboard/Statistics/ManagerStatistics";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

import useRole from "../../../hooks/useRole";
const Statistics = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div>
      {role === "admin" && <AdminStatistics />}
      {role === "manager" && <ManagerStatistics />}
      {role === "customer" && <CustomerStatistics />}
    </div>
  );
};

export default Statistics;
