import { Calendar, MapPin, DollarSign, Users, Clock } from "lucide-react";
import { DetailCard } from "./DetailsCard";
import { useNavigate } from "react-router";
import { MdKeyboardBackspace } from "react-icons/md";

const eventData = {
  clubId: "exp001",
  title: "Winter Stargazing Workshop",
  description:
    "A practical session on deep-sky observation and astrophotography techniques. Join us for a night under the stars to learn deep-sky observation techniques, use telescopes, and capture the cosmos with your camera. No prior experience is required.",
  eventDate: "2025-12-20T19:00:00+06:00",
  location: "Dhaka University Campus Field",
  isPaid: true,
  eventFee: "Free",
  attendees: "Unlimited",
  createdAt: "2025-10-01T10:00:00+06:00",
  image: "https://i.ibb.co.com/C56GVSYZ/1.jpg",
  clubName: "The Night Sky Explorers",
};

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
  const {
    title,
    description,
    eventDate,
    location,
    isPaid,
    eventFee,
    attendees,
    image,
    clubName,
    clubId,
    createdAt,
  } = eventData;
  const { date, time } = formatDate(eventDate);
  const { date: creationDate } = formatDate(createdAt);
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-7xl mx-auto my-8 p-4">
        {/* Back Button */}
        <div className="py-2 ">
          <button
            onClick={() => navigate(-1)}
            className="rounded px-2 cursor-pointer font-semibold bg-pink-400 text-black btn-sm"
          >
            <span className="flex justify-center items-center">
              <MdKeyboardBackspace className="mr-2" />
              Go back
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Event Banner */}
            <div className="relative mb-6 rounded-xl overflow-hidden shadow-xl">
              <img
                src={image}
                alt={title}
                className="w-full object-cover h-64 md:h-96"
              />
              <div className="absolute inset-0 bg-opacity-40 flex items-end p-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                    {title}
                  </h1>
                  <p className="text-lg text-indigo-200">
                    Hosted by: {clubName}
                  </p>
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
                Icon={DollarSign}
                title="Fee"
                value={isPaid ? `৳ ${eventFee}` : "FREE"}
                color="bg-green-50"
                textColor="text-green-700"
              />
              <DetailCard
                Icon={Users}
                title="Attendees"
                value={`${attendees}`}
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
              <p className="text-sm text-gray-500 mt-1">Club ID: {clubId}</p>
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
                    Free
                  </span>
                </p>
                <p className="text-sm text-gray-500 border-t pt-2">
                  Event posted on : {creationDate}
                </p>
              </div>

              {/* Registration Button */}
              <button className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md shadow-indigo-300 text-xl cursor-pointer">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsCard;
