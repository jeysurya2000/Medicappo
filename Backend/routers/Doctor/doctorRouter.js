const express = require("express");
const router = express.Router();
const doctorController = require("../../controllers/doctorController");
const { verifyToken } = require("../../utils/verifyToken");

router.post("/register", doctorController.register);
router.post("/login", verifyToken, doctorController.login);

module.exports = router;
