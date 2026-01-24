"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
} from "recharts";

const lineData = [
  { name: "Jan-Mar", value: 2800 },
  { name: "Apr-Jun", value: 2000 },
  { name: "Jul-Sep", value: 4200 },
  { name: "Oct-Dec", value: 1800 },
];

const weekData = [
  { day: "Sat", v: 1800 },
  { day: "Sun", v: 1200 },
  { day: "Mon", v: 3500 },
  { day: "Tue", v: 2000 },
  { day: "Wed", v: 4800 },
  { day: "Thu", v: 2600 },
  { day: "Fri", v: 3900 },
];

const radialData = [{ value: 78, fill: "#000" }];

export default function StatisticsPage() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-[1400px] mx-auto px-10 py-10 w-full">
        <h1>Statsistics</h1>
        {/* GRID */}
        <div className="grid grid-cols-6 gap-6">
          {/* PROGRESS */}
          <div className="col-span-2 rounded-3xl bg-lime-300 text-black p-6">
            <p className="text-xs font-medium">PROGRESS</p>
            <h2 className="text-5xl font-bold mt-6">↑ 78%</h2>
            <p className="text-xs mt-2 opacity-70">Current Situation</p>
          </div>

          {/* DEVICE TYPE */}
          <div className="col-span-2 rounded-3xl bg-neutral-900 p-6">
            <p className="text-xs text-lime-400 mb-4">DEVICE TYPE</p>
            <ul className="text-xs space-y-2 text-gray-400">
              <li>Desktop — 20%</li>
              <li>Laptop — 15%</li>
              <li>Tablet — 10%</li>
              <li>Smart TV — 10%</li>
              <li>Playstation — 20%</li>
              <li>XBOX — 15%</li>
            </ul>
          </div>

          {/* PERFORMANCE */}
          <div className="col-span-2 rounded-3xl bg-white text-black p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs font-medium">PERFORMANCE</p>
              <span className="font-bold text-lg">+58k</span>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={weekData}>
                <Bar dataKey="v" fill="#93B4FF" radius={[8, 8, 8, 8]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ANALYTICS LINE */}
          <div className="col-span-3 rounded-3xl bg-neutral-900 p-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs">ANALYTICS</p>
              <span className="font-semibold">4K+</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={lineData}>
                <CartesianGrid stroke="#222" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#C7F000"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* WEEKLY BAR */}
          <div className="col-span-3 row-span-2 rounded-3xl bg-orange-400 text-black p-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-medium">ANALYTICS</p>
              <span className="font-bold text-xl">5K+</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weekData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="v" fill="#111" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* BALANCE */}
          <div className="col-span-3 rounded-3xl bg-yellow-200 text-black p-6">
            <div className="flex justify-between mb-4">
              <p className="text-xs font-medium">BALANCE</p>
              <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                This Month
              </span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <RadialBarChart
                innerRadius="65%"
                outerRadius="100%"
                data={radialData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar dataKey="value" />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="text-center text-4xl font-bold -mt-20">78%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
