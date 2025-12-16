import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const AdminChart = ({ stats }) => {
  const data = [
    { name: "Total Users", value: stats?.users || 0, color: "#f97316" },
    { name: "Manager Req.", value: stats?.requests || 0, color: "#2563eb" },
    { name: "Pending Clubs", value: stats?.clubs || 0, color: "#db2777" },
    { name: "Transactions", value: stats?.transactions || 0, color: "#16a34a" },
  ];

  return (
    <div className="w-full h-[450px] bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white">Platform Overview</h3>
        <p className="text-slate-500">
          Real-time statistics of ClubSphere resources
        </p>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#db2777"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#000000", fontSize: 12, fontWeight: 600 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: 0}}
            contentStyle={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
              padding: "12px",
            }}
          />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminChart;
