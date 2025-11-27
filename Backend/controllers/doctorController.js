const Doctor = require("../models/Doctor/doctor");
const jwt = require("jsonwebtoken");

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
      return res.status(400).json({ message: "Invalid email or password" });
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
      user: {
        id: doctorUser._id,
        name: doctorUser.name,
        email: doctorUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
