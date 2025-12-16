import { Link } from "react-router";
import { formatToBDT, isFutureDate } from "../../utils";
import { motion } from 'framer-motion';

const EventCard = ({ event, i }) => {
  const { _id, eventDate, title, image, location, clubName } = event || {};
  const isUpcoming = isFutureDate(eventDate);
  const isPast =
    !isUpcoming && new Date(eventDate).getTime() < new Date().getTime();
  const isDisabled = true;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      custom={i}
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={cardVariants}
      className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white border border-gray-300 dark:border-gray-700 flex flex-col"
    >
      {/* Image */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-xl hover:scale-106 transition-transform duration-200"
          src={image}
          alt={title}
        />
        {/* Club Name */}
        <div className="flex justify-between">
          <span className="absolute bottom-1 right-1 px-3 py-1 text-sm font-semibold text-white bg-black/50 rounded-md shadow-md">
            Hosted by: {clubName}
          </span>
          <span className="bg-pink-500 text-[12px] text-white ml-2 absolute bottom-1 px-3 py-1 text-sm font-semibold rounded-md shadow-md">
            Free Event
          </span>
        </div>
      </div>

      <div className="p-2 grow flex flex-col justify-between">
        {/* Top Content (Date, Title, Location) */}
        <div>
          {/* event date */}
          <div className="text-[14px] font-semibold text-blue-600 mb-1.5">
            {isUpcoming && (
              <>
                <span className="text-[12px] bg-green-600 text-white font-bold px-2 py-1 rounded-full uppercase">
                  Upcoming
                </span>{" "}
                Event Start Time:{" "}
                <span className="bg-blue-100 px-px rounded-md">
                  {formatToBDT(eventDate)} BDT
                </span>
              </>
            )}
            {isPast && (
              <>
                <span className="text-[12px] bg-red-500 text-white font-bold px-2 py-1 rounded-full uppercase">
                  Past
                </span>{" "}
                <span className="text-red-500">Event Finished :</span>{" "}
                <span className="bg-blue-100 px-px text-red-500 rounded-md">
                  {formatToBDT(eventDate)} BDT
                </span>
              </>
            )}
          </div>

          {/* event name */}
          <h2 className="font-bold text-2xl text-gray-900 mb-1.5 truncate">
            {title}
          </h2>

          {/* location */}
          <div className="text-gray-600 text-sm flex items-center mb-1.5 truncate">
            <svg
              className="w-5 h-5 mr-1 text-red-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {location}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-2 pb-5 pt-0">
        {isUpcoming && (
          <>
            <Link
              to={`/events/${_id}`}
              event={event}
              className="btn border-none w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-150"
            >
              View Details
            </Link>
          </>
        )}
        {isPast && (
          <>
            <Link
              disabled={isDisabled}
              className="btn border-none w-full bg-gray-400 text-red-500 font-bold py-2 rounded-lg transition duration-150"
            >
              Event Finished
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;
