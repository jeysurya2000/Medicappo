const mongoose = require("mongoose");

const doctorWeeklyScheduleSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  weekly: {
    type: Map,
    of: [String],
    default: {},
  },
});

module.exports = mongoose.model(
  "DoctorWeeklySchedule",
  doctorWeeklyScheduleSchema
);
