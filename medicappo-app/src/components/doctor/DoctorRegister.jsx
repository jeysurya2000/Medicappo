import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import doctorImg from "../../assets/doctor.png";

// Validation Schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Doctor name is required"),
  designation: Yup.string().required("Select your designation"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(4, "Min 4 characters").required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter 10-digit number")
    .required("Mobile number is required"),
});

const DoctorRegister = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#15163d] to-[#262759] font-sans">

  {/* FIXED LEFT PANEL */}
  <div className="hidden md:flex flex-col items-center justify-center w-1/2 sticky top-0 h-screen">

    <img src={doctorImg} alt="doctor" className="w-80" />
  </div>

  {/* SCROLLABLE RIGHT FORM */}
  <div className="w-full md:w-1/2 min-h-screen overflow-y-auto flex justify-center items-center py-10">

    <div className="bg-white shadow-2xl rounded-[30px] px-10 py-10 w-full max-w-md">

      <h2 className="text-3xl text-center font-extrabold text-[#3b3d7a] mb-8">
        Register
      </h2>

     <Formik
            initialValues={{
              name: "",
              designation: "",
              email: "",
              password: "",
              confirmPassword: "",
              mobile: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("REGISTER DETAILS:", values);
              alert("Registration Successful!");
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">

                {/* Name */}
                <div>
                  <label className="text-sm font-semibold">Doctor’s Name</label>
                  <Field
                    name="name"
                    type="text"
                    className="mt-1 w-full border border-purple-500 rounded-md px-3 py-2 outline-none"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Designation */}
                <div>
                  <label className="text-sm font-semibold">Designation</label>
                  <Field
                    name="designation"
                    as="select"
                    className="mt-1 w-full border border-purple-500 rounded-md px-3 py-2 outline-none"
                  >
                    <option value="">Select designation</option>
                    <option value="General Doctor">General Doctor</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                  </Field>
                  <ErrorMessage name="designation" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold">E-Mail ID</label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 w-full border border-purple-500 rounded-md px-3 py-2 outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-semibold">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="mt-1 w-full border border-purple-500 rounded-md px-3 py-2 outline-none"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm font-semibold">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="mt-1 w-full border border-purple-500 rounded-md px-3 py-2 outline-none"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="text-sm font-semibold">Mobile Number</label>
                  <Field
                    name="mobile"
                    type="text"
                    className="mt-1 w-full border border-purple-500 rounded-md px-3 py-2 outline-none"
                  />
                  <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#5b5cae] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#4c4da0] transition ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Register
                </button>

                <p className="text-center text-sm mt-3">
                  If Already have an account?{" "}
                  <a href="/login" className="text-[#4e46c3] font-semibold hover:underline">
                    Login Now
                  </a>
                </p>
              </Form>
            )}
          </Formik>

    </div>
  </div>
</div>
  );
};

export default DoctorRegister;
