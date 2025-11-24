import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/Logo.png";
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const DoctorLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#07133B] px-6 py-4 shadow-lg">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-8 w-8" />
            <span className="text-lg font-semibold text-sky-300">
              medicAppo
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-10 text-[16px] font-bold md:flex">
            <li>
              <NavLink
                to="/doctor/home"
                className={({ isActive }) =>
                  isActive
                    ? "pointer-events-none cursor-not-allowed text-blue-400 opacity-70"
                    : "hover:text-blue-300"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/doctor/appointments"
                className={({ isActive }) =>
                  isActive
                    ? "pointer-events-none cursor-not-allowed text-blue-400 opacity-70"
                    : "hover:text-blue-300"
                }
              >
                Appointments
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/doctor/schedules"
                className={({ isActive }) =>
                  isActive
                    ? "pointer-events-none cursor-not-allowed text-blue-400 opacity-70"
                    : "hover:text-blue-300"
                }
              >
                Schedules
              </NavLink>
            </li>
          </ul>

          {/* Hamburger Icon */}
          <button className="text-2xl md:hidden" onClick={() => setOpen(true)}>
            <FaBars />
          </button>

          {/* Desktop Right Buttons */}
          <div className="hidden items-center gap-4 font-bold md:flex">
            <button className="w-fit rounded-lg bg-red-500 px-4 py-1.5 text-sm hover:bg-red-600">
              Logout
            </button>
            <button className="rounded-lg bg-purple-500 px-4 py-1.5 text-sm hover:bg-purple-600">
              Sign up
            </button>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-[#07133B] shadow-xl transition-transform duration-300 md:hidden ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-700 px-4 py-4">
            <span className="flex items-center gap-2 text-lg font-semibold">
              <img src={logo} alt="logo" className="h-8 w-8" /> medicAppo
            </span>

            <button className="text-2xl" onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <ul className="mt-6 flex flex-col gap-8 px-6 text-[16px] font-bold">
            <li>
              <NavLink
                to="/doctor/home"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "pointer-events-none cursor-default text-blue-400"
                    : "hover:text-blue-300"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/doctor/appointments"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "pointer-events-none cursor-default text-blue-400"
                    : "hover:text-blue-300"
                }
              >
                Appointments
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/doctor/schedules"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "pointer-events-none cursor-default text-blue-400"
                    : "hover:text-blue-300"
                }
              >
                Schedules
              </NavLink>
            </li>
          </ul>

          <div className="mt-10 flex flex-col items-center gap-4 px-6 font-bold">
            <button className="w-fit rounded-lg bg-red-500 px-4 py-1.5 text-sm hover:bg-red-600">
              Logout
            </button>
            <button className="w-fit rounded-lg bg-purple-500 px-4 py-1.5 text-sm hover:bg-purple-600">
              Sign up
            </button>
          </div>
        </div>
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* Main Section */}
        <main className="flex flex-1 items-center justify-center px-4 py-10">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-3 bg-[#07133B] py-6">
          <div className="flex gap-4 text-xl text-white">
            <FaFacebook className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
            <FaGoogle className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
            <FaLinkedin className="cursor-pointer" />
            <FaGithub className="cursor-pointer" />
          </div>
        </footer>
        <div className="w-full bg-black p-3 text-center">© 2023 Copyright</div>
      </div>
    </>
  );
};

export default DoctorLayout;
