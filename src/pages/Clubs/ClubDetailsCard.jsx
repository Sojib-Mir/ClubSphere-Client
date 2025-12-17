import { MapPin, DollarSign, Users, Clock } from "lucide-react";
import { MdKeyboardBackspace } from "react-icons/md";
import { DetailCard } from "../Events/DetailsCard";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { SiDinersclub } from "react-icons/si";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ClubDetailsCard = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // 1. Fetch Club Details
  const { data: clubs = {}, isLoading } = useQuery({
    queryKey: ["clubs", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/clubs/${id}`);
      return result.data;
    },
  });

  const {
    clubName,
    description,
    category,
    location,
    bannerImage,
    membershipFee,
    status,
    managerEmail,
    createdAt,
    updatedAt,
    _id,
    clubId,
  } = clubs || {};

  // 2. Fetch Membership Status
  const { data: memberships = {}, isLoading: membershipLoading } = useQuery({
    queryKey: ["membership", id, user?.email],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/memberships/${id}?email=${user?.email}`
      );
      return result.data;
    },
  });

  const isMemberOfThisClub = memberships?.paymentStatus === "paid";

  // UI display helpers
  const feeDisplay = membershipFee > 0 ? `৳ ${membershipFee} / Month` : "FREE";
  const feeColor = membershipFee > 0 ? "text-red-700" : "text-green-700";
  const categoryIcon = category?.includes("Science") ? Clock : Users;

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (allData) => {
      const dbRes = await axiosSecure.post(
        "/memberships",
        allData.membershipData
      );

      if (
        dbRes.data.insertedId ||
        dbRes.data.message.includes("already joined")
      ) {
        const payRes = await axiosSecure.post(
          "/create-checkout-session",
          allData.paymentInfo
        );
        return payRes.data;
      }
      throw new Error("Could not save membership data");
    },
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast.error(error.message || "Process failed!");
    },
  });

  const handlePayment = async () => {
    if (!user) return toast.error("Please login first!");

    const membershipData = {
      clubMainId: _id,
      clubId,
      managerEmail,
      clubName,
      bannerImage,
      status: status,
      paymentStatus: "paid",
      userEmail: user?.email,
      userName: user?.displayName,
      joinedAt: new Date().toISOString(),
    };

    const paymentInfo = {
      type: "paid",
      clubId: _id,
      clubName,
      price: Number(membershipFee),
      bannerImage,
      description,
      customer: {
        name: user?.displayName,
        email: user?.email,
      },
    };

    await mutateAsync({ membershipData, paymentInfo });
  };

  if (isLoading || membershipLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="max-w-7xl mx-auto my-8 p-4">
        {/* Back Button */}
        <div className="py-2">
          <button
            onClick={() => navigate(-1)}
            className="rounded px-4 py-2 cursor-pointer font-semibold bg-sky-700 text-white hover:text-black text-sm hover:bg-pink-500 transition duration-200"
          >
            <span className="flex justify-center items-center">
              <MdKeyboardBackspace className="mr-2 text-xl" />
              Go back
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Club Content */}
          <div className="lg:col-span-2">
            {/* Club Banner */}
            <div className="mb-4.5 rounded-xl overflow-hidden shadow-xl">
              <img
                src={bannerImage}
                alt={clubName}
                className="w-full object-cover h-64 md:h-96"
              />
            </div>

            {/* Quick Info Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
              <DetailCard
                Icon={categoryIcon}
                title="Category"
                value={category}
                color="bg-indigo-50"
                textColor="text-indigo-700"
              />
              <DetailCard
                Icon={MapPin}
                title="Location"
                value={location}
                color="bg-red-50"
                textColor="text-red-700"
              />
              <DetailCard
                Icon={DollarSign}
                title="Membership Fee"
                value={feeDisplay}
                color="bg-green-50"
                textColor={feeColor}
              />
              <DetailCard
                Icon={SiDinersclub}
                title="Club ID"
                value={clubId}
                color="bg-yellow-50"
                textColor="text-yellow-700"
              />
            </div>

            {/* Club Name */}
            <section className="bg-white p-4 rounded-lg shadow-md mb-4.5">
              <h2 className="text-2xl font-bold text-gray-800">
                Club Name :{" "}
                <span className="py-2 px-2 rounded font-extrabold">
                  {clubName}
                </span>
              </h2>
            </section>

            {/* Description Section */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-b-gray-300 pb-2">
                About the Club
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </section>

            {/* Manager/Status Section */}
            <section className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-b-gray-300 pb-2 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-indigo-600" />
                Club Status & Management
              </h2>
              <p className="text-gray-700 text-lg font-medium">
                Manager: {managerEmail}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    status === "approved" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {status.toUpperCase()}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {/* Established: {createdAt || updatedAt} */}
                {updatedAt ? "Last Updated : " : "Established: "}
                {updatedAt || createdAt}
              </p>
            </section>
          </div>

          {/* Join & Pay Now */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 bg-white p-6 rounded-lg shadow-2xl border border-indigo-100">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                Membership & Join
              </h2>

              <div className="space-y-3 mb-6">
                <p className="flex justify-between items-center text-gray-700">
                  <span>Monthly Fee:</span>
                  <span className={`text-xl font-extrabold ${feeColor}`}>
                    {feeDisplay}
                  </span>
                </p>
                <p className="text-sm text-gray-500 border-t pt-2">
                  Club ID: {clubId}
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={isMemberOfThisClub || isPending}
                className={`w-full py-3 font-semibold text-white rounded-lg transition duration-300 shadow-md text-xl ${
                  isMemberOfThisClub
                    ? "bg-gray-400 cursor-not-allowed shadow-none"
                    : "bg-green-600 hover:bg-green-700 shadow-green-300 cursor-pointer"
                }`}
              >
                {isMemberOfThisClub
                  ? "Already Joined This Club"
                  : "Join & Pay Now"}
              </button>

              <p className="mt-3 text-center text-sm text-gray-500">
                Get access to all workshops and resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubDetailsCard;
