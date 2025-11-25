import { useState, useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu";
import { Link } from "react-router-dom";

const timeSlots = ["10:00AM", "11:20AM", "12:45PM"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

// Sample data
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
  const calendarCells = [];

  for (let i = 0; i < firstDay; i++) calendarCells.push({ blank: true });
  for (let d = 1; d <= totalDays; d++) calendarCells.push({ day: d });

  return calendarCells;
};

const DoctorAppointment = () => {
  const [currentDate, setCurrentDate] = useState({ month: 10, year: 2025 });

  const { month, year } = currentDate;
  const calendarDays = generateCalendar(year, month);

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get REAL current date and time
  const now = new Date();
  const today = {
    day: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => ({
      month: prev.month === 11 ? 0 : prev.month + 1,
      year: prev.month === 11 ? prev.year + 1 : prev.year,
    }));
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => ({
      month: prev.month === 0 ? 11 : prev.month - 1,
      year: prev.month === 0 ? prev.year - 1 : prev.year,
    }));
  };

  const monthName = new Date(year, month).toLocaleString("en-US", {
    month: "long",
  });

  return (
    <div className="flex w-full flex-col items-center pb-20">
      {/* Sticky Month Header */}
      <div className="sticky top-0 z-50 mb-6 flex w-full items-center justify-center gap-4 bg-[#0B0F33]/70 py-3 backdrop-blur-md">
        <button onClick={handlePrevMonth} className="text-2xl text-white">
          ❮
        </button>
        <h2 className="text-3xl font-bold text-white">
          {monthName} {year}
        </h2>
        <button onClick={handleNextMonth} className="text-2xl text-white">
          ❯
        </button>
      </div>

      {/* Sticky Week Days */}
      <div className="sticky top-[60px] z-40 mb-3 grid w-[90%] grid-cols-7 gap-4 bg-[#0B0F33]/70 py-2 text-center text-lg font-semibold text-white backdrop-blur-md">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid w-[90%] grid-cols-7 gap-4">
        {calendarDays.map((item, index) => {
          const appointment = appointments.find(
            (a) => a.day === item.day && a.month === month && a.year === year,
          );

          const isToday =
            !item.blank &&
            today.day === item.day &&
            today.month === month &&
            today.year === year;

          const isPastDate =
            !item.blank && new Date(year, month, item.day, 23, 59, 59) < now;

          const isFuture = !isPastDate && !item.blank;

          // choose wrapper element
          const Wrapper = isFuture ? Link : "div"; // past dates no link

          return (
            <Wrapper
              key={index}
              {...(isFuture && {
                to: `/appointments/${year}/${month + 1}/${item.day}`,
              })}
              className="block"
            >
              <div
                className={`relative h-[120px] rounded-xl transition duration-300 ${
                  item.blank
                    ? "pointer-events-none bg-transparent"
                    : isPastDate
                      ? "pointer-events-none border border-gray-400 bg-gray-200 opacity-50"
                      : appointment
                        ? "border border-blue-500/60 bg-white shadow-lg hover:-translate-y-1 hover:scale-[1.03] hover:shadow-blue-400/70"
                        : "border border-gray-200 bg-white/80 hover:bg-white hover:shadow-md"
                } ${isToday ? "ring-2 ring-blue-500 ring-offset-2" : ""} `}
              >
                {!item.blank && (
                  <div className="relative h-full w-full p-2">
                    {/* Avatar only for future appointments */}
                    {appointment && isFuture && (
                      <img
                        src={appointment.avatar}
                        alt="avatar"
                        className="absolute top-2 left-2 h-9 w-9 rounded-full border-2 border-blue-500 shadow-md"
                      />
                    )}

                    {/* Day number */}
                    <div
                      className={`absolute top-2 right-2 text-[18px] font-bold ${isPastDate ? "text-gray-500" : "text-gray-700"} `}
                    >
                      {item.day}
                    </div>

                    {/* Time slots only for future appointments */}
                    {appointment && isFuture && (
                      <div className="absolute right-2 bottom-2 flex flex-col items-end gap-1">
                        {timeSlots.map((slot) => (
                          <div
                            key={slot}
                            className="flex items-center gap-1 text-[12px] text-gray-700"
                          >
                            <LuAlarmClock className="text-[15px] text-blue-600" />
                            <span>{slot}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Wrapper>
          );
        })}
      </div>
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="animate-fadeIn fixed right-6 bottom-6 z-50 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-xl text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-blue-400/50"
        >
          ⬆
        </button>
      )}
    </div>
  );
};

export default DoctorAppointment;
