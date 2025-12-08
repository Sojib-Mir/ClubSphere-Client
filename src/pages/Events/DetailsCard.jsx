export const DetailCard = ({
  Icon,
  title,
  value,
  color,
  textColor,
  isSmallValue,
}) => {
  const valueFontSizeClass = isSmallValue ? "text-[10px]" : "text-sm";
  return (
    <div className={`${color} p-3 rounded-lg flex items-center space-x-3`}>
      <Icon className={`w-6 h-6 ${textColor}`} />
      <div>
        <p className="text-xs font-medium text-gray-500">{title}</p>
        <p className={`font-bold ${valueFontSizeClass} ${textColor}`}>
          {value}
        </p>
      </div>
    </div>
  );
};
