import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [updatedRole, setUpdatedRole] = useState(user?.role);

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch("/update-role", {
        email: user?.email,
        role: updatedRole,
      });
      toast.success("Role Updated!");
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto border">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl border border-gray-200"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-semibold text-black"
              >
                Update User Role
              </DialogTitle>
              <form>
                <div className="p-2">
                  <select
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                    className="w-full my-3 p-2 border border-gray-200 text-gray-950 rounded-xl px-2 py-3 cursor-pointer font-semibold"
                    name="role"
                  >
                    <option value="customer">Customer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex mt-2 justify-around">
                  <button
                    onClick={handleRoleUpdate}
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-1 hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 font-semibold text-black"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-1 hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 text-white text-center font-semibold"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default UpdateUserRoleModal;
