const express = require("express");
const router = express.Router();

router.use("/doctor", require("./Doctor/doctorRouter"));

module.exports = router;
