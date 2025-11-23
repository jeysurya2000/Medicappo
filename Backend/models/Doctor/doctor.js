const mongoose = require("mongoose");
const DoctorSchema = new mongoose.Schema(
  {
    doctorName: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phNo: { type: String, required: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("doctor", DoctorSchema);
module.exports = Doctor;
