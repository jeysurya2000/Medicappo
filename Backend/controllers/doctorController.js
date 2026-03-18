const Doctor = require("../models/Doctor/doctor");
const DoctorSchedule = require("../models/Doctor/doctorSchedule");
const jwt = require("jsonwebtoken");
const DoctorWeeklySchedule = require("../models/Doctor/doctorWeeklySchedule");

// REGISTER
const register = async (req, res) => {
  const { email, password, confirmPassword, doctorName, designation, phNo } =
    req.body;

  if (
    !email ||
    !password ||
    !confirmPassword ||
    !doctorName ||
    !designation ||
    !phNo
  ) {
    return res.status(400).send({ message: "All Fields required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({
      message: "Password does not match with Confirm Password",
    });
  }

  const doctors = new Doctor({
    doctorName,
    designation,
    email,
    password,
    phNo,
  });

  await doctors.save();
  res.send({ message: "Created as a Doctor successfully", doctors });
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find doctor
    const doctorUser = await Doctor.findOne({ email });

    if (!doctorUser) {
      return res.status(400).json({ message: "No Doctor User Found" });
    }

    // Check password (plain text)
    if (password !== doctorUser.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT (VALID 1 HOUR)
    const token = jwt.sign(
      {
        id: doctorUser._id,
        email: doctorUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Logged In Successfully",
      token,
      doctorUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET all schedules
const getSchedules = async (req, res) => {
  try {
    const schedules = await DoctorSchedule.find().sort({ date: 1 });
    res.status(200).json({ schedules });
  } catch (err) {
    res.status(500).json({ message: "Error fetching schedules", error: err });
  }
};

const updateSlots = async (req, res) => {
  try {
    const { date, slots } = req.body;

    if (!date) return res.status(400).json({ message: "Date is required" });
    if (!Array.isArray(slots))
      return res.status(400).json({ message: "Slots must be an array" });

    const cleanedSlots = [...new Set(slots)].sort();

    // If slots become empty, delete that schedule
    if (cleanedSlots.length === 0) {
      await DoctorSchedule.deleteOne({ date });
      return res.status(200).json({
        message: "Schedule removed because no slots exist",
        schedule: null,
      });
    }

    // Otherwise update or create
    let schedule = await DoctorSchedule.findOne({ date });

    if (!schedule) {
      schedule = new DoctorSchedule({ date, slots: cleanedSlots });
    } else {
      schedule.slots = cleanedSlots;
    }

    const saved = await schedule.save();

    res.status(200).json({
      message: "Slots updated successfully",
      schedule: saved,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const addWeeklySlot = async (req, res) => {
  try {
    const token = req.headers.authorization?.slice(7);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) return res.status(400).send({ message: "Unauthorized" });

    const { weekdayIndex, time } = req.body;
    if (weekdayIndex === undefined || !time)
      return res.status(400).json({ message: "Missing fields" });

    let weekly = await DoctorWeeklySchedule.findOne({ doctorId: decode.id });
    if (!weekly) {
      weekly = new DoctorWeeklySchedule({ doctorId: decode.id, weekly: {} });
    }

    const existing = weekly.weekly.get(String(weekdayIndex)) || [];
    if (!existing.includes(time)) existing.push(time);

    weekly.weekly.set(String(weekdayIndex), existing);
    await weekly.save();

    res.json({ message: "Weekly slot updated", weekly: weekly.weekly });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get weekly schedule
const getWeeklySchedule = async (req, res) => {
  try {
    const token = req.headers.authorization?.slice(7);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) return res.status(400).send({ message: "Unauthorized" });
    const schedule = await DoctorWeeklySchedule.findOne({
      doctorId: decode.id,
    });
    res.json({ weekly: schedule ? schedule.weekly : {} });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getSchedules,
  updateSlots,
  addWeeklySlot,
  getWeeklySchedule,
};
