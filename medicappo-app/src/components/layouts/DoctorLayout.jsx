// import { Outlet } from "react-router-dom";
// import logo from "../../assets/Logo.png";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaGoogle,
//   FaInstagram,
//   FaLinkedin,
//   FaGithub,
// } from "react-icons/fa";

// const DoctorLayout = () => {
//   return (
//     <>
//       <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
//         {/* Navbar */}
//         <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#07133B] shadow-lg">
//           <div className="flex items-center gap-2">
//             <img src={logo} alt="logo" className="w-8 h-8" />
//             <span className="text-lg font-semibold">medicAppo</span>
//           </div>

//           <ul className="hidden md:flex items-center gap-8 text-sm">
//             <li className="cursor-pointer hover:text-blue-300">Home</li>
//             <li className="cursor-pointer hover:text-blue-300">Appointments</li>
//             <li className="cursor-pointer hover:text-blue-300">Schedules</li>
//           </ul>

//           <ul className="md:hidden flex flex-col items-center gap-8 text-sm">
//             <li className="cursor-pointer hover:text-blue-300">Home</li>
//             <li className="cursor-pointer hover:text-blue-300">Appointments</li>
//             <li className="cursor-pointer hover:text-blue-300">Schedules</li>
//           </ul>

//           <div className="flex items-center gap-7">
//             <button className="text-sm hover:text-blue-300">Logout</button>
//             <button className="bg-purple-500 text-sm px-4 py-1.5 rounded-lg hover:bg-purple-600">
//               Sign up
//             </button>
//           </div>
//         </nav>

//         {/* Main Section */}
//         <main className="flex-1 flex items-center justify-center px-4 py-10">
//           <Outlet />
//         </main>

//         {/* Footer */}
//         <footer className="bg-[#07133B] py-6 flex flex-col items-center gap-3">
//           {/* Social icons */}
//           <div className="flex gap-4 text-white text-xl">
//             <FaFacebook className="text-xl cursor-pointer" />
//             <FaTwitter className="text-xl cursor-pointer" />
//             <FaGoogle className="text-xl cursor-pointer" />
//             <FaInstagram className="text-xl cursor-pointer" />
//             <FaLinkedin className="text-xl cursor-pointer" />
//             <FaGithub className="text-xl cursor-pointer" />
//           </div>
//         </footer>
//         <div className="bg-black w-full p-3 text-center">© 2023 Copyright</div>
//       </div>
//     </>
//   );
// };

// export default DoctorLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";
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
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#07133B] shadow-lg">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span className="text-lg font-semibold text-sky-300">
              medicAppo
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-sm font-bold">
            <li className="cursor-pointer hover:text-blue-300">Home</li>
            <li className="cursor-pointer hover:text-blue-300">Appointments</li>
            <li className="cursor-pointer hover:text-blue-300">Schedules</li>
          </ul>

          {/* Hamburger Icon */}
          <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
            <FaBars />
          </button>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center gap-4 font-bold">
            <button className="bg-red-500 text-sm px-4 py-1.5 rounded-lg hover:bg-red-600 w-fit">
              Logout
            </button>
            <button className="bg-purple-500 text-sm px-4 py-1.5 rounded-lg hover:bg-purple-600">
              Sign up
            </button>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-[#07133B] shadow-xl transform transition-transform duration-300 z-50 md:hidden ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700">
            <span className="text-lg font-semibold flex items-center gap-2">
              <img src={logo} alt="logo" className="w-8 h-8" /> medicAppo
            </span>

            <button className="text-2xl" onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <ul className="flex flex-col gap-8 mt-6 px-6 text-sm font-bold">
            <li className="cursor-pointer hover:text-blue-300">Home</li>
            <li className="cursor-pointer hover:text-blue-300">Appointments</li>
            <li className="cursor-pointer hover:text-blue-300">Schedules</li>
          </ul>

          <div className="mt-10 px-6 flex flex-col items-center gap-4 font-bold">
            <button className="bg-red-500 text-sm px-4 py-1.5 rounded-lg hover:bg-red-600 w-fit">
              Logout
            </button>
            <button className="bg-purple-500 text-sm px-4 py-1.5 rounded-lg hover:bg-purple-600 w-fit">
              Sign up
            </button>
          </div>
        </div>

        {/* Main Section */}
        <main className="flex-1 flex items-center justify-center px-4 py-10">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-[#07133B] py-6 flex flex-col items-center gap-3">
          <div className="flex gap-4 text-white text-xl">
            <FaFacebook className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
            <FaGoogle className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
            <FaLinkedin className="cursor-pointer" />
            <FaGithub className="cursor-pointer" />
          </div>
        </footer>
        <div className="bg-black w-full p-3 text-center">© 2023 Copyright</div>
      </div>
    </>
  );
};

export default DoctorLayout;
