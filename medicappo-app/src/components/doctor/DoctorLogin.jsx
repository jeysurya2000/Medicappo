import doctorImg from "../../assets/doctor.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Simple Validation Schema
const DoctorLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const DoctorLogin = () => {

  // Simple local login check (no API)
  const handleLogin = (values, { setSubmitting, resetForm }) => {
    const validDoctor = {
      email: "doctor@example.com",
      password: "1234",
    };

    if (
      values.email === validDoctor.email &&
      values.password === validDoctor.password
    ) {
      alert("Login Successful!");
      console.log("Doctor Logged In:", values);
    } else {
      alert("Invalid email or password");
    }

    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a1d4b] to-[#2b2f63] p-4 font-sans">

      <div className="flex flex-col md:flex-row items-center w-full max-w-5xl">

        <div className="md:w-1/2 flex flex-col items-center mb-10 md:mb-0">
          <img
            src={doctorImg}
            alt="Doctor Illustration"
            className="w-72 md:w-80 mt-6"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 bg-white rounded-3xl shadow-2xl px-10 py-12 max-w-md w-full">

          <h2 className="text-center text-3xl font-extrabold text-[#3d3b66] mb-8">
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
                    className="w-full mt-1 px-4 py-2 border border-[#6b6b93] rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
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
                    className="w-full mt-1 px-4 py-2 border border-[#6b6b93] rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-sm text-[#5b54a4] font-semibold hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white py-2 rounded-md text-lg font-semibold transition 
                    ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#5b5cae] hover:bg-[#4c4da0]"}
                  `}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>

              </Form>
            )}
          </Formik>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <a href="#" className="text-[#4e46c3] font-semibold hover:underline">
              Register Now
            </a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
