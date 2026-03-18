const mongoose = require("mongoose");

const doctorScheduleSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  date: { type: String, required: true }, // YYYY-MM-DD

  slots: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("DoctorSchedule", doctorScheduleSchema);
