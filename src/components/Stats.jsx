import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "HTML", value: 90 },
  { name: "CSS", value: 85 },
  { name: "JavaScript", value: 80 },
  { name: "React", value: 85 },
  { name: "Node.js", value: 75 },
];

const Stats = () => (
  <section id="stats" className="py-20 px-8 bg-slate-900" data-aos="fade-up">
    <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">Skills Overview</h2>
    <div className="max-w-4xl mx-auto">
      <ResponsiveContainer width="100%" height={288}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default Stats;