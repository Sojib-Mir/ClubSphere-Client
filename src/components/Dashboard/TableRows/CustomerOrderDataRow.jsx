const CustomerOrderDataRow = ({ clubs }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    return {
      date: date.toLocaleDateString("en-US", dateOptions),
      time: date.toLocaleTimeString("en-US", timeOptions),
    };
  };
  const { membershipFee, bannerImage, category, clubName, status, clubId } =
    clubs.club;

  const { transactionId, paymentDate } = clubs;
  const { date } = formatDate(paymentDate);

  return (
    <tr>
      {/* Image */}
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
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

      {/* Club Name */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-gray-900">{clubName}</p>
      </td>

      {/* Club Id */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className=" bg-pink-500/20 text-center py-px rounded text-gray-900">
          {clubId}
        </p>
      </td>

      {/* Category */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-semibold">{category}</p>
      </td>

      {/* Price (Membership Fee) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-semibold">{membershipFee} (BDT)</p>
      </td>

      {/* Price (Membership Fee) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className=" bg-green-500/10 py-1 rounded text-center text-green-500">
          {status}
        </p>
      </td>

      {/* transactionId */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-gray-900">{transactionId}</p>
      </td>

      {/* paymentDate */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-gray-900">{date}</p>
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
