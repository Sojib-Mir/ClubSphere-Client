// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";
// import { imageUpload } from "./../../utils/index";
// import LoadingSpinner from "../Shared/LoadingSpinner";
// import ErrorPage from "../../pages/ErrorPage";

// const UpdateEventForm = ({ club, refetch, closeModal }) => {
//   const axiosSecure = useAxiosSecure();
//   const {
//     _id,
//     clubName,
//     clubId,
//     description,
//     location,
//     managerEmail,
//     membershipFee,
//     bannerImage: oldBannerImage,
//   } = club || {};

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     const dateOptions = { year: "numeric", month: "long", day: "numeric" };
//     const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
//     return {
//       date: date.toLocaleDateString("en-US", dateOptions),
//       time: date.toLocaleTimeString("en-US", timeOptions),
//     };
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const {
//     isPending,
//     isError,
//     mutateAsync,
//     reset: mutationReset,
//   } = useMutation({
//     mutationFn: async (payload) =>
//       await axiosSecure.patch(`/manage-clubs/${_id}`, payload),
//     onSuccess: (data) => {
//       console.log(data);
//       toast.success("Club Update Successful!");
//       mutationReset();
//       refetch();
//       if (closeModal) {
//         closeModal();
//       }
//     },
//     onError: (error) => {
//       console.error("Update Error:", error);
//       toast.error("Failed to update club!");
//     },
//     retry: 3,
//   });

//   const onSubmit = async (data) => {
//     const currentIsoDate = new Date().toISOString();
//     const { date, time } = formatDate(currentIsoDate);
//     const updatedAt = `${date} at ${time}`;

//     const {
//       name,
//       membershipFee: price,
//       description,
//       location,
//       category,
//       image,
//     } = data;

//     let imageURL = oldBannerImage;

//     try {
//       if (image && image.length > 0) {
//         imageURL = await imageUpload(image[0]);
//       }

//       const clubData = {
//         clubName: name,
//         membershipFee: Number(price),
//         description,
//         location,
//         category,
//         updatedAt,
//         bannerImage: imageURL,
//       };

//       await mutateAsync(clubData);
//     } catch (error) {
//       console.error("Club Update Failed:", error);
//       toast.error("Error during image upload or club update.");
//     }
//   };

//   if (isPending) return <LoadingSpinner />;
//   if (isError) return <ErrorPage />;

//   return (
//     <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-1 gap-10">
//           <div className="space-y-4">
//             {/* Event Name + Club Id*/}
//             <div className="flex gap-2">
//               {/* Event Name */}
//               <div className="space-y-1 text-sm w-full">
//                 <label htmlFor="name" className="block text-gray-600">
//                   Event Name
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
//                   type="text"
//                   placeholder="Event Name"
//                   defaultValue={clubName}
//                   {...register("name", { required: true })}
//                 />
//                 {errors.name?.type === "required" && (
//                   <p className="text-red-500">Event Name is Required!</p>
//                 )}
//               </div>

//               {/* Club Id */}
//               <div className="space-y-1 text-sm w-3/6">
//                 <label htmlFor="clubId" className="block text-gray-600">
//                   Club Id
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
//                   type="text"
//                   placeholder="Club Id"
//                   defaultValue={clubId}
//                   disabled
//                   {...register("clubId")}
//                 />
//               </div>
//             </div>

//             {/* Location + Category */}
//             <div className="flex gap-2">
//               {/* Location */}
//               <div className="space-y-1 text-sm w-full">
//                 <label htmlFor="location" className="block text-gray-600 ">
//                   Location
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
//                   type="text"
//                   placeholder="Location"
//                   defaultValue={location}
//                   {...register("location", { required: true })}
//                 />
//                 {errors.location?.type === "required" && (
//                   <p className="text-red-500">Location is Required!</p>
//                 )}
//               </div>

//               {/* Club Category */}
//               <div className="space-y-1 text-sm w-full">
//                 <label htmlFor="category" className="block text-gray-600 ">
//                   Category
//                 </label>
//                 <select
//                   className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
//                   defaultValue={club?.category || ""}
//                   {...register("category", { required: true })}
//                 >
//                   <option value="">All Category</option>
//                   <option value="Technology">Technology & Coding</option>
//                   <option value="Art & Creative">Art & Creative Design</option>
//                   <option value="Sports & Fitness">Sports & Fitness</option>
//                   <option value="Education">Education & Academics</option>
//                   <option value="Health">Health & Wellness</option>
//                   <option value="Music">Music & Performance</option>
//                   <option value="Books / Reading">Books & Reading</option>
//                   <option value="Gaming">Gaming</option>
//                   <option value="Science">Science & Research</option>
//                   <option value="Arts & Culture">Arts & Culture</option>
//                   <option value="Career">Career & Business</option>
//                   <option value="Finance">Finance & Investing</option>
//                   <option value="Photography">Photography & Film</option>
//                   <option value="Nature / Gardening">Nature & Gardening</option>
//                   <option value="Food / Cooking">Food & Cooking</option>
//                 </select>
//                 {errors.category?.type === "required" && (
//                   <p className="text-red-500">Category is Required!</p>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-between gap-2">
//               {/* Membership Fee */}
//               <div className="space-y-1 text-sm w-full">
//                 <label htmlFor="membershipFee" className="block text-gray-600 ">
//                   Membership Fee
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
//                   type="number"
//                   placeholder="Membership Fee"
//                   defaultValue={membershipFee}
//                   {...register("membershipFee", {
//                     required: true,
//                     valueAsNumber: true,
//                   })}
//                 />
//                 {errors.membershipFee?.type === "required" && (
//                   <p className="text-red-500">Membership Fee is Required!</p>
//                 )}
//               </div>

//               {/* Manager Email (Disabled - Read Only) */}
//               <div className="space-y-1 text-sm w-full">
//                 <label htmlFor="managerEmail" className="block text-gray-600">
//                   Manager Email
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
//                   type="text"
//                   defaultValue={managerEmail}
//                   disabled
//                   {...register("managerEmail")}
//                 />
//               </div>
//             </div>

//             {/* Event Description */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="description" className="block text-gray-600">
//                 Description
//               </label>
//               <textarea
//                 placeholder="Write Event description here..."
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900 h-32"
//                 defaultValue={description}
//                 {...register("description", { required: true })}
//               ></textarea>
//               {errors.description?.type === "required" && (
//                 <p className="text-red-500">Event Description is Required!</p>
//               )}
//             </div>

//             {/* Image */}
//             <div className="w-full m-auto rounded-lg grow">
//               <div className="px-5 py-3 relative border-4 border-dotted border-sky-300 rounded-lg">
//                 <div className="flex flex-col w-max mx-auto text-center">
//                   <label>
//                     <input
//                       className="text-sm cursor-pointer w-36 hidden"
//                       type="file"
//                       accept="image/*"
//                       {...register("image")}
//                     />
//                     <div className="border-gray-200 border rounded font-semibold cursor-pointer p-1 px-3 hover:bg-pink-500 hover:text-white">
//                       Upload New Image
//                     </div>
//                   </label>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">
//                 Current Image: {oldBannerImage ? "Uploaded" : "None"}
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full cursor-pointer p-2 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-pink-700 hover:bg-sky-700 mb-5"
//             >
//               Update Event
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateEventForm;

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "./../../utils/index";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";

const UpdateEventForm = ({ event: eventData, refetch, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    title,
    clubId,
    description: oldDescription,
    location: oldLocation,
    managerEmail,
    image: oldImage,
  } = eventData || {};

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    return {
      date: date.toLocaleDateString("en-US", dateOptions),
      time: date.toLocaleTimeString("en-US", timeOptions),
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.patch(`/manage-events/${_id}`, payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Event Update Successful!");
      mutationReset();
      refetch();
      if (closeModal) {
        closeModal();
      }
    },
    onError: (error) => {
      toast.error("Failed to update event!", error);
    },
    retry: 3,
  });

  const onSubmit = async (data) => {
    const currentIsoDate = new Date().toISOString();
    const { date, time } = formatDate(currentIsoDate);
    const updatedAt = `${date} at ${time}`;

    const { title: newTitle, description, location, category, image } = data;

    let imageURL = oldImage;

    try {
      if (image && image.length > 0) {
        imageURL = await imageUpload(image[0]);
      }

      const eventUpdateData = {
        title: newTitle,
        description,
        location,
        category,
        updatedAt,
        image: imageURL,
      };

      await mutateAsync(eventUpdateData);
    } catch (error) {
      toast.error("Error during image upload or event update.", error);
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-4">
            {/* Event Title + Club Id*/}
            <div className="flex gap-2">
              {/* Event Title */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="title" className="block text-gray-600">
                  Event Title
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
                  type="text"
                  placeholder="Event Title"
                  defaultValue={title}
                  {...register("title", { required: true })}
                />
                {errors.title?.type === "required" && (
                  <p className="text-red-500">Event Title is Required!</p>
                )}
              </div>

              {/* Event Id (Read-Only) */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="clubId" className="block text-gray-600">
                  Event Id (Read-Only)
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-900 cursor-not-allowed text-[12px]"
                  type="text"
                  placeholder="event Id"
                  defaultValue={_id}
                  disabled
                  {...register("_id_disabled")}
                />
              </div>
            </div>

            {/* Location + Category */}
            <div className="flex gap-2">
              {/* Location */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="location" className="block text-gray-600 ">
                  Location
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
                  type="text"
                  placeholder="Location"
                  defaultValue={oldLocation}
                  {...register("location", { required: true })}
                />
                {errors.location?.type === "required" && (
                  <p className="text-red-500">Location is Required!</p>
                )}
              </div>

              {/* Event Category */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="category" className="block text-gray-600 ">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
                  defaultValue={eventData?.category || ""}
                  {...register("category", { required: true })}
                >
                  <option value="">All Category</option>
                  <option value="Technology">Technology & Coding</option>
                  <option value="Art & Creative">Art & Creative Design</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Education">Education & Academics</option>
                  <option value="Health">Health & Wellness</option>
                  <option value="Music">Music & Performance</option>
                  <option value="Books / Reading">Books & Reading</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Science">Science & Research</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                  <option value="Career">Career & Business</option>
                  <option value="Finance">Finance & Investing</option>
                  <option value="Photography">Photography & Film</option>
                  <option value="Nature / Gardening">Nature & Gardening</option>
                  <option value="Food / Cooking">Food & Cooking</option>
                </select>
                {errors.category?.type === "required" && (
                  <p className="text-red-500">Category is Required!</p>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-2">
              {/* Club Id (Read-Only) */}
              <div className="space-y-1 text-sm w-3/6">
                <label htmlFor="clubId" className="block text-gray-600">
                  Club Id (Read-Only)
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-900 cursor-not-allowed"
                  type="text"
                  placeholder="Club Id"
                  defaultValue={clubId}
                  disabled
                  {...register("clubId_disabled")}
                />
              </div>

              {/* Manager Email (Disabled - Read Only) */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="managerEmail" className="block text-gray-600">
                  Manager Email (Read-Only)
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 text-gray-900 cursor-not-allowed"
                  type="text"
                  defaultValue={managerEmail}
                  disabled
                  {...register("managerEmail_disabled")}
                />
              </div>
            </div>

            {/* Event Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                placeholder="Write Event description here..."
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900 h-32"
                defaultValue={oldDescription}
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-500">Event Description is Required!</p>
              )}
            </div>

            {/* Image */}
            <div className="w-full m-auto rounded-lg grow">
              <div className="px-5 py-3 relative border-4 border-dotted border-sky-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      accept="image/*"
                      {...register("image")}
                    />
                    <div className="border-gray-200 border rounded font-semibold cursor-pointer p-1 px-3 hover:bg-pink-500 hover:text-white">
                      Upload New Image
                    </div>
                  </label>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Current Image: {oldImage ? "Uploaded" : "None"}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-2 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-pink-700 hover:bg-sky-700 mb-5"
            >
              Update Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEventForm;
