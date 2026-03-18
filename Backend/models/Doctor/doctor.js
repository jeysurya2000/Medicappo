const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorName: String,
  designation: String,
  email: String,
  password: String,
  phNo: String,
  workingHours: {
    start: { type: String, default: "09:00" }, // HH:MM
    end: { type: String, default: "17:00" },
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
