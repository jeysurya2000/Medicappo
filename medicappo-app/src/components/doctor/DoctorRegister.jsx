import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import doctorImg from "../../assets/doctor.png";
import { Link } from "react-router-dom";
import apiClient from "../../utils/server"; // ✅ Correct import
import logo from "../../assets/Logo.png";

// Schema
const RegisterSchema = Yup.object().shape({
  doctorName: Yup.string().required("Doctor name is required"),
  designation: Yup.string().required("Select your designation"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Min 8 characters")
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
  phNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter 10-digit number")
    .required("Mobile number is required"),
});

// Submit Handler
const handleSubmit = async (values, resetForm) => {
  try {
    const response = await apiClient.post("/doctor/register", values);

    alert(response.data.message || "Registration successful!");
    resetForm();
  } catch (error) {
    console.error("Registration failed:", error);
    alert(error.response?.data?.message || "Something went wrong!");
  }
};

const DoctorRegister = () => {
  return (
    <>
      <div className="min-h-screen bg-linear-to-r from-[#15163d] to-[#262759] md:flex">
        <div className="flex justify-center pt-5 md:hidden">
          <img src={logo} alt="doctor" className="w-40" />
        </div>

        {/* LEFT PANEL */}
        <div className="sticky top-0 hidden h-screen w-1/2 flex-col items-center justify-center md:flex">
          <img src={doctorImg} alt="doctor" className="w-80" />
        </div>

        {/* FORM SECTION */}
        <div className="flex min-h-screen w-full items-center justify-center overflow-y-auto py-10 md:w-1/2">
          <div className="w-full max-w-md rounded-[30px] bg-white px-10 py-10 shadow-2xl">
            <h2 className="mb-8 text-center text-3xl font-extrabold text-[#3b3d7a]">
              Register
            </h2>

            <Formik
              initialValues={{
                doctorName: "",
                designation: "",
                email: "",
                password: "",
                confirmPassword: "",
                phNo: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values, { resetForm }) =>
                handleSubmit(values, resetForm)
              }
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-semibold">
                      Doctor’s Name
                    </label>
                    <Field
                      name="doctorName"
                      type="text"
                      className="mt-1 w-full rounded-md border border-purple-500 px-3 py-2 outline-none"
                    />
                    <ErrorMessage
                      name="doctorName"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="text-sm font-semibold">Designation</label>
                    <Field
                      name="designation"
                      as="select"
                      className="mt-1 w-full rounded-md border border-purple-500 px-3 py-2 outline-none"
                    >
                      <option value="">Select designation</option>
                      <option value="General Doctor">General Doctor</option>
                      <option value="Dentist">Dentist</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                    </Field>
                    <ErrorMessage
                      name="designation"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-semibold">E-Mail ID</label>
                    <Field
                      name="email"
                      type="email"
                      className="mt-1 w-full rounded-md border border-purple-500 px-3 py-2 outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm font-semibold">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="mt-1 w-full rounded-md border border-purple-500 px-3 py-2 outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="text-sm font-semibold">
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className="mt-1 w-full rounded-md border border-purple-500 px-3 py-2 outline-none"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="text-sm font-semibold">
                      Mobile Number
                    </label>
                    <Field
                      name="phNo"
                      type="text"
                      className="mt-1 w-full rounded-md border border-purple-500 px-3 py-2 outline-none"
                    />
                    <ErrorMessage
                      name="phNo"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full rounded-md bg-[#5b5cae] py-2 text-lg font-semibold text-white transition ${
                      isSubmitting
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-[#4c4da0]"
                    }`}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>

                  <p className="mt-3 text-center text-sm">
                    If already have an account?{" "}
                    <Link
                      to="/"
                      className="font-semibold text-[#4e46c3] hover:underline"
                    >
                      Login Now
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorRegister;
