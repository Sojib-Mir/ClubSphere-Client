import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useRole from "./../../../hooks/useRole";
import UseTitle from "./../../../hooks/useTitle";

const Profile = () => {
  UseTitle("Profile");
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  console.log(role);

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg border border-pink-500/20 rounded-2xl md:w-4/5 lg:w-3/5">
        <p className="gradient-sunset w-full mb-4 rounded-t-lg h-56"></p>
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full  h-24 w-24  border-2 border-pink-500 "
            />
          </a>

          <p className="p-2 text-lg px-4 text-white bg-pink-500 rounded-full font-semibold">
            {role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-gray-600 ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-gray-600 ">{user?.email}</span>
              </p>

              <div>
                <button className="bg-lime-500  px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1">
                  Update Profile
                </button>
                <button className="bg-lime-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
