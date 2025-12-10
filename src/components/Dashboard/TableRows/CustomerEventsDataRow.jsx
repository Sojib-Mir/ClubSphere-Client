const CustomerEventsDataRow = ({ event }) => {
  const { eventName, clubId, status, registeredAt, eventId, _id } = event;

  return (
    <tr>
      {/* Event Name */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-gray-900">{eventName}</p>
        <p className="text-gray-900 text-xs">Event Id : {eventId}</p>
      </td>

      {/* Club Id */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className=" bg-pink-500/20 text-center py-px rounded">{clubId}</p>
      </td>

      {/* Status*/}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className=" bg-green-500/10 py-1 rounded text-center text-green-500">
          {status}
        </p>
      </td>

      {/* Register ID */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="text-center">{_id}</p>
      </td>

      {/* Registered At */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        <p className="">{registeredAt}</p>
      </td>
    </tr>
  );
};

export default CustomerEventsDataRow;
