import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UpdateEventForm from "../Form/UpdateEventForm";
import { IoIosCloseCircle } from "react-icons/io";

const UpdateEventModal = ({ event, setIsEditModalOpen, isOpen, refetch }) => {
  const closeModal = () => setIsEditModalOpen(false);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
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
                className="bg-red-100 p-1 text-2xl rounded-full text-red-500 cursor-pointer"
              >
                <IoIosCloseCircle />
              </button>
            </div>
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900 mb-5"
            >
              Update Event Info
            </DialogTitle>
            <div className="mt-2 w-full">
              <UpdateEventForm
                event={event}
                refetch={refetch}
                closeModal={closeModal}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateEventModal;
