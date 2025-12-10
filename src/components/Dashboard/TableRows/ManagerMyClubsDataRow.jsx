import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import UpdateEventModal from "../../Modal/UpdateEventModal";

const ManagerMyClubsDataRow = ({ club }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // _id
  // 6939094b46d7a7a385d14298
  // clubName
  // "The Night Sky Explorers"
  // description
  // "Dhaka's premier astronomy club dedicated to deep-sky observation, astr…"
  // category
  // "Science & Education"
  // location
  // "Dhaka University Campus"
  // bannerImage
  // "https://i.ibb.co.com/C56GVSYZ/1.jpg"
  // membershipFee
  // 900
  // status
  // "approved"
  // managerEmail
  // "byteprime2025@gmail.com"
  // createdAt
  // "2025-01-15T10:00:00+06:00"
  // clubId
  // 1001

  const { bannerImage, clubName, category, membershipFee,location } = club || {};

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt={clubName}
                src={bannerImage}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{clubName}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{category}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{membershipFee} (BDT)</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{location}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={openModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </span>
        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
        <UpdateEventModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
    </tr>
  );
};

export default ManagerMyClubsDataRow;
