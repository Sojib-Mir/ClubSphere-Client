import { Calendar, MapPin, DollarSign, Users, Clock } from "lucide-react";
import { DetailCard } from "./DetailsCard";
import { useNavigate, useParams } from "react-router";
import { MdKeyboardBackspace } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { SiDinersclub } from "react-icons/si";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  return {
    date: date.toLocaleDateString("en-US", dateOptions),
    time: date.toLocaleTimeString("en-US", timeOptions),
  };
};

const EventDetailsCard = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: events = {}, isLoading } = useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/events/${id}`
      );

      return result.data;
    },
  });

  const {
    title,
    description,
    eventDate,
    location,
    eventFee,
    attendees,
    image,
    clubName,
    clubId,
    createdAt,
    _id,
  } = events;

  const { data: registerEvent = {}, isLoading: registerLoading } = useQuery({
    queryKey: ["register-event", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/event-register/${id}?email=${
          user?.email
        }`
      );
      return result.data;
    },
  });

  const { status, userEmail } = registerEvent || {};
  const isRegisterOfThisEvent =
    status === "registered" && userEmail === user?.email;

  const { date, time } = formatDate(eventDate);
  const { date: creationDate } = formatDate(createdAt);

  const axiosSecure = useAxiosSecure();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post(`/event-register`, payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Event Register Successful!");
    },
    onError: (error) => {
      toast.error(error);
    },
    retry: 3,
  });

  const handleRegisterEvent = async () => {
    try {
      const eventRegisterInfo = {
        eventName: title,
        eventId: _id,
        clubId,
        clubName,
        userEmail: user?.email,
        status: "Registered",
        registeredAt: new Date().toLocaleDateString(),
      };

      await mutateAsync(eventRegisterInfo);
      navigate("/dashboard/my-events");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isPending) return <LoadingSpinner />;
  if (registerLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="my-4 p-4">
        {/* Back Button */}
        <div className="py-2 ">
          <button
            onClick={() => navigate(-1)}
            className="rounded px-4 py-2 cursor-pointer font-semibold bg-sky-700 text-white hover:text-black text-sm hover:bg-pink-500 transition duration-200"
          >
            <span className="flex justify-center items-center">
              <MdKeyboardBackspace className="mr-2" />
              Go back
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          <div className="lg:col-span-2">
            {/* Event Banner */}
            <div className="relative mb-6 rounded-xl overflow-hidden shadow-xl">
              <img
                src={image}
                alt={title}
                className="w-full object-cover h-64 md:h-96"
              />
              <div className="absolute inset-0 bg-opacity-40 flex items-end p-6">
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-extrabold text-white mb-2 bg-black/30 text-center rounded py-px px-2 w-auto">
                    {title}
                  </span>
                  <span className="text-sm font-extrabold text-white mb-2 bg-black/30 text-center rounded py-px px-2 w-auto md:w-9/12">
                    Hosted by: {clubName}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Info Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 ">
              <DetailCard
                Icon={Calendar}
                title="Date"
                value={date}
                color="bg-red-50"
                textColor="text-red-700"
              />
              <DetailCard
                Icon={Clock}
                title="Time"
                value={time}
                color="bg-red-50"
                textColor="text-red-700"
              />

              <DetailCard
                Icon={Users}
                title="Attendees"
                value={`${attendees}`}
                color="bg-yellow-50"
                textColor="text-yellow-700"
              />
              <DetailCard
                Icon={SiDinersclub}
                title="Club ID"
                value={clubId}
                color="bg-yellow-50"
                textColor="text-yellow-700"
              />
            </div>

            {/* Description Section */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                About the Event
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </section>

            {/* Location Section */}
            <section className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-indigo-600" />
                Location Details
              </h2>
              <p className="text-gray-700 text-lg font-medium">{location}</p>
              <p className="text-sm text-gray-500 mt-1">Event ID : {_id}</p>
            </section>
          </div>

          {/* Right site registration */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 bg-white p-6 rounded-lg shadow-2xl border border-indigo-100">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                Register for the Event
              </h2>

              <div className="space-y-3 mb-6">
                <p className="flex justify-between items-center text-gray-700">
                  <span>Event Fee:</span>
                  <span className={`text-xl font-extrabold text-indigo-700`}>
                    {eventFee}
                  </span>
                </p>
                <p className="text-sm text-gray-500 border-t pt-2">
                  Event posted on : {creationDate}
                </p>
              </div>

              {/* Registration Button */}
              <button
                onClick={handleRegisterEvent}
                disabled={isRegisterOfThisEvent}
                className={`w-full py-3 font-semibold text-white rounded-lg transition duration-300 shadow-md text-xl ${
                  isRegisterOfThisEvent
                    ? "bg-gray-400 cursor-not-allowed shadow-none"
                    : "bg-green-600 hover:bg-green-700 shadow-green-300 cursor-pointer"
                }`}
              >
                {isRegisterOfThisEvent
                  ? "Already Registered This Event"
                  : "Register Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsCard;
