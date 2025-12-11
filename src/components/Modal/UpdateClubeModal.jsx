import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UpdateClubForm from "../Form/UpdateClubForm";

const UpdateClubeModal = ({ club, setIsEditModalOpen, isOpen, refetch }) => {
  const closeModal = () => setIsEditModalOpen(false);

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md bg-white p-2 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl border border-gray-200"
            >
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-red-100 px-3 py-1 rounded-md text-red-500 cursor-pointer"
                >
                  X
                </button>
              </div>
              <DialogTitle
                as="h3"
                className="text-xl font-medium text-center leading-6 text-gray-900 mb-3"
              >
                Update Club Info
              </DialogTitle>
              <div className="mt-2 w-full">
                <UpdateClubForm
                  club={club}
                  refetch={refetch}
                  closeModal={closeModal}
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateClubeModal;
