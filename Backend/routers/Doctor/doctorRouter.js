const express = require("express");
const router = express.Router();
const doctorController = require("../../controllers/doctorController");

router.post("/register", doctorController.register);
router.post("/login", doctorController.login);
router.get("/schedules", doctorController.getSchedules);

// POST update a specific date slots
router.put("/update-slots", doctorController.updateSlots);
router.get("/weekly-schedule", doctorController.getWeeklySchedule);
router.post("/add-weekly-slot", doctorController.addWeeklySlot);

module.exports = router;
