import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function PowerGraph({ data }) {
  return (
    <div className="bg-muted/50 rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Power (W)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={t => new Date(t).toLocaleTimeString()} />
          <YAxis label={{ value: 'W', angle: -90, position: 'insideLeft' }} />
          <Tooltip labelFormatter={t => new Date(t).toLocaleString()} />
          <Line type="monotone" dataKey="power" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}