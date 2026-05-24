import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
} from "recharts";

const COLORS = ["#7c5cff", "#22d3ee", "#ff5c8a", "#22c55e",
                "#f59e0b", "#ef4444", "#9ca3af"];

export default function EmotionChart({ data }) {
  const chartData = Object.entries(data || {})
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  if (chartData.length === 0)
    return <div className="text-muted text-sm">No emotion data.</div>;

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            stroke="#0a0a14"
            strokeWidth={3}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#11111d", border: "1px solid #23233a", borderRadius: 12,
            }}
            formatter={(v) => `${v}%`}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#9494b0" }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
