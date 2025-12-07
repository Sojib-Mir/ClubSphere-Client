import RecentClubsCard from "./RecentClubsCard";

const RecentClubs = () => {
  const clubsData = [
    {
      clubId: 1001,
      clubName: "The Night Sky Explorers",
      description:
        "Join us to capture the beauty of the cosmos and master long exposure photography.",
      category: "Photography",
      location: "Khulna, Bangladesh",
      bannerImage: "https://i.ibb.co.com/C56GVSYZ/1.jpg", // এখানে আপনার ছবির URL দিন
      membershipFee: 500, // 0 হলে 'Free' দেখাবে
      status: "approved", // 'pending' বা 'rejected' হতে পারে
      managerEmail: "manager@example.com",
      createdAt: "2025-10-01",
    },

    {
      clubId: 1002,
      clubName: "Sky Explorers",
      description:
        "Join us to capture the beauty of the cosmos and master long exposure photography.",
      category: "Photography",
      location: "Dhaka, Uttara",
      bannerImage: "https://i.ibb.co.com/hFwmHMjZ/2.jpg", // এখানে আপনার ছবির URL দিন
      membershipFee: 0, // 0 হলে 'Free' দেখাবে
      status: "approved", // 'pending' বা 'rejected' হতে পারে
      managerEmail: "manager@example.com",
      createdAt: new Date()
        .toLocaleTimeString("en-US", {
          timeZone: "Asia/Dhaka",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(/, /g, "T")
        .replace(/\//g, "-"),

      updatedAt: new Date()
        .toLocaleTimeString("en-US", {
          timeZone: "Asia/Dhaka",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(/, /g, "T")
        .replace(/\//g, "-"),
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-center pt-5">
        Recent <span className="text-pink-500">Clubs</span>{" "}
      </h1>

      <div className="flex flex-row justify-between items-center py-4 px-4 mb-px">
        {/* Search Bar */}
        {/* <div className="w-full md:w-3/12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by clubs name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 transition duration-150 shadow-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div> */}

        {/* filter by category */}
        {/* <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 w-5/12 md:w-auto ms-2">
          <select
            className="w-full sm:w-40 py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 bg-white 
                     dark:bg-[#1D232A] dark:text-white dark:border-gray-700"
          >
            <option value="">Filter by Category</option>
            <option value="photography">Photography</option>
            <option value="sports">Sports</option>
            <option value="tech">Tech</option>
          </select>
        </div> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2 pb-5">
        {clubsData.map((club) => (
          <RecentClubsCard key={club.clubId} club={club} />
        ))}
      </div>
    </div>
  );
};

export default RecentClubs;
