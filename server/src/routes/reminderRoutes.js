const express = require("express");

const router = express.Router();

const {
  createReminder,
  getReminders,
  completeReminder,
} = require("../controllers/reminderController");

router.post("/", createReminder);

router.get("/:userId", getReminders);

router.put("/:id/complete", completeReminder);

module.exports = router;
