import doctorImg from "../../assets/doctor.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../utils/server";
import { useEffect } from "react";

// Validation Schema
const DoctorLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const DoctorLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await apiClient.post("/doctor/login", values);
      localStorage.setItem("token", res.data.token);
      alert(res?.data.message);
      resetForm();

      // Redirect user
      navigate("/doctor/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-linear-to-br from-[#1a1d4b] to-[#2b2f63] p-4 font-sans">
      <div className="flex w-full max-w-5xl flex-col items-center md:flex-row">
        <div className="mb-10 flex flex-col items-center md:mb-0 md:w-1/2">
          <img
            src={doctorImg}
            alt="Doctor Illustration"
            className="mt-6 w-72 md:w-80"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md rounded-3xl bg-white px-10 py-12 shadow-2xl md:w-1/2">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-[#3d3b66]">
            Doctor Login
          </h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={DoctorLoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 w-full rounded-md border border-[#6b6b93] px-4 py-2 outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 w-full rounded-md border border-[#6b6b93] px-4 py-2 outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-sm font-semibold text-[#5b54a4] hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-md py-2 text-lg font-semibold text-white transition ${
                    isSubmitting
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-[#5b5cae] hover:bg-[#4c4da0]"
                  }`}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/doctorRegister"
              className="font-semibold text-[#4e46c3] hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
