import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "./../../utils/index";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";

const UpdateEventForm = ({ club }) => {
  const {
    clubName,
    clubId,
    description,
    location,
    managerEmail,
    membershipFee,
  } = club || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post(`/plants`, payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Club Update Successful!");
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 3,
  });

  const onSubmit = async (data) => {
    const { name, price, description, quantity, category, image } = data;
    const imageFile = image[0];
    try {
      const imageURL = await imageUpload(imageFile);
      const plantData = {
        image: imageURL,
        name,
        price: Number(price),
        quantity: Number(quantity),
        description,
        category,
        seller: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(plantData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  // bannerImage: "https://i.ibb.co.com/C56GVSYZ/1.jpg";
  // category: "Science & Education";
  // clubId: 1001;
  // clubName: "The Night Sky Explorers";
  // createdAt: "2025-01-15T10:00:00+06:00";
  // description: "Dhaka's premier astronomy club dedicated to deep-sky observation, astr…";
  // location: "Dhaka University Campus";
  // managerEmail: "byteprime2025@gmail.com";
  // membershipFee: 900;
  // status: "approved";

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-4">
            {/* Club Name + Club Id*/}
            <div className="flex gap-2">
              {/* Club Name */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="name" className="block text-gray-600">
                  Club Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300  text-gray-900"
                  type="text"
                  placeholder="Club Name"
                  defaultValue={clubName}
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500">Club Name is Required!</p>
                )}
              </div>

              {/* Club Id */}
              <div className="space-y-1 text-sm w-3/6">
                <label htmlFor="clubId" className="block text-gray-600">
                  Club Id
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300  text-gray-900"
                  type="text"
                  placeholder="Club Id"
                  defaultValue={clubId}
                  disabled
                  {...register("clubId", { required: true })}
                />
              </div>
            </div>

            {/* Location + Category */}
            <div className="flex gap-2">
              {/* Location */}
              <div className="space-y-1 text-sm">
                <label htmlFor="location" className="block text-gray-600 ">
                  Location
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300  text-gray-900"
                  type="text"
                  placeholder="Location"
                  defaultValue={location}
                  {...register("location", { required: true })}
                />
                {errors.location?.type === "required" && (
                  <p className="text-red-500">Location is Required!</p>
                )}
              </div>

              {/* Club Category */}
              <div className="space-y-1 text-sm">
                <label htmlFor="category" className="block text-gray-600 ">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300  text-gray-900"
                  defaultValue={description}
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

            {/* Membership Fee + Manager Email */}
            <div className="flex justify-between gap-2">
              {/* Membership Fee */}
              <div className="space-y-1 text-sm">
                <label htmlFor="membershipFee" className="block text-gray-600 ">
                  Membership Fee
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300  text-gray-900"
                  type="number"
                  placeholder="Membership Fee"
                  defaultValue={membershipFee}
                  {...register("membershipFee", { required: true })}
                />
                {errors.membershipFee?.type === "required" && (
                  <p className="text-red-500">Membership Fee is Required!</p>
                )}
              </div>

              {/* Manager Email */}
              <div className="space-y-1 text-sm">
                <label htmlFor="managerEmail" className="block text-gray-600">
                  Manager Email
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300  text-gray-900"
                  type="text"
                  defaultValue={managerEmail}
                  disabled
                  {...register("managerEmail", { required: true })}
                />
              </div>
            </div>

            {/* Club Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                placeholder="Write Club description here..."
                className="w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300  text-gray-900 h-32"
                defaultValue={description}
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-500">Club Description is Required!</p>
              )}
            </div>

            {/* Image */}
            <div className="w-full  m-auto rounded-lg grow">
              <div className=" px-5 py-3 relative border-4 border-dotted border-sky-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      accept="image/*"
                      {...register("image", { required: true })}
                    />
                    <div className="border-gray-200 border rounded font-semibold cursor-pointer p-1 px-3 hover:bg-sky-500">
                      Upload
                    </div>
                    {errors.image?.type === "required" && (
                      <p className="text-red-500">Image is Required!</p>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-2 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-sky-700 hover:bg-pink-700"
            >
              Update Club
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEventForm;
