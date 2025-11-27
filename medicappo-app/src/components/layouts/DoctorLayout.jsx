import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const navigate = useNavigate();

  const doctorName = "Dr. Jey Yogesh";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/doctorRegister");
  };
  return (
    <>
      <div className="flex min-h-screen flex-col bg-linear-to-b from-slate-900 to-slate-800 text-white">
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#07133B] px-6 py-4 shadow-lg">
          {/* Logo */}
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

          {/* Mobile Menu Button */}
          <button className="text-2xl md:hidden" onClick={() => setOpen(true)}>
            <FaBars />
          </button>

          {/* Desktop Profile */}
          <div className="relative hidden items-center gap-3 md:flex">
            <div className="group flex cursor-pointer items-center gap-2">
              <img
                src="https://i.pravatar.cc/100?img=15"
                alt="profile"
                className="h-9 w-9 rounded-full border-2 border-sky-300"
              />

              <div className="max-w-[120px] overflow-hidden font-semibold text-ellipsis whitespace-nowrap text-sky-300">
                {doctorName}
              </div>

              {/* Dropdown */}
              <div className="absolute top-10 right-0 z-500 hidden w-40 rounded-lg border border-slate-700 bg-[#0B1A3A] p-2 shadow-xl group-hover:block">
                <ul className="flex flex-col text-sm">
                  {/* Signup */}
                  <li>
                    <button
                      className="w-full cursor-pointer rounded px-3 py-2 text-left hover:bg-slate-700"
                      onClick={handleSignup}
                    >
                      Signup
                    </button>
                  </li>

                  {/* Logout */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full cursor-pointer rounded px-3 py-2 text-left text-red-400 hover:bg-slate-700"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* -------- MOBILE SIDEBAR -------- */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-[#07133B] shadow-xl transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-slate-700 px-4 py-4">
            <span className="flex items-center gap-2 text-lg font-semibold">
              <img src={logo} alt="logo" className="h-8 w-8" />
              medicAppo
            </span>

            <button className="text-2xl" onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Main Sidebar Content */}
          <div className="flex h-[calc(100%-70px)] flex-col justify-between">
            {/* MENU ITEMS AT TOP */}
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

            {/* SEPARATOR */}
            <div className="mx-6 mt-6 border-t border-slate-600" />

            {/* PROFILE AT BOTTOM LEFT */}
            <div className="px-6 py-6">
              <button
                onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                className="flex w-full items-center gap-3"
              >
                <img
                  src="https://i.pravatar.cc/100?img=15"
                  alt="profile"
                  className="h-12 w-12 rounded-full border-2 border-sky-300"
                />

                <div className="flex-1 text-left">
                  <div className="font-semibold text-sky-300">{doctorName}</div>
                  <div className="text-xs text-gray-400">Tap to open ▼</div>
                </div>
              </button>

              {/* Mobile Dropdown */}
              {mobileProfileOpen && (
                <div className="animate-fadeIn mt-4 flex flex-col gap-3 rounded-xl border border-slate-700 bg-[#0B1A3A] p-4 shadow-lg">
                  <button className="w-full rounded-lg bg-purple-500 px-4 py-2 text-sm font-bold hover:bg-purple-600">
                    Signup
                  </button>

                  <button
                    className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-bold hover:bg-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dark Overlay */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* MAIN OUTLET AREA */}
        <main className="flex flex-1 items-center justify-center px-4 py-10">
          <Outlet />
        </main>

        <footer className="flex flex-col items-center gap-4 bg-[#07133B] py-8">
          <div className="flex gap-5 text-3xl">
            {/* Facebook */}
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1877F2] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_#1877F2]"
            >
              <FaFacebook />
            </a>

            {/* Twitter / X */}
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DA1F2] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_#1DA1F2]"
            >
              <FaTwitter />
            </a>

            {/* Google */}
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DB4437] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_#DB4437]"
            >
              <FaGoogle />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E1306C] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_#E1306C]"
            >
              <FaInstagram />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A66C2] transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_#0A66C2]"
            >
              <FaLinkedin />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/yourgithub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_#ffffff]"
            >
              <FaGithub />
            </a>
          </div>
        </footer>

        <div className="w-full bg-black p-3 text-center">© 2023 Copyright</div>
      </div>
    </>
  );
};

export default DoctorLayout;
