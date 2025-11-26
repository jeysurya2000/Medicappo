import { useState, useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu";
import { Link } from "react-router-dom";

const timeSlots = ["10:00AM", "11:20AM", "12:45PM"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const appointments = [
  {
    day: 3,
    month: 10,
    year: 2025,
    user: "Arun",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    day: 10,
    month: 10,
    year: 2025,
    user: "Kumar",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    day: 15,
    month: 11,
    year: 2025,
    user: "Riya",
    avatar: "https://i.pravatar.cc/100?img=20",
  },
];

const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ blank: true });
  for (let d = 1; d <= totalDays; d++) cells.push({ day: d });
  return cells;
};

// Convert slot time → actual date object
const parseTime = (day, month, year, time) => {
  const [h, m] = time
    .replace("AM", "")
    .replace("PM", "")
    .split(":")
    .map(Number);

  let hour = h;
  if (time.includes("PM") && hour !== 12) hour += 12;
  if (time.includes("AM") && hour === 12) hour = 0;

  return new Date(year, month, day, hour, m);
};

const DoctorAppointment = () => {
  const [currentDate, setCurrentDate] = useState({ month: 10, year: 2025 });
  const { month, year } = currentDate;
  const calendarDays = generateCalendar(year, month);

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const scroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  const now = new Date();
  const today = {
    day: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
  };

  const monthName = new Date(year, month).toLocaleString("en-US", {
    month: "long",
  });

  const nextMonth = () =>
    setCurrentDate((p) => ({
      month: p.month === 11 ? 0 : p.month + 1,
      year: p.month === 11 ? p.year + 1 : p.year,
    }));

  const prevMonth = () =>
    setCurrentDate((p) => ({
      month: p.month === 0 ? 11 : p.month - 1,
      year: p.month === 0 ? p.year - 1 : p.year,
    }));

  return (
    <div className="flex w-full flex-col items-center pb-6">
      {/* Sticky Month Header */}
      <div className="sticky top-(--navbar-height,0px) mb-4 flex w-full items-center justify-center gap-5 bg-[#0B0F33]/90 py-3 backdrop-blur-md">
        <button onClick={prevMonth} className="text-2xl text-white">
          ❮
        </button>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {monthName} {year}
        </h2>
        <button onClick={nextMonth} className="text-2xl text-white">
          ❯
        </button>
      </div>

      {/* Sticky Days Row */}
      <div className="sticky top-[calc(var(--navbar-height,0px)+56px)] z-40 mb-3 grid w-[95%] grid-cols-7 rounded-md bg-[#0B0F33]/90 py-2 text-center text-sm font-semibold text-white backdrop-blur-md sm:text-lg">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid w-[95%] grid-cols-7 gap-2 sm:w-[90%] sm:gap-4">
        {calendarDays.map((item, index) => {
          const appt = appointments.find(
            (a) => a.day === item.day && a.month === month && a.year === year,
          );

          const isToday =
            today.day === item.day &&
            today.month === month &&
            today.year === year;

          const isPast =
            !item.blank && new Date(year, month, item.day, 23, 59, 59) < now;

          const isFuture = !isPast && !item.blank;

          const Wrapper = isFuture ? Link : "div";

          // Appointment card highlight
          const appointmentCard =
            appt &&
            "bg-blue-50 border-blue-400 shadow-blue-200 hover:shadow-blue-300";

          // Current day card styling
          const todayCard =
            isToday &&
            "bg-blue-100 border-blue-400 text-blue-900 ring-2 ring-blue-500";

          return (
            <Wrapper
              key={index}
              {...(isFuture && {
                to: `/appointments/${year}/${month + 1}/${item.day}`,
              })}
              className="block"
            >
              <div
                className={`flex min-h-[120px] flex-col rounded-xl p-2 transition duration-300 sm:min-h-[150px] ${item.blank && "pointer-events-none bg-transparent"} ${isPast && "pointer-events-none border border-gray-300 bg-gray-200 opacity-50"} ${!item.blank && !isPast && "border border-gray-200 bg-white hover:-translate-y-1 hover:scale-[1.03]"} ${appointmentCard} ${todayCard} `}
              >
                {!item.blank && (
                  <>
                    {/* TOP ROW */}
                    <div className="flex items-start justify-between">
                      {appt && (
                        <img
                          src={appt.avatar}
                          alt="avatar"
                          className={`h-8 w-8 rounded-full border-2 shadow-md sm:h-9 sm:w-9 ${
                            isToday ? "border-blue-700" : "border-blue-400"
                          }`}
                        />
                      )}

                      <span
                        className={`text-[16px] font-bold ${
                          isToday ? "text-blue-900" : "text-gray-700"
                        }`}
                      >
                        {item.day}
                      </span>
                    </div>

                    {/* TIME SLOTS */}
                    {appt && (
                      <div className="mt-auto">
                        {/* Mobile collapsed */}
                        <div className="flex flex-wrap gap-1 text-[10px] sm:hidden">
                          {timeSlots.slice(0, 2).map((slot) => {
                            const slotTime = parseTime(
                              item.day,
                              month,
                              year,
                              slot,
                            );
                            const disabled = isToday && slotTime < now;

                            return (
                              <div
                                key={slot}
                                className={`flex items-center gap-1 rounded px-2 py-0.5 ${
                                  disabled
                                    ? "bg-gray-200 text-gray-500"
                                    : "bg-blue-200 text-blue-900"
                                } `}
                              >
                                <LuAlarmClock className="text-[12px]" />
                                {slot}
                              </div>
                            );
                          })}

                          {timeSlots.length > 2 && (
                            <div className="rounded bg-blue-200 px-2 py-0.5 text-blue-800">
                              <Link>+{timeSlots.length - 2} more</Link>
                            </div>
                          )}
                        </div>

                        {/* Desktop full slots */}
                        <div className="hidden flex-wrap gap-2 text-[12px] sm:flex">
                          {timeSlots.map((slot) => {
                            const slotTime = parseTime(
                              item.day,
                              month,
                              year,
                              slot,
                            );
                            const disabled = isToday && slotTime < now;

                            return (
                              <div
                                key={slot}
                                className={`flex items-center gap-1 rounded px-2 py-0.5 ${
                                  disabled
                                    ? "bg-gray-200 text-gray-500"
                                    : "bg-blue-200 text-blue-900"
                                } `}
                              >
                                <LuAlarmClock className="text-[14px]" />
                                {slot}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Wrapper>
          );
        })}
      </div>

      {/* Scroll To Top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-4 bottom-4 rounded-full bg-blue-500 p-3 text-white shadow-xl transition hover:scale-110"
        >
          ⬆
        </button>
      )}
    </div>
  );
};

export default DoctorAppointment;
