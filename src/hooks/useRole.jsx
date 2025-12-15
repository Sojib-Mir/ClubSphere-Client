import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = null, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure(`/user/role`);
        if (data && typeof data.role === "string") {
          return data.role;
        }
        return null;
      } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
      }
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
