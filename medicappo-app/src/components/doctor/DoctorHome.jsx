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

const DoctorHome = () => {
  return (
    <>
      <div className="w-full px-6 py-3 space-y-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-gray-300 text-sm space-x-2">
          <span className="flex items-center gap-2 opacity-75">
            <FaHome className="text-base" />
            Home
          </span>

          <span>
            <RxSlash />
          </span>

          <span className="flex items-center gap-2 text-white font-bold">
            <RxDashboard className="text-base" />
            Dashboard
          </span>
        </nav>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-700 text-white p-6 rounded-xl shadow-xl">
            <h4 className="text-lg font-semibold">Total Appointments</h4>
            <p className="text-3xl font-bold mt-3">100</p>
          </div>

          <div className="bg-blue-700 text-white p-6 rounded-xl shadow-xl">
            <h4 className="text-lg font-semibold">Pending Appointments</h4>
            <p className="text-3xl font-bold mt-3">10</p>
          </div>

          <div className="bg-blue-700 text-white p-6 rounded-xl shadow-xl">
            <h4 className="text-lg font-semibold">Confirmed Appointments</h4>
            <p className="text-3xl font-bold mt-3">90</p>
          </div>
        </div>

        {/* Graph Section */}
        <div className="bg-blue-800 flex flex-col gap-8 items-center text-white p-6 rounded-xl shadow-xl w-full h-[380px]">
          <h3 className="text-center text-lg font-semibold my-3">
            Weekly Appointment Insights
          </h3>

          <div className="flex justify-center w-full h-full">
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
