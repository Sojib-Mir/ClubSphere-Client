import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "./../../utils/index";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";

const AddClubForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post(`/clubs`, payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success("New Club Added Successful!");
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
    },
    retry: 3,
  });

  const onSubmit = async (data) => {
    const currentIsoDate = new Date().toISOString();
    const { date, time } = formatDate(currentIsoDate);
    const createdAt = `${date} at ${time}`;

    const {
      name,
      location,
      category,
      membershipFee,
      managerEmail,
      description,
      image,
      managerName,
    } = data;

    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);

      const clubData = {
        clubName: name,
        membershipFee: membershipFee,
        description,
        category,
        bannerImage: imageURL,
        location,
        managerName,
        managerEmail,
        status: "pending",
        createdAt,
        manager: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(clubData);
      reset();
    } catch (error) {
      console.error("Club Submission Error:", error);
      toast.error("Failed to add club. Please try again.");
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 min-h-screen px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-xl border-gray-100 w-5/6 p-5"
      >
        <div className="flex gap-10">
          <div className="space-y-4 w-full">
            {/* Club Name + MembarShip Fee */}
            <div className="space-y-1 flex gap-2">
              {/* Club Name */}
              <div className="space-y-1 text-lg w-full">
                <label htmlFor="name" className="block text-gray-600">
                  Club Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
                  type="text"
                  placeholder="Club Name"
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500 text-base">
                    Club Name is Required!
                  </p>
                )}
              </div>

              {/* MembarShip Fee */}
              <div className="space-y-1 text-lg w-full">
                <label htmlFor="membershipFee" className="block text-gray-600 ">
                  Membership Fee
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
                  type="number"
                  placeholder="Membership Fee"
                  {...register("membershipFee", { required: true })}
                />
                {errors.membershipFee?.type === "required" && (
                  <p className="text-red-500 text-base">
                    Membership Fee is Required!
                  </p>
                )}
              </div>
            </div>

            {/* Location + Category */}
            <div className="flex gap-2 w-full">
              {/* Location */}
              <div className="space-y-1 text-lg w-full">
                <label htmlFor="location" className="block text-gray-600 ">
                  Location
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
                  type="text"
                  placeholder="Location"
                  {...register("location", { required: true })}
                />
                {errors.location?.type === "required" && (
                  <p className="text-red-500 text-base">
                    Location is Required!
                  </p>
                )}
              </div>

              {/* Club Category */}
              <div className="space-y-1 text-lg w-full">
                <label htmlFor="category" className="block text-gray-600 ">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
                  {...register("category", { required: true })}
                >
                  <option selected value="">
                    All Category
                  </option>
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
                  <p className="text-red-500 text-base">
                    Category is Required!
                  </p>
                )}
              </div>
            </div>

            {/* Manamer Name + Manager Email */}
            <div className="flex justify-between gap-2 w-full">
              {/* Manager Name */}
              <div className="space-y-1 text-lg w-full">
                <label htmlFor="name" className="block text-gray-600">
                  Manager Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
                  type="text"
                  disabled
                  defaultValue={user?.displayName}
                  {...register("managerName", { required: true })}
                />
              </div>

              {/* Manager Email */}
              <div className="space-y-1 text-lg w-full">
                <label htmlFor="managerEmail" className="block text-gray-600">
                  Manager Email
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900"
                  type="text"
                  disabled
                  defaultValue={user?.email}
                  {...register("managerEmail", { required: true })}
                />
              </div>
            </div>

            {/* Club Description */}
            <div className="space-y-1 text-lg w-full">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                placeholder="Write Club description here..."
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 text-gray-900 h-32"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-500 text-base">
                  Club Description is Required!
                </p>
              )}
            </div>

            {/* Image */}
            <div className="w-full m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-sky-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      accept="image/*"
                      {...register("image", { required: true })}
                    />
                    <div className="border-gray-200 border rounded font-semibold cursor-pointer p-1 px-3 hover:bg-sky-500">
                      Upload Club Image
                    </div>
                    {errors.image?.type === "required" && (
                      <p className="text-red-500 text-base">
                        Image is Required!
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-2 mt-5 text-center font-medium text-xl text-white transition duration-200 rounded shadow-md bg-sky-700 hover:bg-pink-700"
            >
              Add Club
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClubForm;
