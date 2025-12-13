const CustomerPaymentHistory = ({ payment }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    return {
      date: date.toLocaleDateString("en-US", dateOptions),
      time: date.toLocaleTimeString("en-US", timeOptions),
    };
  };

  const { membershipFee, category, clubName, clubId, _id } = payment.club;

  const { transactionId, paymentDate, status } = payment;

  const { date } = formatDate(paymentDate);

  return (
    <tr>
      {/* Club Name */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-gray-900">{clubName}</p>
        <p className="text-gray-900 text-[10px]">
          Club Id : <span className="text-[10px]"> {_id} </span>
        </p>
      </td>

      {/* Club Id */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className=" bg-pink-500/20 text-center py-px rounded">{clubId}</p>
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
        <p className=" ">{transactionId}</p>
      </td>

      {/* paymentDate */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className=" ">{date}</p>
      </td>
    </tr>
  );
};

export default CustomerPaymentHistory;
