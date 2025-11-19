const express = require("express");
const router = express.Router();
const Doctor = require("../../models/Doctor/doctor");

router.post("/register", (req, res) => {
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
    return alert(res.status(400).send({ message: "All Fields required" }));
  const doctors = new Doctor({
    doctorName,
    designation,
    email,
    password,
    confirmPassword,
    phNo,
  });
});

module.exports = router;
