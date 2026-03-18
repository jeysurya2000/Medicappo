import { useState, useEffect } from "react";
import apiClient from "../../utils/server";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WORK_START = "09:00";
const WORK_END = "17:00";

const DoctorWeeklySchedule = () => {
  const [weeklySlots, setWeeklySlots] = useState({});
  const [newSlot, setNewSlot] = useState({});
  const [error, setError] = useState("");

  // Load weekly schedule from backend
  const loadWeeklySchedule = async () => {
    try {
      const res = await apiClient.get(`/doctor/weekly-schedule`);
      setWeeklySlots(res.data.weekly || {});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadWeeklySchedule();
  }, []);

  const isWithinWorkingHours = (time) => time >= WORK_START && time <= WORK_END;

  const addSlotForDay = async (dayIndex) => {
    const time = newSlot[dayIndex];
    if (!time) return setError("Please enter a time");
    if (!isWithinWorkingHours(time))
      return setError(`Time must be between ${WORK_START} and ${WORK_END}`);

    try {
      const res = await apiClient.post("/doctor/add-weekly-slot", {
        weekdayIndex: dayIndex,
        time,
      });

      setWeeklySlots((prev) => ({
        ...prev,
        [dayIndex]: res.data.weekly[dayIndex],
      }));

      setNewSlot((prev) => ({ ...prev, [dayIndex]: "" }));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add slot");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A1F44] p-6 text-white">
      <div className="mx-auto max-w-4xl rounded-xl border border-sky-600 bg-[#112255] p-6 shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-bold text-sky-300">
          Weekly Working Hours Schedule
        </h1>

        {error && (
          <div className="mb-4 rounded bg-red-600 px-4 py-2 text-white">
            {error}
          </div>
        )}

        <table className="w-full border border-slate-700 text-white">
          <thead>
            <tr className="bg-slate-800">
              <th className="border border-slate-700 p-2">Day</th>
              <th className="border border-slate-700 p-2">Slots</th>
              <th className="border border-slate-700 p-2">Add Slot</th>
            </tr>
          </thead>
          <tbody>
            {dayNames.map((day, index) => (
              <tr key={index} className="bg-[#0B1A3A]">
                <td className="border border-slate-700 p-2">{day}</td>
                <td className="border border-slate-700 p-2">
                  {weeklySlots[index]?.length > 0
                    ? weeklySlots[index].join(", ")
                    : "No Slots"}
                </td>
                <td className="border border-slate-700 p-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={newSlot[index] || ""}
                      onChange={(e) =>
                        setNewSlot((prev) => ({
                          ...prev,
                          [index]: e.target.value,
                        }))
                      }
                      className="rounded bg-slate-800 px-2 py-1 text-white"
                    />
                    <button
                      onClick={() => addSlotForDay(index)}
                      className="rounded bg-green-600 px-3 py-1 hover:bg-green-500"
                    >
                      Add
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorWeeklySchedule;
