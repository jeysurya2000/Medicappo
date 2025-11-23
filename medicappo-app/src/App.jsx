import DoctorLogin from "./components/doctor/DoctorLogin";
import "../src/App.css";
import { Routes, Route } from "react-router-dom";
import DoctorRegister from "./components/doctor/DoctorRegister";
import DoctorLayout from "./components/layouts/DoctorLayout";
import DoctorHome from "./components/doctor/DoctorHome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DoctorLogin />} />
        <Route path="/doctorRegister" element={<DoctorRegister />} />

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="home" element={<DoctorHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
