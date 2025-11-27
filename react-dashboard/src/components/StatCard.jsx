function StatCard({ title, value, change }) {
  return (
    <div className="bg-white p-5 rounded-lg border shadow-sm flex flex-col gap-2">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>

      <p className="text-sm text-blue-600 font-medium">
        {change > 0 ? `+${change}%` : `${change}%`}
      </p>
    </div>
  );
}

export default StatCard;
