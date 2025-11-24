import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaHome } from "react-icons/fa";
import { RxDashboard, RxSlash } from "react-icons/rx";
const data = [
  { day: "Monday", value: 3000 },
  { day: "Tuesday", value: 3200 },
  { day: "Wednesday", value: 3800 },
  { day: "Thursday", value: 3200 },
  { day: "Friday", value: 2700 },
  { day: "Saturday", value: 2000 },
];
const cardItems = [
  { title: "Total Appointments", count: 100 },
  { title: "Pending Appointments", count: 10 },
  { title: "Confirmed Appointments", count: 90 },
];

const DoctorHome = () => {
  return (
    <>
      <div className="container w-full space-y-10 px-6 py-3">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-300">
          <span className="flex items-center gap-2 opacity-75">
            <FaHome className="text-base" />
            Home
          </span>

          <span>
            <RxSlash />
          </span>

          <span className="flex items-center gap-2 font-bold text-white">
            <RxDashboard className="text-base" />
            Dashboard
          </span>
        </nav>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cardItems.map((card, index) => (
            <div
              className="rounded-xl bg-blue-700 p-6 text-white shadow-xl"
              key={card.title}
            >
              <h4 className="text-lg font-semibold">{card.title}</h4>
              <p className="mt-3 text-3xl font-bold">{card.count}</p>
            </div>
          ))}
        </div>

        {/* Graph Section */}
        <div className="flex h-[380px] w-full flex-col items-center gap-8 rounded-xl bg-blue-800 p-6 text-white shadow-xl">
          <h3 className="my-3 text-center text-lg font-semibold">
            Weekly Appointment Insights
          </h3>

          <div className="flex h-full w-full justify-center">
            <ResponsiveContainer width="85%" height="100%">
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.3)"
                />
                <XAxis dataKey="day" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorHome;
