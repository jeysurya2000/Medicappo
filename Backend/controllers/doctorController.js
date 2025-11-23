const Doctor = require("../models/Doctor/doctor");

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
  )
    return res.status(400).send({ message: "All Fields required" });
  if (password !== confirmPassword)
    return res
      .status(400)
      .send({ message: "Password does not match with Confirm Password" });
  const doctors = new Doctor({
    doctorName,
    designation,
    email,
    password,
    phNo,
  });
  await doctors.save();
  res.send({ message: "Created as a Doctor succesfully", doctors });
};

module.exports = { register };
