const express = require("express");

const {
  getReminders,
  getReminder,
  createReminder,
  deleteReminder,
  updateReminder,
} = require("../controllers/reminderController");

const router = express.Router();

// get all Reminders
router.get("/", getReminders);

// get a single Reminder
router.get("/:id", getReminder);

// Post an new Reminder
router.post("/", createReminder);

// Delete an Reminder
router.delete("/:id", deleteReminder);

// Update an Reminder
router.patch("/:id", updateReminder);

module.exports = router;
