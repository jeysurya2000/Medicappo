const express = require("express");
const router = express.Router();

router.use("/doctor", require("./routers/Doctor/doctorRouter"));

module.exports = router;
