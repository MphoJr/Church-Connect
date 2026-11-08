const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getAttendanceReport,
} = require("../controllers/reportController");

router.get("/stats", getDashboardStats);

router.get("/attendance", getAttendanceReport);

module.exports = router;
